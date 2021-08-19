/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, SIZES} from '../constants';
import * as RemiderService from '../services/reminder-services';
import {UserApiContext} from '../contexts/AuthContext';
import Spinner from '../components/Utils/Spinner';

const Appointment = ({navigation}) => {
  const {currentUser} = useContext(UserApiContext);
  const [reminderList, setReminderList] = React.useState([]);
  const SEVEN_HOURS = 7 * 60 * 60 * 1000;
  const [isLoading, setLoading] = React.useState(true);

  const fetchRequestData = async () => {
    const response = await RemiderService.getReminderOfMember(
      currentUser.memberId,
    );
    if (response) {
      console.log('aaa: ' + response);
      getReminder(response);

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
          Không có lịch hẹn
        </Text>
      </View>
    );
  }
  const getReminder = response => {
    let list = [];
    for (const reminder of response) {
      list.push(reminder);
    }
    list = list.filter(item => item.reminder.active === true);
    setReminderList(list);
  };
  const convertDate = date => {
    const dateObj = new Date(date);
    let month = '' + (dateObj.getMonth() + 1);
    let day = '' + dateObj.getDate();
    let year = dateObj.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('-');
  };

  const convertTime = date => {
    const dateObj = new Date(date);
    let time = '' + dateObj.getHours();
    let minute = '' + dateObj.getMinutes();

    if (time.length < 2) {
      time = '0' + time;
    }
    if (minute.length < 2) {
      minute = '0' + minute;
    }
    return time + ':' + minute;
  };
  const showAlert = reminderId =>
    Alert.alert(
      'Xác Nhận Hủy Hẹn',
      'Bạn có chắc muốn hủy hẹn! Bấm xác nhận để hủy.',
      [
        {
          text: 'Xác nhận',
          onPress: async () => {
            await RemiderService.deleteReminder(
              reminderId,
              currentUser.memberId,
            );
            navigation.replace('Appointment');
            ToastAndroid.show('Hủy hẹn thành công!', ToastAndroid.LONG);
          },
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
            navigation.navigate('CreateAppointment', {chatRoom: false});
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Tạo Lịch Hẹn Mới
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAppointment() {
    const renderItem = ({item}) => {
      return (
        <View style={{marginVertical: SIZES.base}}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => console.log('appoinmentDetail')}>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.lightGray4,
                  }}>
                  Bạn có hẹn với{' '}
                  <Text style={{color: COLORS.black}}>
                    {item.reminder.firstMember.memberId === currentUser.memberId
                      ? item.reminder.secondMember.name
                      : item.reminder.firstMember.name}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  Lúc:{' '}
                  <Text>
                    {convertTime(item.reminder.timestamp - SEVEN_HOURS)} ngày{' '}
                    {convertDate(item.reminder.timestamp - SEVEN_HOURS)}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  Tại: <Text>{item.reminder.location}</Text>
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
                    onPress={() => navigation.navigate('AnimatedMarker')}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Xem Đường Đi
                    </Text>
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
                    onPress={() => showAlert(item.reminder.reminderId)}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Hủy Hẹn
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
        {reminderList.length > 0 ? (
          <FlatList
            data={reminderList}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
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
        headerName="Lịch Hẹn"
        goBack={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>{renderAppointment()}</View>
      <View style={{height: 75}}>{renderBottomButton()}</View>
    </SafeAreaView>
  );
};

export default Appointment;
