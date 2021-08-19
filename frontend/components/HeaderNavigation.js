/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const HeaderNavigation = props => {
  return (
    <View style={{backgroundColor: COLORS.lightBrown}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.radius,
          marginTop: SIZES.radius,
          height: 40,
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          style={{marginLeft: SIZES.base}}
          onPress={props.goBack}>
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{width: 25, height: 25, tintColor: COLORS.white}}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            {props.headerName}
          </Text>
        </View>

        <TouchableOpacity
          style={{marginRight: SIZES.base}}
          onPress={() => console.log('Click more')}>
          <Image
            source={icons.more_icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderNavigation;
