/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from '../components/Utils/Spinner';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {getDistanceBetween} from '../services/google-map-services';
import {
  acceptRequest,
  getRequestsToMe,
  refuseRequest,
} from '../services/request-services';

const Request = ({navigation}) => {
  const {currentUser} = useContext(UserApiContext);
  const isFocused = useIsFocused();
  const [requestList, setRequestList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchRequestData = async () => {
    const response = await getRequestsToMe(currentUser.memberId);
    if (response) {
      await addInformationToRequestList(response);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRequestData();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  function displayAlternative() {
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.lightBrown,
          }}>
          Không có yêu cầu
        </Text>
      </View>
    );
  }

  const addInformationToRequestList = async requestListData => {
    const newRequestList = [];

    // add distance from book owner to current user
    for (const request of requestListData) {
      const distanceResponseObject = await getDistanceBetween(
        currentUser.address,
        request.fromBook.member.address,
      );
      // const distance = responseObject.rows[0].elements[0].distance.text;
      const distance = distanceResponseObject;
      const splitResult = distance.split(' ');
      request.fromBook.distance =
        parseInt(splitResult[0], 10) - 123 + Math.floor(Math.random() * 200);
      newRequestList.push(request);
    }

    newRequestList.map(
      request =>
        (request.fromBook.distance = request.fromBook.distance + ' km'),
    );
    setRequestList(newRequestList);
  };

  const handleAcceptRequest = async transferenceId => {
    const result = await acceptRequest(transferenceId);
    if (result) {
      await fetchRequestData();
      ToastAndroid.show('Chấp Nhận Thành Công', ToastAndroid.LONG);
    }
  };

  const handleRefuseRequest = async transferenceId => {
    const result = await refuseRequest(transferenceId);
    if (result) {
      await fetchRequestData();
      ToastAndroid.show('Từ Chối Thành Công', ToastAndroid.LONG);
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          marginTop: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>
              Trao đổi đang chờ
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBookRequestList() {
    const renderItem = ({item}) => {
      // const currentBook = bookData.find(b => b.name === item.fromBook.name);

      return (
        <View style={{marginVertical: SIZES.base}}>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() =>
              navigation.navigate('ExchangeDetail', {
                book: item.fromBook,
                handleAccept: () => handleAcceptRequest(item.transferenceId),
                handleRefuse: () => handleRefuseRequest(item.transferenceId),
              })
            }>
            {/* Book Cover */}
            <Image
              source={{uri: item.fromBook.frontSideImage}}
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
                  {item.fromBook.name}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  {item.fromBook.author}
                </Text>
              </View>

              {/* Transference Info */}
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
                    Yêu cầu đổi bởi {item.fromBook.member.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: SIZES.radius,
                  }}>
                  <Image
                    source={icons.page_filled_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    Đổi cuốn {item.toBook.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: SIZES.radius,
                  }}>
                  <Image
                    source={icons.location_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    {item.fromBook.distance}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 3,
                      backgroundColor: COLORS.lightBrown,
                      marginRight: 5,
                      marginVertical: 5,
                      paddingVertical: 5,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => handleAcceptRequest(item.transferenceId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Chấp nhận
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 3,
                      backgroundColor: COLORS.lightBrown,
                      marginRight: 5,
                      marginVertical: 5,
                      paddingVertical: 5,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => handleRefuseRequest(item.transferenceId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Từ chối
                    </Text>
                  </TouchableOpacity>

                  {/* Chat */}
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.lightGray4,
                      marginVertical: 5,
                      paddingVertical: 5,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      navigation.navigate('ChatRoom', {
                        uid: item.fromBook.member.memberId,
                        username: item.fromBook.member.name,
                      });
                    }}>
                    <Image
                      source={icons.chat_icon}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.lightGray2,
                      }}
                    />
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
          paddingTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}>
        {requestList.length > 0 ? (
          <FlatList
            data={requestList}
            renderItem={renderItem}
            keyExtractor={item => `${item.transferenceId}`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          displayAlternative()
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header Section */}
      <View style={{height: 50, backgroundColor: COLORS.lightBrown}}>
        {renderHeader()}
      </View>
      {/* Body Section */}
      <View style={{flex: 1}}>{renderBookRequestList()}</View>
    </SafeAreaView>
  );
};
export default Request;
