/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import * as UserServices from '../services/user-services';

const UpdateInformation = ({navigation}) => {
  const {currentUser, updateUser} = useContext(UserApiContext);
  const [fullname, setFullname] = React.useState(currentUser.name);
  const [address, setAddress] = React.useState(currentUser.addressDetail);
  const [email, setEmail] = React.useState(currentUser.email);
  const [phone, setPhone] = React.useState(currentUser.phoneNumber);
  const [selectedCity, setSelectedCity] = React.useState(
    currentUser.cityId.toString(),
  );
  const [selectedDistrict, setSelectedDistrict] = React.useState(
    currentUser.districtId.toString(),
  );
  const [selectedWard, setSelectedWard] = React.useState(
    currentUser.wardId.toString(),
  );

  const [validName, setValidName] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPhone, setValidPhone] = React.useState(true);
  const [validAddress, setValidAddress] = React.useState(true);

  const [cityOptions, setCityOptions] = React.useState([]);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [wardOptions, setWardOptions] = React.useState([]);

  function onChangeName() {
    if (fullname.trim().length <= 0) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  }

  function onChangeEmail() {
    if (!email.match('[A-Za-z0-9._]+@\\w+(\\.[a-z]{2,3}){1,2}')) {
      setValidEmail(false);
    } else {
      setValidAddress(true);
    }
  }

  function onChangePhone() {
    if (!phone.match('0([0-9]){9,10}')) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
  }

  function onChangeAddress() {
    if (address.trim().length <= 0) {
      setValidAddress(false);
    } else {
      setValidAddress(true);
    }
  }

  function onSubmit() {
    if (validAddress && validEmail && validName && validPhone) {
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

  const handleUpdate = async () => {
    const provinceName = await getProvinceName();
    const districtName = await getDistrictName();
    const wardName = await getWardName();
    const data = {
      address:
        address + ',' + wardName + ',' + districtName + ',' + provinceName,
      addressDetail: address,
      cityId: selectedCity,
      districtId: selectedDistrict,
      email: email,
      name: fullname,
      phoneNumber: phone,
      wardId: selectedWard,
    };
    const result = await UserServices.update(currentUser.memberId, data);
    if (result) {
      ToastAndroid.show('Thay đổi thông tin thành công!', ToastAndroid.LONG);
      await updateUser();
      navigation.goBack();
    }
  };

  function renderInformationForm() {
    return (
      <ScrollView>
        {/* Title label */}
        <View style={{padding: SIZES.padding}}>
          {/* Fullname input text */}
          {!validName ? (
            <Text style={{color: COLORS.lightRed}}>Tên không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5}}>Họ và tên: </Text>
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

          {/* Email input text */}
          {!validEmail ? (
            <Text style={{color: COLORS.lightRed}}>Email không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>Email: </Text>
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
          {!validPhone ? (
            <Text style={{color: COLORS.lightRed}}>
              Số điện thoại không hợp lệ!
            </Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>Số điện thoại: </Text>
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
                Tỉnh/Thành phố:
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
              <Text style={{...FONTS.body5, marginTop: 5}}>Quận/huyện:</Text>
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
              <Text style={{...FONTS.body5, marginTop: 5}}>Xã/phường:</Text>
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
          {!validAddress ? (
            <Text style={{color: COLORS.lightRed}}>Địa chỉ không hợp lệ!</Text>
          ) : null}
          <View>
            <Text style={{...FONTS.body5, marginTop: 5}}>Địa chỉ: </Text>
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
                const rs = onSubmit();
                if (rs) {
                  handleUpdate();
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
                  Cập Nhật
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
        headerName="Thay Đổi Thông Tin"
        goBack={() => navigation.goBack()}
      />

      {/*information*/}
      <View style={{flex: 1}}>{renderInformationForm()}</View>
    </SafeAreaView>
  );
};

export default UpdateInformation;
