/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';

const Login = ({route, navigation}) => {
  const {currentUser, isLogout, login, logout} = useContext(UserApiContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);

  useEffect(() => {
    let isLogout2 = false;
    if (route.params) {
      const {logoutStatus} = route.params;
      if (logoutStatus) {
        logout();
        isLogout2 = true;
      }
    }
    if (currentUser && !isLogout && !isLogout2) {
      navigation.navigate('Home');
      setLoginFail(false);
    }
  }, [currentUser, isLogout, logout, navigation, route, loginFail]);

  function renderImage() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={images.appLogo}
          resizeMode="contain"
          style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
        />
      </View>
    );
  }

  async function handleLogin() {
    await login({username, password});
    if (!currentUser) {
      setLoginFail(true);
    } else {
      setLoginFail(false);
    }
  }

  function renderLoginForm() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: SIZES.padding}}>
        {/* User Name Input Text */}
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}>
          <TextInput
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray4,
              flex: 1,
            }}
            value={username}
            onChangeText={setUsername}
            placeholder="Tên Đăng Nhập"
            placeholderTextColor={COLORS.lightGray4}
          />
        </View>
        {/* Password Input Text */}
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginTop: 10,
          }}>
          <TextInput
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray4,
              flex: 1,
            }}
            value={password}
            onChangeText={setPassword}
            placeholder="Mật Khẩu"
            placeholderTextColor={COLORS.lightGray4}
            secureTextEntry={!visiblePassword}
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
                  visiblePassword ? icons.unhide_password : icons.hide_password
                }
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
        {loginFail ? (
          <View>
            <Text
              style={{
                color: COLORS.lightRed,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Tên đăng nhập hoặc mật khẩu không chính xác!
            </Text>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: COLORS.brown,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.padding,
          }}>
          <TouchableOpacity style={{flex: 1}} onPress={() => handleLogin()}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.body2}}>Đăng Nhập</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Fotgot Password */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: COLORS.lightBrown}}
            onPress={() => console.log('Forgot password')}>
            Quên mật khẩu?
          </Text>
        </View>
        {/* Register */}
        <View style={{flex: 1}}>{renderRegisterText()}</View>
      </View>
    );
  }

  function renderRegisterText() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Bạn chưa có tài khoản? </Text>
        <Text
          style={{color: COLORS.lightBrown}}
          onPress={() => navigation.navigate('Register')}>
          Tạo mới!
        </Text>
      </View>
    );
  }

  return (
    //'#f8f9fb'
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* App Logo */}
      <View style={{flex: 3}}>{renderImage()}</View>

      {/* Login Form */}
      <View style={{flex: 3}}>{renderLoginForm()}</View>
    </SafeAreaView>
  );
};

export default Login;
