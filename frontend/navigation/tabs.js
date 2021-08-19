/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, View} from 'react-native';
import {COLORS, icons} from '../constants';
import {Home, Profile, Request, CreateBook} from '../screens';

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  keyboardHidesTabBar: true,
  style: {
    height: '8%',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray2,
  },
};

const NavigationIcon = ({iconName, tintColor}) => (
  <View
    style={{
      alignContent: 'center',
      alignItems: 'center',
    }}>
    <Image
      source={iconName}
      resizeMode="contain"
      style={{
        tintColor: tintColor,
        width: 25,
        height: 25,
      }}
    />
  </View>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? COLORS.brown : COLORS.lightGray3;
          switch (route.name) {
            case 'Home':
              return (
                <NavigationIcon
                  iconName={icons.dashboard_icon}
                  tintColor={tintColor}
                />
              );
            case 'Create Book':
              return (
                <NavigationIcon
                  iconName={icons.book_icon}
                  tintColor={tintColor}
                />
              );
            case 'Request':
              return (
                <NavigationIcon
                  iconName={icons.exchange_icon}
                  tintColor={tintColor}
                />
              );
            case 'Notification':
              return (
                <NavigationIcon
                  iconName={icons.user_icon}
                  tintColor={tintColor}
                />
              );
            case 'Profile':
              return (
                <NavigationIcon
                  iconName={icons.user_icon}
                  tintColor={tintColor}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create Book" component={CreateBook} />
      <Tab.Screen name="Request" component={Request} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
