/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  LogBox,
} from 'react-native';
import {getAllUsersAPI} from '../services/user-services';
import {color} from 'react-native-reanimated';
import {db} from '../firebase';
import {UserApiContext} from '../contexts/AuthContext';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';

const Messages = ({navigation}) => {
  const [users, setUsers] = useState(null);
  const {currentUser} = useContext(UserApiContext);
  LogBox.ignoreLogs(['Setting a timer']);

  const fetchMembers = useCallback(async () => {
    let allMembersResponses = await getAllUsersAPI();
    allMembersResponses = allMembersResponses.filter(
      x => x.memberId !== currentUser.memberId && !x.admin,
    );
    if (allMembersResponses) {
      setUsers(allMembersResponses);
    }
  }, [currentUser.memberId]);

  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);
  //*search function
  const [searchValue, setSearchValue] = useState('');
  const filterMessage = () => {
    setUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  };

  function renderHeader() {
    return (
      <View style={{backgroundColor: COLORS.white}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            marginTop: SIZES.radius,
            height: 70,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray3,
          }}>
          {/*Item goback */}
          <TouchableOpacity
            style={{marginLeft: SIZES.base}}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: COLORS.black}}
            />
          </TouchableOpacity>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>Tin nhắn</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.base,
              }}>
              {/*search input*/}
              <TextInput
                style={{
                  flex: 1,
                  ...FONTS.body6,
                  color: COLORS.lightGray,
                  marginBottom: -5,
                }}
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder="Tìm kiếm"
                placeholderTextColor={COLORS.lightGray}
              />
              <TouchableOpacity onPress={() => filterMessage()}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/*Search icon */}
                  <Image
                    source={icons.search_icon}
                    resizeMode="contain"
                    style={{
                      width: SIZES.radius,
                      height: SIZES.radius,
                      marginTop: SIZES.base,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{marginRight: SIZES.base, backgroundColor: COLORS.white}}
            onPress={() => console.log('Click more')}>
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: SIZES.body1,
                height: SIZES.body1,
                tintColor: COLORS.black,
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderMessagesBox() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray3,
            paddingVertical: SIZES.radius,
          }}
          onPress={() =>
            navigation.navigate('ChatRoom', {
              uid: item.memberId,
              username: item.name,
            })
          }>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: item.avatar}}
                style={{height: 40, width: 40, borderRadius: 25}}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                flex: 5,
                flexDirection: 'column',
                paddingRight: SIZES.radius,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/*Name */}
                <Text style={{...FONTS.h4, color: COLORS.black}}>
                  {item.name}
                </Text>
                {/*Time */}
                <Text>2 phút trước</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                {/*Text message */}
                <Text>{item.email}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => `${item.memberId}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Navigation Header */}
      <View>{renderHeader()}</View>
      {/*Messages box */}
      <View style={{flex: 1}}>{renderMessagesBox()}</View>
    </SafeAreaView>
  );
};

export default Messages;
