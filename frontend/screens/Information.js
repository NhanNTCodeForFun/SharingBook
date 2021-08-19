/* eslint-disable react-native/no-inline-styles */
import storage from '@react-native-firebase/storage';
import React, {useContext, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import * as UserServices from '../services/user-services';

const Information = ({navigation}) => {
  const {currentUser, updateUser} = useContext(UserApiContext);
  const [filePath, setFilePath] = React.useState(null);
  const information = [
    {
      id: 1,
      label: 'Tên đăng nhập: ',
      value: currentUser.username,
    },
    {
      id: 2,
      label: 'Họ và tên: ',
      value: currentUser.name,
    },
    {
      id: 3,
      label: 'Số điện thoại: ',
      value: currentUser.phoneNumber,
    },
    {
      id: 4,
      label: 'Email: ',
      value: currentUser.email,
    },
    {
      id: 5,
      label: 'Địa chỉ: ',
      value: currentUser.address,
    },
  ];

  useEffect(() => {
    const updateAvatarAsync = async () => {
      if (filePath) {
        const image = await uploadImage(filePath);
        const data = {
          newAvatar: image,
        };
        const rs = await UserServices.changeAvatar(currentUser.memberId, data);
        if (rs.data) {
          ToastAndroid.show(
            'Cập nhật ảnh đại diện thành công!',
            ToastAndroid.LONG,
          );
          await updateUser();
        }
      }
    };
    updateAvatarAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  const uploadImage = async image => {
    const {uri} = image;
    if (uri) {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = uri;
      let resultUrl = '';

      const task = storage().ref(filename).putFile(uploadUri);

      await task.then(async () => {
        console.log('Image uploaded to the bucket!');
        const mDownloadUrl = await storage().ref(filename).getDownloadURL();
        resultUrl = mDownloadUrl;
        console.log('Image Upload URL: ', mDownloadUrl);
      });

      try {
        await task;
        return resultUrl;
      } catch (e) {
        console.error(e);
      }
    }
  };

  const chooseFile = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        return;
      } else if (response.errorCode === 'permission') {
        Alert.alert('Không có quyền truy cập!');
        return;
      } else if (response.errorCode === 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      const source = {uri: response.assets[0].uri};
      setFilePath(source);
    });
  };

  function renderInformation() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginHorizontal: 10,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
              flex: 3,
              textAlign: 'left',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.label}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
              flex: 5,
              textAlign: 'left',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.value}
          </Text>
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <Image
            style={{
              resizeMode: 'cover',
              width: 200,
              height: 200,
              margin: 5,
            }}
            source={{uri: currentUser.avatar}}
          />
          <TouchableOpacity onPress={chooseFile}>
            <Image
              style={{
                resizeMode: 'cover',
                width: 30,
                height: 30,
              }}
              source={icons.camera_icon}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={information}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  const renderButton = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: SIZES.radius,
            marginVertical: SIZES.base,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('UpdateInformation')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Cập nhật thông tin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: SIZES.radius,
            marginVertical: SIZES.base,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header Section */}
      <HeaderNavigation
        headerName="Thông Tin Cá Nhân"
        goBack={() => navigation.goBack()}
      />
      {/* Body Section */}
      <View style={{flex: 8}}>{renderInformation()}</View>
      <View style={{flex: 1}}>{renderButton()}</View>
    </SafeAreaView>
  );
};

export default Information;
