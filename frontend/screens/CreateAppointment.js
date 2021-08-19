/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {addNewReminder, updateReminder} from '../services/reminder-services';

const CreateAppointment = ({route, navigation}) => {
  const SEVEN_HOURS = 7 * 60 * 60 * 1000;
  const [mode, setMode] = useState('create');
  const {currentUser} = useContext(UserApiContext);
  const [username, setUsername] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  let {chatRoom, otherUserId} = route.params;

  useEffect(() => {
    let {reminderResponse} = route.params;
    if (reminderResponse) {
      const reminderLocation = reminderResponse.reminder.location;
      const reminderTime = reminderResponse.reminder.timestamp;
      setMode('update');
      setDate(new Date(reminderTime - SEVEN_HOURS));
      setLocation(reminderLocation);
    }
  }, [SEVEN_HOURS, route.params]);

  const convertDate = () => {
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

    return [year, month, day].join('-');
  };

  const convertTime = () => {
    const dateObj = new Date(date);
    let time = '' + dateObj.getHours();
    let minute = '' + dateObj.getMinutes();

    if (time.length < 2) {
      time = '0' + time;
    }
    if (minute.length < 2) {
      minute = '0' + minute;
    }
    return time + ':' + minute + ':00';
  };

  const handleCreateReminder = async () => {
    const activeReminderDto = {
      firstMemberId: currentUser.memberId,
      secondMemberId: otherUserId,
      location: location,
      time: convertDate() + ' ' + convertTime(),
    };
    const result = await addNewReminder(activeReminderDto);
    if (result) {
      navigation.goBack();
    }
  };

  const handleUpdateReminder = async () => {
    let {reminderResponse} = route.params;
    const updateReminderDto = {
      reminderId: reminderResponse.reminder.reminderId,
      location: location,
      time: convertDate() + ' ' + convertTime(),
    };
    const result = await updateReminder(updateReminderDto);
    if (result) {
      navigation.goBack();
    }
  };

  function renderInformationForm() {
    return (
      <ScrollView>
        {/* Title label */}
        <View style={{padding: SIZES.padding}}>
          <View
            style={{
              height: 30,
              paddingHorizontal: SIZES.padding,
              borderBottomColor: COLORS.brown,
              borderBottomWidth: StyleSheet.hairlineWidth,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{flex: 1, color: COLORS.brown, ...FONTS.body3}}>
              Thông tin cuộc hẹn
            </Text>
          </View>
          {/* ID*/}

          <View>
            {!chatRoom ? <Text style={{...FONTS.body5}}>Hẹn với: </Text> : null}
          </View>
          {!chatRoom ? (
            <View
              style={{
                flexDirection: 'row',
                height: 40,
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
                paddingHorizontal: SIZES.padding,
              }}>
              <TextInput
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  flex: 1,
                }}
                value={username}
                onChangeText={setUsername}
                placeholder="Nhập ID đối phương"
              />
            </View>
          ) : null}

          <View>
            <Text style={{...FONTS.body5}}>Địa điểm: </Text>
          </View>
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
              value={location}
              onChangeText={setLocation}
              placeholder="Nhập địa điểm"
              placeholderTextColor={COLORS.lightGray4}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image
                source={icons.search_icon}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </View>
          </View>
          <View>
            <Text style={{...FONTS.body5}}>Thời gian: </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.base,
            }}>
            <DatePicker date={date} locale="vi" onDateChange={setDate} />
          </View>

          {/* Confirm Button */}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.brown,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={
                mode === 'create' ? handleCreateReminder : handleUpdateReminder
              }>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body2}}>
                  Xác nhận
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fb'}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName={mode === 'create' ? 'Tạo lịch hẹn' : 'Thay đổi lịch hẹn'}
        goBack={() => navigation.goBack()}
      />

      {/*information*/}
      <View style={{flex: 1}}>{renderInformationForm()}</View>
    </SafeAreaView>
  );
};

export default CreateAppointment;
