/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FailResion from '../components/Chat/FailResion';
import Rating from '../components/Chat/Rating';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {markReminderIsDone} from '../services/reminder-services';
import {getTransferenceById} from '../services/request-services';
import {
  markProcessFailed,
  markProcessSuccessfully,
} from '../services/transferent-process-services';

const ProcessStatusConfirm = ({route, navigation}) => {
  const {currentUser} = useContext(UserApiContext);
  const [reminder, setReminder] = useState(null);
  const [transferenceList, setTransferenceList] = useState([]);
  const [displayTransference, setDisplayTransference] = useState(true);
  const [count, setCount] = useState(0);
  const [isCalledFrom, setIsCalledFrom] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchTransferenceData = useCallback(async () => {
    let tempTransferenceList = [];
    if (reminder) {
      const transferenceIdList = reminder.transferenceIdList;
      for (let index = 0; index < transferenceIdList.length; index++) {
        const transference = await getTransferenceById(
          transferenceIdList[index],
        );
        if (transference.processStatus !== 'Pending') {
          setCount(count + 1);
        }
        tempTransferenceList = [...tempTransferenceList, transference];
      }
    }

    if (reminder && tempTransferenceList.length > 0) {
      tempTransferenceList = tempTransferenceList.filter(
        transference =>
          transference.reminder.reminderId === reminder.reminder.reminderId,
      );
    }
    setTransferenceList(tempTransferenceList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminder]);

  useEffect(() => {
    fetchTransferenceData();
  }, [currentUser, fetchTransferenceData, reminder]);

  useEffect(() => {
    if (route.params && route.params.reminder) {
      setReminder(route.params.reminder);
    }
    if (route.params && route.params.isCalledFrom) {
      setIsCalledFrom(route.params.isCalledFrom);
    }
  }, [route]);

  const checkAllTransference = async status => {
    const transferenceIdList = reminder.transferenceIdList;
    let markAllTransferectDone = true;
    if (transferenceIdList.length > 0) {
      for (let index = 0; index < transferenceIdList.length; index++) {
        const result = status
          ? await markProcessSuccessfully(transferenceIdList[index])
          : await markProcessFailed(transferenceIdList[index]);
        if (!result) {
          markAllTransferectDone = false;
        }
      }
    }
    const isDone = await markReminderIsDone(reminder.reminder.reminderId);
    if (markAllTransferectDone && isDone) {
      setDisplayTransference(false);
    }
  };

  useEffect(() => {
    const hideTransference = async () => {
      if (count !== 0 && count === transferenceList.length) {
        const isDone = await markReminderIsDone(reminder.reminder.reminderId);
        if (isDone) {
          setDisplayTransference(false);
        }
      }
    };
    hideTransference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleSuccess = async transferenceId => {
    setIsSuccess(true);
    const result = await markProcessSuccessfully(transferenceId);
    if (result) {
      await fetchTransferenceData();
      setCount(count + 1);
    }
  };

  const handleFail = async transferenceId => {
    const result = await markProcessFailed(transferenceId);
    if (result) {
      await fetchTransferenceData();
      setCount(count + 1);
    }
  };

  function renderFeedback() {
    return (
      <View>
        <Rating
          reminder={reminder}
          goBack={() => navigation.navigate(isCalledFrom)}
        />
      </View>
    );
  }
  function renderFailResion() {
    return (
      <View>
        <FailResion
          reminder={reminder}
          goBack={() => navigation.navigate(isCalledFrom)}
        />
      </View>
    );
  }

  function renderItemButton(item) {
    const otherUser =
      item.fromBook.member.memberId === currentUser.memberId
        ? item.toBook.member
        : item.fromBook.member;

    return (
      <View style={{flexDirection: 'column', marginTop: SIZES.radius}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLORS.lightBrown,
              marginRight: 5,
              paddingVertical: SIZES.base,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleSuccess(item.transferenceId)}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>Hoàn Thành</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLORS.lightBrown,
              marginLeft: 5,
              marginRight: 10,
              paddingVertical: SIZES.base,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleFail(item.transferenceId)}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>Thất Bại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightGray4,
              height: 40,
              width: 40,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('ChatRoom', {
                uid: otherUser.memberId,
                username: otherUser.name,
              });
            }}>
            <Image
              source={icons.chat_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightGray2,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderItemStatus(status) {
    return (
      <View>
        <View
          style={{
            flex: 1,
            backgroundColor:
              status === 'Success' ? COLORS.lightGreen : COLORS.lightRed,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {status === 'Success' ? (
            <Text style={{...FONTS.h2, color: COLORS.white}}>Hoàn Thành</Text>
          ) : (
            <Text style={{...FONTS.h2, color: COLORS.white}}>
              Không Hoàn Thành
            </Text>
          )}
        </View>
      </View>
    );
  }

  function renderTransference() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.radius,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray3,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              {/* Transference Information */}
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    marginBottom: SIZES.radius,
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  Trao đổi với{' '}
                  <Text style={{...FONTS.h3, color: COLORS.black}}>
                    {item.fromBook.member.name}
                  </Text>
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item.fromBook.frontSideImage}}
                      resizeMode="cover"
                      style={{width: 100, height: 150, borderRadius: 10}}
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.brown,
                      }}>
                      {item.fromBook.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={icons.tranfer_vertical_icon}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.lightGray4,
                        transform: [{rotate: '90deg'}],
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item.toBook.frontSideImage}}
                      resizeMode="cover"
                      style={{width: 100, height: 150, borderRadius: 10}}
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.brown,
                      }}>
                      {item.toBook.name}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Button or Status */}
              <View>
                {item.processStatus === 'Pending'
                  ? renderItemButton(item)
                  : renderItemStatus(item.processStatus)}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={transferenceList}
          renderItem={renderItem}
          keyExtractor={item => `${item.transferenceId}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGreen,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            checkAllTransference(true);
            setIsSuccess(true);
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Hoàn Thành Tất Cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightRed,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            checkAllTransference(false);
            setIsSuccess(false);
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Giao Dịch Thất Bại
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Đánh Giá Trao Đổi"
        goBack={() => navigation.goBack()}
      />
      {displayTransference ? (
        <View style={{flex: 1}}>
          <View style={{flex: 10}}>{renderTransference()}</View>
          <View style={{flex: 1}}>{renderButton()}</View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {isSuccess ? renderFeedback() : renderFailResion()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProcessStatusConfirm;
