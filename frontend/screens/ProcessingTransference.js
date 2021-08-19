/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import ReminderTransference from '../components/ProcessTransference/ReminderTransference';
import Spinner from '../components/Utils/Spinner';
import {COLORS, FONTS} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {getReminderOfMember} from '../services/reminder-services';

const ProcessingTransference = ({navigation}) => {
  const isFocused = useIsFocused();
  const {currentUser} = useContext(UserApiContext);
  const [reminderList, setReminderList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchReminderData = useCallback(async () => {
    const temp = await getReminderOfMember(currentUser.memberId);
    if (temp) {
      setReminderList(temp);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [currentUser.memberId]);

  useEffect(() => {
    fetchReminderData();
  }, [currentUser, fetchReminderData]);

  useEffect(() => {
    if (isFocused) {
      fetchReminderData();
    }
  }, [fetchReminderData, isFocused]);

  function displayAlternative() {
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.lightBrown,
          }}>
          Không có giao dịch đang trao đổi
        </Text>
      </View>
    );
  }

  function renderTransference() {
    const renderItem = ({item}) => {
      const otherUser =
        item.reminder.firstMember.memberId === currentUser.memberId
          ? item.reminder.secondMember
          : item.reminder.firstMember;

      return (
        <ReminderTransference
          reminder={item}
          createReminder={() =>
            navigation.navigate('CreateAppointment', {
              chatRoom: true,
              otherUserId: otherUser.memberId,
            })
          }
          viewReminder={() =>
            navigation.navigate('ChatRoom', {
              uid: otherUser.memberId,
              username: otherUser.name,
            })
          }
          confirmProcess={() =>
            navigation.navigate('ProcessStatusConfirm', {
              reminder: item,
              isCalledFrom: 'ProcessingTransference',
            })
          }
        />
      );
    };

    return (
      <View
        style={{
          flex: 1,
        }}>
        {reminderList.length > 0 ? (
          <FlatList
            data={reminderList}
            renderItem={renderItem}
            keyExtractor={item => `${item.reminder.reminderId}`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          displayAlternative()
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Đang Trao Đổi"
        goBack={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>{renderTransference()}</View>
    </SafeAreaView>
  );
};

export default ProcessingTransference;
