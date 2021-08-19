/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';

const BookItem = props => {
  const {book, navigateToBookDetail} = props;

  return (
    <View style={{marginVertical: SIZES.base}}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row'}}
        onPress={navigateToBookDetail}>
        {/* Book Cover */}
        <Image
          source={{uri: book.frontSideImage}}
          resizeMode="cover"
          style={{width: 100, height: 150, borderRadius: 10}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginLeft: SIZES.radius,
          }}>
          {/* Book name and author */}
          <View style={{flex: 1}}>
            <Text
              style={{
                paddingRight: SIZES.padding,
                ...FONTS.h2,
                color: COLORS.lightGray4,
              }}>
              {book.name}
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.lightGray4,
              }}>
              {book.author}
            </Text>
          </View>

          {/* Book Info */}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
              <Image
                source={icons.price_icon}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.lightGray}}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.lightGray,
                  paddingHorizontal: SIZES.radius,
                }}>
                Giá bìa: {book.price}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
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
                {book.distance}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
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
                Thể loại trao đổi: tiểu thuyết
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookItem;
