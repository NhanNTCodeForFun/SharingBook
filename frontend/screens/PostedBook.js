/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
  Alert,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {ApiContext} from '../contexts/BookDataContext';
import {UserApiContext} from '../contexts/AuthContext';
import * as bookServices from '../services/book-services';

const PostedBooks = ({navigation}) => {
  const {currentUser} = useContext(UserApiContext);
  const {books, getBooks} = useContext(ApiContext);
  const [myBooks, setMyBooks] = useState(
    books.filter(
      book =>
        book.member.memberId === currentUser.memberId && book.display === true,
    ),
  );
  function showAlert(bookId) {
    Alert.alert(
      'Xác Nhận Gỡ Sách',
      'Bạn có chắc muốn gỡ sách khỏi danh sách đang đăng! Bấm xác nhận để gỡ.',
      [
        {
          text: 'Xác nhận',
          onPress: () => handleBookHide(bookId),
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
          book.display === true,
      );
      setMyBooks(notPublicBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  const handleBookHide = async bookId => {
    const result = await bookServices.setBookHide(bookId);
    if (result) {
      await getBooks();
      ToastAndroid.show('Gỡ sách thành công!', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Gỡ sách không thành công!', ToastAndroid.LONG);
    }
  };

  function renderPostedBookList() {
    const renderItem = ({item}) => {
      return (
        <View style={{marginVertical: SIZES.base}}>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() => navigation.navigate('ExchangeDetail', {book: item})}>
            {/* Book Cover */}
            <Image
              source={{uri: item.frontSideImage}}
              resizeMode="cover"
              style={{width: 100, height: 150, borderRadius: 10}}
            />
            <View style={{flex: 1, marginLeft: SIZES.radius}}>
              {/* Book name and author */}
              <View>
                <Text
                  style={{
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

              {/* Book Info */}
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: SIZES.radius,
                  }}>
                  <Image
                    source={icons.exchange_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    Đã nhận yêu cầu từ Quang Doan, Linh Tam và 3 người khác
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={icons.done_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    Đã duyệt
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={icons.read_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    Transfer Method
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.lightBrown,
                      marginHorizontal: 5,
                      marginVertical: 5,
                      paddingVertical: 5,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => showAlert(item.bookId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>Gỡ</Text>
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
      <View style={{flex: 1}}>{renderPostedBookList()}</View>
    </SafeAreaView>
  );
};
export default PostedBooks;
