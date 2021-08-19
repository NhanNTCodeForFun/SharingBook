/* eslint-disable react-native/no-inline-styles */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {SafeAreaView} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS} from '../constants';
import {Mybook, PostedBook} from '../screens';

const Tab = createMaterialTopTabNavigator();

function MyBookTab({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <HeaderNavigation
        headerName="Sách Của Tôi"
        goBack={() => navigation.goBack()}
      />
      <Tab.Navigator>
        <Tab.Screen name="Sách Chưa Đăng" component={Mybook} />
        <Tab.Screen name="Sách Đang Đăng" component={PostedBook} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default MyBookTab;
