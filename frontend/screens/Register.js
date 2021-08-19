/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import * as UserServices from '../services/user-services';

const Register = ({navigation}) => {
  const [fullname, setFullname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState(null);

  const [cityOptions, setCityOptions] = React.useState([]);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [wardOptions, setWardOptions] = React.useState([]);

  const [validName, setValidName] = React.useState(-1);
  const [validUsername, setValidUserName] = React.useState(-1);
  const [validPassword, setValidPassword] = React.useState(-1);
  const [validConfirmPassword, setValidConfirmPassword] = React.useState(-1);
  const [validEmail, setValidEmail] = React.useState(-1);
  const [validPhone, setValidPhone] = React.useState(-1);
  const [validAddress, setValidAddress] = React.useState(-1);

  function onChangeName() {
    if (fullname.trim().length < 2) {
      setValidName(0);
    } else {
      setValidName(1);
    }
  }

  function onChangUsername() {
    if (username.trim().length < 6) {
      setValidUserName(0);
    } else {
      setValidUserName(1);
    }
  }

  function onChangePassword() {
    if (password.length < 6) {
      setValidPassword(0);
    } else {
      setValidPassword(1);
    }
  }

  function onChangeConfirmPassword() {
    if (confirm !== password) {
      setValidConfirmPassword(0);
    } else {
      setValidConfirmPassword(1);
    }
  }

  function onChangeEmail() {
    if (!email.match('[A-Za-z0-9._]+@\\w+(\\.[a-z]{2,3}){1,2}')) {
      setValidEmail(0);
    } else {
      setValidEmail(1);
    }
  }
  function onChangePhone() {
    if (!phone.match('0([0-9]){9,10}')) {
      setValidPhone(0);
    } else {
      setValidPhone(1);
    }
  }

  function onChangeAddress() {
    if (address.trim().length < 3) {
      setValidAddress(0);
    } else {
      setValidAddress(1);
    }
  }

  function onSubmit() {
    if (
      validName === 1 &&
      validUsername === 1 &&
      validPassword === 1 &&
      validConfirmPassword === 1 &&
      validEmail === 1 &&
      validPhone === 1 &&
      validAddress === 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  React.useEffect(() => {
    // Fetch City
    fetch('https://vapi.vnappmob.com/api/province/')
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setCityOptions(data.results);
          setWardOptions([]);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    if (selectedCity) {
      // Fetch quan huyen
      fetch(`https://vapi.vnappmob.com/api/province/district/${selectedCity}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setDistrictOptions(data.results);
            setWardOptions([]);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [selectedCity]);

  React.useEffect(() => {
    if (selectedDistrict) {
      // Fetch xa phuong
      fetch(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setWardOptions(data.results);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [selectedDistrict]);

  const getProvinceName = async () => {
    let provinceList = [];
    await fetch('https://vapi.vnappmob.com/api/province/')
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          provinceList = data.results;
        }
      })
      .catch(err => {
        console.error(err);
      });
    return provinceList.find(p => p.province_id === selectedCity).province_name;
  };

  const getDistrictName = async () => {
    let districtList = [];
    await fetch(
      `https://vapi.vnappmob.com/api/province/district/${selectedCity}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          districtList = data.results;
        }
      })
      .catch(err => {
        console.error(err);
      });
    return districtList.find(p => p.district_id === selectedDistrict)
      .district_name;
  };

  const getWardName = async () => {
    let wardList = [];
    await fetch(
      `https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          wardList = data.results;
        }
      })
      .catch(err => {
        console.error(err);
      });
    return wardList.find(p => p.ward_id === selectedWard).ward_name;
  };

  const handleSignUp = async () => {
    const provinceName = await getProvinceName();
    const districtName = await getDistrictName();
    const wardName = await getWardName();
    const data = {
      username: username,
      password: password,
      fullName: fullname,
      email: email,
      phoneNumber: phone,
      address:
        address + ',' + wardName + ',' + districtName + ',' + provinceName,
      cityId: selectedCity,
      districtId: selectedDistrict,
      wardId: selectedWard,
      addressDetail: address,
    };
    const result = await UserServices.signup(data);
    if (result) {
      ToastAndroid.show(
        'Đăng ký thành công, vui lòng đăng nhập lại để sử dụng!',
        ToastAndroid.LONG,
      );
      navigation.navigate('Login');
    }
  };

  function renderInformationForm() {
    return (
      <ScrollView>
        <Text style={{margin: 10, fontSize: 15}}>
          (<Text style={{color: COLORS.lightRed}}>*</Text>) Yêu cầu bắt buộc
        </Text>
        {/* Title label */}
        <View style={{padding: SIZES.padding}}>
          <View
            style={{
              height: 30,
              paddingHorizontal: SIZES.padding,
              borderBottomColor: COLORS.brown,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
            <Text style={{color: COLORS.brown, ...FONTS.body3}}>
              Thông tin người dùng
            </Text>
          </View>
          {/* Fullname input text */}
          {validName === 0 ? (
            <Text style={{color: COLORS.lightRed}}>Tên không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Họ và tên{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
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
              value={fullname}
              onChangeText={setFullname}
              onEndEditing={onChangeName}
            />
          </View>

          {/* Username input text */}
          {validUsername === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Tên đăng nhập không hợp lệ!
            </Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Tên đăng nhập (ít nhất 6 ký tự){' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={username}
              onChangeText={setUsername}
              onEndEditing={onChangUsername}
            />
          </View>

          {/* Password input text */}
          {validPassword === 0 ? (
            <Text style={{color: COLORS.lightRed}}>Mật khẩu không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Mật khẩu (ít nhất 6 ký tự){' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
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

          {/* Confirm input text */}
          {validConfirmPassword === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Nhập lại mật khẩu không khớp!
            </Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>
              Nhập lại mật khẩu{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={confirm}
              onChangeText={setConfirm}
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

          {/* Email input text */}
          {validEmail === 0 ? (
            <Text style={{color: COLORS.lightRed}}>Email không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>
              Email{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={email}
              onChangeText={setEmail}
              onEndEditing={onChangeEmail}
            />
          </View>

          {/* Phone input text  */}
          {validPhone === 0 ? (
            <Text style={{color: COLORS.lightRed}}>
              Số điện thoại không hợp lệ!
            </Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>
              Số điện thoại{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onEndEditing={onChangePhone}
            />
          </View>

          {/* City picker */}
          <View>
            <View>
              <Text style={{...FONTS.body5, marginTop: 5}}>
                Tỉnh/Thành phố{' '}
                <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
              </Text>
            </View>
            <Picker
              selectedValue={selectedCity}
              style={{height: 40}}
              onValueChange={itemValue => setSelectedCity(itemValue)}>
              {cityOptions.map(op => (
                <Picker.Item
                  key={op.province_id}
                  label={op.province_name}
                  value={op.province_id}
                />
              ))}
            </Picker>
          </View>

          {/* District picker */}
          <View>
            <View>
              <Text style={{...FONTS.body5, marginTop: 5}}>
                Quận/huyện{' '}
                <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
              </Text>
            </View>

            <Picker
              selectedValue={selectedDistrict}
              style={{height: 40}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDistrict(itemValue)
              }>
              {districtOptions.map(op => (
                <Picker.Item
                  key={op.district_id}
                  label={op.district_name}
                  value={op.district_id}
                />
              ))}
            </Picker>
          </View>

          {/* Ward picker */}
          <View>
            <View>
              <Text style={{...FONTS.body5, marginTop: 5}}>
                Xã/phường{' '}
                <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
              </Text>
            </View>

            <Picker
              selectedValue={selectedWard}
              style={{height: 40}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedWard(itemValue)
              }>
              {wardOptions.map(op => (
                <Picker.Item
                  key={op.ward_id}
                  label={op.ward_name}
                  value={op.ward_id}
                />
              ))}
            </Picker>
          </View>

          {/* Address input text */}
          {validAddress === 0 ? (
            <Text style={{color: COLORS.lightRed}}>Địa chỉ không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>
              Địa chỉ{' '}
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: 5,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={address}
              onChangeText={setAddress}
              onEndEditing={onChangeAddress}
            />
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
                let rs = onSubmit();
                if (rs) {
                  handleSignUp();
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
        headerName="Đăng ký"
        goBack={() => navigation.goBack()}
      />

      {/*information*/}
      <View style={{flex: 1}}>{renderInformationForm()}</View>
    </SafeAreaView>
  );
};

export default Register;
