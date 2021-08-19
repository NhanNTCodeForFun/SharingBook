/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const TransferStatus = props => {
  function handleUpdate() {
    props.handleUpdate();
  }

  function handleLater() {
    console.log('Later');
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: SIZES.padding,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.base,
          marginHorizontal: SIZES.padding,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray3,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.lightGray,
          }}>
          Trạng thái trao đổi
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray3,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.lightGray,
            }}>
            Lịch hẹn đã kết thúc. Hãy cập nhật trạng thái trao đổi của hai bạn.
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.base,
          marginBottom: SIZES.radius,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.lightBrown,
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: SIZES.base,
          }}
          onPress={handleUpdate}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Cập Nhật
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.lightBrown,
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: SIZES.base,
          }}
          onPress={handleLater}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Để Sau
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferStatus;
