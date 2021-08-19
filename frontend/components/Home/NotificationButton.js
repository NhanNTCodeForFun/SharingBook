/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Badge} from 'react-native-elements';
import {COLORS, icons} from '../../constants';
import {UserApiContext} from '../../contexts/AuthContext';
import * as notificationServices from '../../services/notification-services';

const NotificationButton = () => {
  const [notifications, setNotifications] = useState([]);
  const {currentUser} = useContext(UserApiContext);
  const isFocused = useIsFocused();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchRequestNotification = async () => {
      if (currentUser && isFocused) {
        const requestNotifications = await getRequestNotification();
        const reminderNotification = await getReminderNotification();
        const bookNotification = await getBookNotification();
        const banNotification = await getBanNotification();
        const mergeNotification = requestNotifications.concat(
          reminderNotification,
          bookNotification,
          banNotification,
        );
        mergeNotification.sort((a, b) => a.notificationId < b.notificationId);
        setNotifications(mergeNotification);
      }
    };

    fetchRequestNotification();
  }, [
    isFocused,
    currentUser,
    getBanNotification,
    getBookNotification,
    getReminderNotification,
    getRequestNotification,
  ]);

  useEffect(() => {
    if (notifications.length > 0) {
      let tempCount = 0;
      for (let index = 0; index < notifications.length; index++) {
        if (notifications[index].isSeen === false) {
          tempCount++;
        }
      }
      setCount(tempCount);
    }
  }, [notifications]);

  const getRequestNotification = useCallback(async () => {
    if (currentUser) {
      let resultList = [];
      const result = await notificationServices.getRequestNotification(
        currentUser.memberId,
      );
      if (result.length > 0) {
        result.forEach(item => {
          const notificationId = item.notification.notificationId;
          const isSeen = item.notification.seen;
          resultList.push({
            notificationId,
            isSeen,
          });
        });
      }
      return resultList;
    }
  }, [currentUser]);

  const getReminderNotification = useCallback(async () => {
    if (currentUser) {
      let resultList = [];
      const result = await notificationServices.getReminderNotification(
        currentUser.memberId,
      );
      if (result.length > 0) {
        result.forEach(item => {
          const notificationId = item.notification.notificationId;
          const isSeen = item.notification.seen;
          resultList.push({
            notificationId,
            isSeen,
          });
        });
      }
      return resultList;
    }
  }, [currentUser]);

  const getBookNotification = useCallback(async () => {
    if (currentUser) {
      let resultList = [];
      const result = await notificationServices.getBookNotification(
        currentUser.memberId,
      );
      if (result.length > 0) {
        result.forEach(item => {
          const notificationId = item.notification.notificationId;
          const isSeen = item.notification.seen;
          resultList.push({
            notificationId,
            isSeen,
          });
        });
      }
      return resultList;
    }
  }, [currentUser]);

  const getBanNotification = useCallback(async () => {
    if (currentUser) {
      let resultList = [];
      const result = await notificationServices.getBannedNotification(
        currentUser.memberId,
      );
      if (result.length > 0) {
        result.forEach(item => {
          const notificationId = item.notification.notificationId;
          const isSeen = item.notification.seen;
          resultList.push({
            notificationId,
            isSeen,
          });
        });
      }
      return resultList;
    }
  }, [currentUser]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={icons.notification_icon}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: COLORS.white,
        }}
      />
      {count > 0 ? (
        <Badge
          status="error"
          value={count}
          containerStyle={{position: 'absolute', top: 6, right: -6}}
        />
      ) : null}
    </View>
  );
};

export default NotificationButton;
