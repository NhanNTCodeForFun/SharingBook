/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {UserApiContext} from '../../contexts/AuthContext';
import {getTransferenceById} from '../../services/request-services';

const ReminderTransference = props => {
  const [transferenceList, setTransferenceList] = useState([]);
  const {currentUser} = useContext(UserApiContext);
  const {reminder} = props;

  const fetchTransfenceData = useCallback(async () => {
    const transferenceIdList = reminder.transferenceIdList;
    let tempTransferenceList = [];
    for (let index = 0; index < transferenceIdList.length; index++) {
      const transference = await getTransferenceById(transferenceIdList[index]);
      tempTransferenceList.push(transference);
    }

    tempTransferenceList = tempTransferenceList.filter(
      transference => transference.requestStatus === 'Accepted',
    );

    setTransferenceList(tempTransferenceList);
  }, [reminder]);

  useEffect(() => {
    if (reminder && reminder.transferenceIdList) {
      fetchTransfenceData();
    }
  }, [fetchTransfenceData, reminder]);

  if (transferenceList.length > 0) {
    return (
      <View
        style={{
          marginHorizontal: SIZES.base,
          marginTop: SIZES.base,
          borderWidth: 1,
          borderColor: COLORS.lightGray3,
          borderRadius: SIZES.radius,
        }}>
        <View
          style={{
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.radius,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => console.log('appoinmentDetail')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              {/* Transference Information */}
              {transferenceList.length > 0 ? (
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
                      {transferenceList[0].fromBook.member.memberId ===
                      currentUser.memberId
                        ? transferenceList[0].toBook.member.name
                        : transferenceList[0].fromBook.member.name}
                    </Text>
                  </Text>
                  {transferenceList.map((transference, index) => (
                    <View key={index}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          paddingVertical: 2,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightBrown,
                            height: 20,
                            width: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 10, color: COLORS.white}}>
                            {index + 1}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingHorizontal: SIZES.radius,
                          }}>
                          <Text>
                            {transference.fromBook.name}
                            {'   '}&#x27BE;{'   '}
                            {transference.toBook.name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}

              {/* Button */}
              {reminder ? (
                <View
                  style={{flexDirection: 'column', marginTop: SIZES.radius}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        flex: 4,
                        backgroundColor: COLORS.lightBrown,
                        marginRight: 5,
                        paddingVertical: SIZES.base,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        reminder.reminder.active
                          ? props.viewReminder()
                          : props.createReminder()
                      }>
                      {reminder.reminder.active ? (
                        <Text style={{...FONTS.body4, color: COLORS.white}}>
                          Xem Lịch Hẹn
                        </Text>
                      ) : (
                        <Text style={{...FONTS.body4, color: COLORS.white}}>
                          Tạo Lịch Hẹn
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 2,
                        backgroundColor: COLORS.lightGray4,
                        marginLeft: 5,
                        paddingVertical: SIZES.base,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => props.confirmProcess()}>
                      <Text style={{...FONTS.body4, color: COLORS.white}}>
                        Xem Chi Tiết
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default ReminderTransference;
