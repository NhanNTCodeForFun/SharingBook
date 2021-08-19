/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';

const AccessScreenIcon = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'center',
      }}>
      <Image
        source={icons.greater_than_icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          marginRight: 10,
          tintColor: COLORS.brown,
        }}
      />
    </View>
  );
};

const Profile = ({navigation}) => {
  const {currentUser} = useContext(UserApiContext);

  const navigationData = [
    {
      id: 1,
      icon: icons.user_icon,
      name: 'Thông tin cá nhân',
      navigate: 'Information',
    },
    {
      id: 2,
      icon: icons.book_icon,
      name: 'Sách của tôi',
      navigate: 'MyBookTab',
    },
    {
      id: 3,
      icon: icons.exchange_icon,
      name: 'Trao đổi đang chờ',
      navigate: 'Request',
    },
    {
      id: 4,
      icon: icons.exchange_icon,
      name: 'Yêu cầu của tôi',
      navigate: 'MyRequest',
    },
    {
      id: 5,
      icon: icons.switch_icon,
      name: 'Đang trao đổi',
      navigate: 'ProcessingTransference',
    },
    {
      id: 6,
      icon: icons.calender_icon,
      name: 'Lịch hẹn',
      navigate: 'Appointment',
    },
    {
      id: 7,
      icon: icons.chat_icon,
      name: 'Tin nhắn',
      navigate: 'Messages',
    },
    {
      id: 8,
      icon: icons.logout_icon,
      name: 'Đăng xuất',
      navigate: 'Login',
    },
  ];

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
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <Image
              source={{uri: currentUser.avatar}}
              resizeMode="cover"
              style={{width: 80, height: 80, borderRadius: 40}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 2,
          }}>
          <View
            style={{
              marginRight: SIZES.padding,
              alignItems: 'flex-start',
            }}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>
              {currentUser.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderNavigation() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() =>
            item.id !== 8
              ? navigation.navigate(item.navigate)
              : navigation.replace(item.navigate, {logoutStatus: true})
          }>
          <View
            style={{
              borderBottomWidth: 1,
              height: 60,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.black,
                }}
              />
            </View>
            <View
              style={{
                flex: 5,
                alignItems: 'flex-start',
                alignSelf: 'center',
              }}>
              <Text style={{...FONTS.body2}}>{item.name}</Text>
            </View>
            <AccessScreenIcon />
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView>
        <FlatList
          data={navigationData}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header Section */}
      <View style={{height: 120, backgroundColor: COLORS.lightBrown}}>
        {renderHeader()}
      </View>
      {/* Body Section */}
      <View style={{flex: 1}}>{renderNavigation()}</View>
    </SafeAreaView>
  );
};

export default Profile;
