/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import OnBoarding from '../components/OnBoarding';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {ApiContext} from '../contexts/BookDataContext';
import {getAllFeedbackToUser} from '../services/feedback-services';
import * as requestServices from '../services/request-services';

const LineDivider = () => {
  return (
    <View style={{width: 1, paddingVertical: 5}}>
      <View
        style={{
          flex: 1,
          borderColor: COLORS.white,
          borderLeftWidth: 1,
        }}
      />
    </View>
  );
};

const BookDetail = ({route, navigation}) => {
  const {books} = useContext(ApiContext);
  const {currentUser} = useContext(UserApiContext);
  const [currentBook, setBook] = useState(null);
  const [displayPicker, setDisplayPicker] = useState(null);
  const [myBook, setMyBook] = useState(null);
  const [currentBookImageIndex, setCurrentBookImageIndex] = useState(1);
  const [feedbackData, setFeedbackData] = useState([]);

  React.useEffect(() => {
    let {book} = route.params;
    setBook(book);
  }, [fetchOwnerFeedback, route.params]);

  useEffect(() => {
    fetchOwnerFeedback();
  }, [currentBook, fetchOwnerFeedback]);

  const fetchOwnerFeedback = useCallback(async () => {
    if (currentBook) {
      const result = await getAllFeedbackToUser(currentBook.member.memberId);
      if (result) {
        setFeedbackData(result);
      }
    }
  }, [currentBook]);

  const changeImage = index => {
    setCurrentBookImageIndex(index);
  };

  const handleCreateTransferRequest = async () => {
    if (myBook) {
      const data = {
        fromBookId: myBook,
        toBookId: currentBook.bookId,
      };
      const result = await requestServices.createTransferRequest(data);
      if (result) {
        ToastAndroid.show('Yêu cầu thành công!', ToastAndroid.LONG);
        navigation.navigate('Home');
      }
    }
  };

  const calculateAverageStar = () => {
    let sumStar = 0;
    let averageStar;
    if (feedbackData.length > 0) {
      for (let index = 0; index < feedbackData.length; index++) {
        sumStar += feedbackData[index].star;
      }
      averageStar = sumStar / feedbackData.length;
      averageStar = Math.round(averageStar * 10) / 10;
    }
    return (
      <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
        {averageStar}/5 ({feedbackData.length} Đánh Giá)
      </Text>
    );
  };

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.lightGray2,
            opacity: displayPicker ? 0.3 : 1,
            flex: 1,
          }}>
          <OnBoarding
            book={currentBook}
            changeImage={changeImage}
            screen="BookDetail"
          />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: SIZES.base,
              opacity: 0.7,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.lightGray4,
            }}>
            <Text style={{color: COLORS.white}}>
              {currentBookImageIndex + 1} / 3
            </Text>
          </View>
          <View
            style={{
              margin: 5,
              position: 'absolute',
              bottom: SIZES.padding,
              right: SIZES.padding,
              width: 25,
              height: 25,
              color: 'tomato',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FullScreenImage', {book: currentBook})
              }>
              <Image
                source={icons.zoom_icon}
                resizeMode="contain"
                style={{width: 40, height: 40, tintColor: COLORS.lightGray4}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderBookInformation() {
    return (
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Location */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.lightGray4,
              }}>
              &#127969; {currentBook.member.address}
            </Text>
          </View>
        </View>

        {/* Title and Author */}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.brown}}>
            {currentBook.name}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {currentBook.author}
          </Text>
        </View>

        {/* Book Info */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightBrown,
          }}>
          {/* Rating */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {currentBook.quality}%
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Độ mới</Text>
          </View>

          <LineDivider />

          {/* Pages */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.radius,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {currentBook.pageNum}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Trang</Text>
          </View>

          <LineDivider />

          {/* Language */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {currentBook.language}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Ngôn ngữ</Text>
          </View>
        </View>

        {/* More Information */}
        <View style={{paddingTop: SIZES.radius}}>
          {/* Book Owner */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: SIZES.h4}}>Chủ sách:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              {currentBook.member.name}
            </Text>
          </View>
          {/* Owner's Rating */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.base,
            }}>
            <Text style={{fontSize: SIZES.h4}}>Đánh giá chủ sách:</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              {feedbackData.length > 0 ? (
                calculateAverageStar()
              ) : (
                <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                  Chưa có đánh giá
                </Text>
              )}
              {feedbackData.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('BookOwnerFeedback', {
                      bookOwnerId: currentBook.member.memberId,
                    })
                  }>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.lightBrown,
                      marginLeft: SIZES.base,
                    }}>
                    Xem
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.base,
            }}>
            <Text style={{fontSize: SIZES.h4}}>Thể loại trao đổi:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              Tiểu thuyết, Manga
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.base,
            }}>
            <Text style={{fontSize: SIZES.h4}}>Giá bìa:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              {currentBook.price} VND
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingTop: SIZES.base,
            }}>
            <Text style={{fontSize: SIZES.h4}}>
              Mô tả:{'     '}{currentBook.description}
            </Text>
          </View>
        </View>
        {renderMyBookSection('Cùng chủ sách')}
        {renderMyBookSection('Có thể bạn cũng thích')}
      </View>
    );
  }

  function renderMyBookSection(title) {
    const allBooks = books;
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.push('BookDetail', {
              book: item,
            })
          }>
          {/* Book Cover */}
          <Image
            source={{uri: item.frontSideImage}}
            resizeMode="cover"
            style={{
              width: 90,
              height: 125,
              borderRadius: 10,
            }}
          />

          {/* Book Info */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: 90,
                ...FONTS.body3,
                color: COLORS.black,
              }}
              numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{flex: 1, marginTop: SIZES.radius}}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.black}}>{title}</Text>

          <TouchableOpacity onPress={() => console.log('See More')}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                alignSelf: 'flex-start',
                textDecorationLine: 'none',
              }}>
              xem thêm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books */}
        <View style={{flex: 1, marginTop: SIZES.radius}}>
          <FlatList
            data={
              title === 'Cùng chủ sách'
                ? allBooks.filter(
                    b =>
                      b.member.memberId === currentBook.member.memberId &&
                      b.bookId !== currentBook.bookId,
                  )
                : allBooks.filter(
                    b =>
                      b.bookId !== currentBook.bookId &&
                      b.member.memberId !== currentUser.memberId &&
                      b.category.categoryId === currentBook.category.categoryId,
                  )
            }
            renderItem={renderItem}
            keyExtractor={item => item.bookId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Create Transfer Request */}
        <TouchableOpacity
          style={{
            flex: 5,
            backgroundColor: COLORS.lightBrown,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setDisplayPicker(true);
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Tạo Yêu Cầu Trao Đổi
          </Text>
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray4,
            marginVertical: SIZES.base,
            marginLeft: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('ChatRoom', {
              uid: currentBook.member.memberId,
              username: currentBook.member.name,
            });
          }}>
          <Image
            source={icons.chat_icon}
            resizeMode="contain"
            style={{width: 25, height: 25, tintColor: COLORS.lightGray2}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderPicker() {
    return (
      <View style={{height: 200}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            paddingHorizontal: SIZES.padding,
            marginTop: 10,
            backgroundColor: COLORS.lightBrown,
          }}>
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.white,
              flex: 1,
              textAlign: 'center',
            }}>
            Chọn sách của bạn để trao đổi
          </Text>
        </View>
        {/* Book Picker */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginTop: 10,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
              flex: 1,
              textAlign: 'left',
            }}>
            Chọn sách:
          </Text>
          <Picker
            selectedValue={myBook}
            style={{height: 60, flex: 2}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue !== 0) {
                setMyBook(itemValue);
              }
            }}>
            <Picker.Item
              key={0}
              label="-- Sách muốn đổi --"
              value={null}
              color={COLORS.lightGray}
            />
            {books
              .filter(
                b =>
                  b.member.memberId === currentUser.memberId &&
                  !b.transferStatus,
              )
              .map((b, index) => (
                <Picker.Item key={index + 1} label={b.name} value={b.bookId} />
              ))}
          </Picker>
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'column',
            marginTop: SIZES.radius,
            height: 50,
            marginHorizontal: 10,
          }}>
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
              onPress={handleCreateTransferRequest}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Xác Nhận</Text>
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
              onPress={() => setDisplayPicker(null)}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (currentBook) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Navigation Header */}
        <HeaderNavigation
          headerName="Thông Tin Sách"
          goBack={() => navigation.goBack()}
        />
        {/* Book Image Section */}
        <View style={{flex: 8}}>
          <ScrollView style={{flex: 1}}>
            <View style={{height: 250, backgroundColor: COLORS.black}}>
              {renderBookInfoSection()}
            </View>
            {/* Information Section */}
            <View
              style={{
                flex: 1,
                opacity: displayPicker ? 0.3 : 1,
              }}>
              {renderBookInformation()}
            </View>
          </ScrollView>
        </View>

        {/* Book Picker */}
        <View>{displayPicker ? renderPicker() : null}</View>
        {/* Buttons */}
        {displayPicker ? (
          true
        ) : (
          <View style={{flex: 1}}>{renderBottomButton()}</View>
        )}
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default BookDetail;
