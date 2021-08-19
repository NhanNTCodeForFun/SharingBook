/* eslint-disable react-native/no-inline-styles */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BookItem from '../components/Home/BookItem';
import Spinner from '../components/Utils/Spinner';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {ApiContext} from '../contexts/BookDataContext';
import {getDistanceBetween} from '../services/google-map-services';
import NotificationButton from '../components/Home/NotificationButton';

const Tab = createMaterialTopTabNavigator();
const Home = ({navigation}) => {
  const {books, getBooks} = useContext(ApiContext);
  const {currentUser} = useContext(UserApiContext);
  const isFocused = useIsFocused();
  const [searchValue, setSearchValue] = useState('');
  const [myBooks, setMyBooks] = useState(books);
  const [loading, setLoading] = useState(true);
  const [addInforSuccessfully, setAddInforSuccessfully] = useState(false);

  const addInformationToBookList = async () => {
    let newBookList = [];
    // add distance from book owner to current user
    for (const book of books) {
      const responseObject = await getDistanceBetween(
        currentUser.address,
        book.member.address,
      );
      // const distance = responseObject.rows[0].elements[0].distance.text;
      const distance = responseObject;
      const splitResult = distance.split(' ');
      book.distance =
        parseInt(splitResult[0], 10) - 123 + Math.floor(Math.random() * 200);
      // book.distance = parseInt(splitResult[0], 10) - 123 + Date.now();
      newBookList.push(book);
    }
    newBookList.sort(function (a, b) {
      return a.distance - b.distance;
    });
    newBookList.map(book => (book.distance = book.distance + ' km'));
    
    newBookList = newBookList.filter(
      book => book.member.memberId !== currentUser.memberId,
    );
    newBookList = newBookList.filter(
      book => book.display === true
    );
    setMyBooks(newBookList);
  };

  useEffect(() => {
    const updateData = async () => {
      if (books.length > 0 && !addInforSuccessfully) {
        setAddInforSuccessfully(true);
        await addInformationToBookList();
        setLoading(false);
      }
    };
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (isFocused) {
        setAddInforSuccessfully(false);
        setLoading(true);
        await getBooks();
      }
    };
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (books.length === 0) {
        await getBooks();
      }
    };
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBookName = () => {
    setMyBooks(
      books.filter(
        book =>
          book.member.memberId !== currentUser.memberId &&
          (book.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.author.toLowerCase().includes(searchValue.toLowerCase())),
      ),
    );
  };

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* Avatar */}
        <View
          style={{
            backgroundColor: COLORS.brown,
            height: 40,
            width: 40,
            borderRadius: 25,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <Image
                source={{uri: currentUser.avatar}}
                resizeMode="cover"
                style={{width: 35, height: 35, borderRadius: 25}}
              />
            </View>
          </View>
        </View>
        {/* Greetings */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginLeft: SIZES.radius,
              alignItems: 'flex-start',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>Xin chào,</Text>
            <Text style={{...FONTS.h2, color: COLORS.white}}>
              {currentUser.name}
            </Text>
          </View>
        </View>
        {/* Notification */}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <NotificationButton />
        </TouchableOpacity>
      </View>
    );
  }

  function renderSearchInput() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: SIZES.padding,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginVertical: SIZES.base,
          }}>
          <TextInput
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray4,
              flex: 1,
            }}
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="Bạn muốn chọn sách gì?"
            placeholderTextColor={COLORS.lightGray4}
          />
          <TouchableOpacity onPress={() => filterBookName()}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icons.search_icon}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryData() {
    const renderItem = ({item}) => {
      return (
        <BookItem
          book={item}
          navigateToBookDetail={() =>
            navigation.navigate('BookDetail', {book: item})
          }
        />
      );
    };

    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}>
        {loading ? (
          <Spinner />
        ) : (
          <FlatList
            data={myBooks}
            renderItem={renderItem}
            keyExtractor={item => `${item.bookId}`}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header Section */}
      <View
        style={{
          height: 120,
          backgroundColor: COLORS.lightBrown,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {renderHeader()}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {renderSearchInput()}
        </View>
      </View>
      <View
        style={{
          flex: 8,
          flexDirection: 'column',
          backgroundColor: COLORS.white,
        }}>
        <Tab.Navigator>
          <Tab.Screen name="Gần Nhất" component={renderCategoryData} />
          <Tab.Screen name="Phù Hợp" component={renderCategoryData} />
          <Tab.Screen name="Đang Hot" component={renderCategoryData} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Home;
