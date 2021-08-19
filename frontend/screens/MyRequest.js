/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import Spinner from '../components/Utils/Spinner';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {getDistanceBetween} from '../services/google-map-services';
import {getMyRequests} from '../services/request-services';
import * as RequestService from '../services/request-services';

const MyRequest = ({navigation}) => {
  const {currentUser} = useContext(UserApiContext);
  const [myRequestList, setMyRequestList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchRequestData = async () => {
    const response = await getMyRequests(currentUser.memberId);
    if (response) {
      await addInformationToBookList(response);
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
  }, []);

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

  function showAlert(requestId) {
    Alert.alert(
      'Xác Nhận Hủy Yêu Cầu',
      'Bạn có chắc muốn hủy yêu cầu! Bấm xác nhận để hủy.',
      [
        {
          text: 'Xác nhận',
          onPress: () => cancelRequest(requestId),
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

  const cancelRequest = async requestId => {
    const result = await RequestService.cancelRequest(requestId);
    if (result) {
      ToastAndroid.show('Hủy yêu cầu thành công!', ToastAndroid.LONG);
      navigation.replace('MyRequest');
    } else {
      ToastAndroid.show('Hủy yêu cầu không thành công!', ToastAndroid.LONG);
    }
  };


  const addInformationToBookList = async myRequestListData => {
    let newMyRequestList = [];
    // add distance from book owner to current user
    for (const request of myRequestListData) {
      const distanceResponseObject = await getDistanceBetween(
        currentUser.address,
        request.toBook.member.address,
      );
      // const distance = responseObject.rows[0].elements[0].distance.text;
      const distance = distanceResponseObject;
      const splitResult = distance.split(' ');
      request.toBook.distance =
        parseInt(splitResult[0], 10) - 123 + Math.floor(Math.random() * 200);
      newMyRequestList.push(request);
    }

    newMyRequestList.map(
      request => (request.toBook.distance = request.toBook.distance + ' km'),
    );
    newMyRequestList =  newMyRequestList.filter(request => request.requestStatus === 'Pending');
    setMyRequestList(newMyRequestList);
  };

  const calculateDate = date => {
    const requestDate = new Date(date);
    const presentDate = new Date();
    const differenceInTime = presentDate.getDate() - requestDate.getDate();
    return differenceInTime;
  };

  function renderBookRequestSent() {
    const renderItem = ({item}) => {
      return (
        <View style={{marginVertical: SIZES.base}}>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() =>
              navigation.navigate('BookDetail', {book: item.toBook})
            }>
            {/* Book Cover */}
            <Image
              source={{uri: item.toBook.frontSideImage}}
              resizeMode="cover"
              style={{width: 100, height: 150, borderRadius: 10}}
            />
            <View style={{flex: 1, marginLeft: SIZES.radius}}>
              {/*Book name and author*/}
              <View>
                <Text style={{...FONTS.h2, color: COLORS.lightGray4}}>
                  {item.toBook.name}
                </Text>
                <Text style={{...FONTS.h3, color: COLORS.lightGray4}}>
                  {item.toBook.author}
                </Text>
              </View>
              {/*Request info */}
              <View style={{flexDirection: 'column'}}>
                {/*Request recever */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: SIZES.radius,
                  }}>
                  <Image
                    source={icons.greater_than_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    Đã gửi yêu cầu cho {item.toBook.member.name}
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
                    Đổi cuốn {item.fromBook.name}
                  </Text>
                </View>
                {/*Time*/}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: SIZES.radius,
                  }}>
                  <Image
                    source={icons.clock_icon}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
                  />
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.lightGray,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    {calculateDate(item.date) === 0
                      ? 'Vừa mới yêu cầu'
                      : calculateDate(item.date) + ' ngày trước'}
                  </Text>
                </View>

                {/*Time*/}
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
                    {item.toBook.distance}
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
                    onPress={() => showAlert(item.transferenceId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Hủy yêu cầu
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
                        uid: item.toBook.member.memberId,
                        username: item.toBook.member.name,
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
        {myRequestList.length > 0 ? (
          <FlatList
            data={myRequestList}
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
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Yêu cầu của bạn"
        goBack={() => navigation.goBack()}
      />
      {/*Request list */}
      <View style={{flex: 1}}>{renderBookRequestSent()}</View>
    </SafeAreaView>
  );
};

export default MyRequest;
