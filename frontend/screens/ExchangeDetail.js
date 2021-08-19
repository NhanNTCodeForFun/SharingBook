/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  LogBox,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import OnBoarding from '../components/OnBoarding';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {getAllFeedbackToUser} from '../services/feedback-services';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ExchangeDetail = ({route, navigation}) => {
  const [currentBook, setBook] = React.useState(null);
  const [currentBookImageIndex, setCurrentBookImageIndex] = useState(1);
  const [feedbackData, setFeedbackData] = useState([]);

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

  const handleAcceptRequest = () => {
    route.params.handleAccept();
    navigation.goBack();
  };

  const handleRefuseRequest = () => {
    route.params.handleRefuse();
    navigation.goBack();
  };

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.lightGray2,
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
            {/* Rating */}
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>{currentBook.quality}%</Text>
              <Text style={{...FONTS.body4, color: COLORS.white}}>Độ mới</Text>
            </View>

            <LineDivider />

            {/* Pages */}
            {/* <Text style={{fontSize: SIZES.h4}}>Chủ sách:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              {currentBook.member.name}
            </Text> */}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.base,
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
            flex: 3,
            backgroundColor: COLORS.lightBrown,
            marginRight: 5,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleAcceptRequest}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Chấp nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 3,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: 5,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleRefuseRequest}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Từ chối</Text>
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray4,
            marginLeft: 5,
            marginVertical: SIZES.base,
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

  if (currentBook) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Navigation Header */}
        <HeaderNavigation
          headerName="Thông Tin Sách"
          goBack={() => navigation.goBack()}
        />
        {/* Book Image Section */}
        <View style={{flex: 10}}>
          <ScrollView style={{flex: 1}}>
            <View style={{height: 250, backgroundColor: COLORS.black}}>
              {renderBookInfoSection()}
            </View>
            {/* Information Section */}
            <View style={{flex: 1}}>{renderBookInformation()}</View>
          </ScrollView>
        </View>
        {/* Buttons */}
        <View style={{flex: 1}}>{renderBottomButton()}</View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default ExchangeDetail;
