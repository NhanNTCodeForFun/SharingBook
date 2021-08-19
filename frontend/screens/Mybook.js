/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {ApiContext} from '../contexts/BookDataContext';
import {UserApiContext} from '../contexts/AuthContext';
import * as bookServices from '../services/book-services';

const Request = ({navigation}) => {
  const {books, getBooks} = useContext(ApiContext);
  const {currentUser} = useContext(UserApiContext);

  const [myBooks, setMyBooks] = useState(
    books.filter(
      book =>
        book.member.memberId === currentUser.memberId && book.display === false,
    ),
  );

  function showAlert(bookId) {
    Alert.alert(
      'Xác Nhận Xóa Sách',
      'Bạn có chắc muốn xóa sách khỏi kho của bạn! Bấm xác nhận để xóa.',
      [
        {
          text: 'Xác nhận',
          onPress: () => deleteBook(bookId),
        },
        {
          text: 'Thoát',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  useEffect(() => {
    if (books) {
      const notPublicBooks = books.filter(
        book =>
          book.member.memberId === currentUser.memberId &&
          book.display === false,
      );
      setMyBooks(notPublicBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  const deleteBook = async id => {
    const result = await bookServices.deleteBook(id);
    if (result) {
      await getBooks();
      ToastAndroid.show('Xóa thành công!', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Xóa không thành công!', ToastAndroid.LONG);
    }
  };

  const handleBookDisplay = async bookId => {
    const result = await bookServices.setBookDisplay(bookId);
    if (result) {
      await getBooks();
      ToastAndroid.show('Đăng sách thành công!', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Đăng sách không thành công!', ToastAndroid.LONG);
    }
  };

  function renderMyBookList() {
    const renderItem = ({item}) => {
      return (
        <View style={{marginVertical: SIZES.base}}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('MyBookDetail', {book: item})}>
            {/* Book Cover */}
            <Image
              source={{uri: item.frontSideImage}}
              resizeMode="cover"
              style={{width: 100, height: 150, borderRadius: 10}}
            />
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                  onPress={() => showAlert(item.bookId)}>
                  <Image
                    source={icons.delete_icon}
                    resizeMode="contain"
                    style={{width: 25, height: 25, tintColor: COLORS.black}}
                  />
                </TouchableOpacity>
              </View>
              {/* Book name and author */}
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.lightGray4,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  {item.author}
                </Text>
              </View>

              {/* Button */}
              <View style={{flexDirection: 'column', marginTop: SIZES.radius}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.lightBrown,
                      marginRight: 5,
                      marginVertical: 5,
                      paddingVertical: 5,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => showAlert(item.bookId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.lightBrown,
                      marginLeft: 5,
                      marginVertical: 5,
                      paddingVertical: 5,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => handleBookDisplay(item.bookId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Đăng Đổi
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}>
        <FlatList
          data={myBooks}
          renderItem={renderItem}
          keyExtractor={item => `${item.bookId}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Body Section */}
      <View style={{flex: 1}}>{renderMyBookList()}</View>
    </SafeAreaView>
  );
};
export default Request;
