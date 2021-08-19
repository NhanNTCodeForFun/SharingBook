/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import * as UserServices from '../services/user-services';

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const {currentUser} = useContext(UserApiContext);
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const [validPassword, setValidPassword] = React.useState(-1);
  const [validNewPassword, setValidNewPassword] = React.useState(-1);
  const [validConfirmPassword, setValidConfirmPassword] = React.useState(-1);

  function onChangePassword() {
    if (password.trim().length < 6) {
      setValidPassword(0);
    } else {
      setValidPassword(1);
    }
  }

  function onChangeNewPassword() {
    if (newPassword.trim().length < 6) {
      setValidNewPassword(0);
    } else {
      setValidNewPassword(1);
    }
  }

  function onChangeConfirmPassword() {
    if (confirmPassword !== newPassword) {
      setValidConfirmPassword(0);
    } else {
      setValidConfirmPassword(1);
    }
  }

  function onSubmit() {
    if (validConfirmPassword && validNewPassword && validPassword) {
      return true;
    } else {
      return false;
    }
  }

  const handleChangePassword = async () => {
    const data = {
      newPassword: newPassword,
      oldPassword: password,
    };

    const result = await UserServices.changePassword(
      currentUser.memberId,
      data,
    );
    if (result.data) {
      navigation.replace('Login', {logoutStatus: true});
      ToastAndroid.show(
        'Đổi mật khẩu thành công! Vui lòng đăng nhập lại để tiếp tục',
        ToastAndroid.LONG,
      );
    } else {
      Alert.alert(
        'Thông báo',
        'Mật khẩu không chính xác, xin vui lòng nhập lại mật khẩu!',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };
  function renderForm() {
    return (
      <ScrollView>
        <View style={{padding: SIZES.padding}}>
          <Text style={{margin: 10, fontSize: 15}}>
            (<Text style={{color: COLORS.lightRed}}>*</Text>) Yêu cầu bắt buộc
          </Text>

          {/* Password */}
          {!validPassword ? (
            <Text style={{color: COLORS.lightRed}}>Mật khẩu không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Mật Khẩu (Tối thiểu 6 ký tự)
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
          </View>
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
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visiblePassword}
              onEndEditing={onChangePassword}
            />
            <TouchableOpacity
              onPress={() => setVisiblePassword(!visiblePassword)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    visiblePassword
                      ? icons.unhide_password
                      : icons.hide_password
                  }
                  resizeMode="contain"
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* New Password */}
          {!validNewPassword ? (
            <Text style={{color: COLORS.lightRed}}>Mật khẩu không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Mật Khẩu Mới (Tối thiểu 6 ký tự)
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
          </View>
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
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!visiblePassword}
              onEndEditing={onChangeNewPassword}
            />
            <TouchableOpacity
              onPress={() => setVisiblePassword(!visiblePassword)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    visiblePassword
                      ? icons.unhide_password
                      : icons.hide_password
                  }
                  resizeMode="contain"
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* Confirm Password */}
          {!validConfirmPassword ? (
            <Text style={{color: COLORS.lightRed}}>Mật khẩu không khớp!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Xác Nhận Mật Khẩu Mới
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
          </View>
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!visiblePassword}
              onEndEditing={onChangeConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setVisiblePassword(!visiblePassword)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    visiblePassword
                      ? icons.unhide_password
                      : icons.hide_password
                  }
                  resizeMode="contain"
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
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
              onPress={() => {
                const rs = onSubmit();
                if (rs) {
                  handleChangePassword();
                } else {
                  Alert.alert(
                    'Thông báo',
                    'Xin vui lòng nhập đủ thông tin theo yêu cầu!',
                    [
                      {
                        text: 'OK',
                        style: 'cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    },
                  );
                }
              }}>
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
        headerName="Đổi Mật Khẩu"
        goBack={() => navigation.goBack()}
      />

      {/*information*/}
      <View style={{flex: 1}}>{renderForm()}</View>
    </SafeAreaView>
  );
};

export default ChangePassword;
