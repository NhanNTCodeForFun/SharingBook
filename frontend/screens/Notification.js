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
import HeaderNavigation from '../components/HeaderNavigation';
import Spinner from '../components/Utils/Spinner';
import {COLORS, FONTS, icons} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import * as notificationServices from '../services/notification-services';

const Notification = ({navigation}) => {
  const {currentUser} = useContext(UserApiContext);
  const [notifications, setNotifications] = React.useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestNotification = async () => {
      if (currentUser) {
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
        setLoading(false);
      }
    };

    fetchRequestNotification();
  }, [
    currentUser,
    getBanNotification,
    getBookNotification,
    getReminderNotification,
    getRequestNotification,
  ]);

  useEffect(() => {
    const asyncCheckNotificationStatus = async () => {
      for (let index = 0; index < notifications.length; index++) {
        await markNotificationAsSeen(notifications[index].notificationId);
      }
    };

    if (notifications.length > 0) {
      asyncCheckNotificationStatus();
    }
  }, [notifications]);

  const markNotificationAsSeen = async notificationId => {
    const result = await notificationServices.markNotificationAsSeen(
      notificationId,
    );
    return result;
  };

  function renderTime(time) {
    const timeGap = Date.now() - time;
    const minute = Math.floor(timeGap / 1000 / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);
    const week = Math.floor(day / 7);
    let timelineChoosen;

    if (week > 0) {
      timelineChoosen = 'w';
    } else if (day > 0) {
      timelineChoosen = 'd';
    } else if (hour > 0) {
      timelineChoosen = 'h';
    } else if (minute > 0) {
      timelineChoosen = 'm';
    } else {
      timelineChoosen = 's';
    }

    let text;
    switch (timelineChoosen) {
      case 'w': {
        text = `${week} tuần trước`;
        break;
      }
      case 'd': {
        text = `${day} ngày trước`;
        break;
      }
      case 'h': {
        text = `${hour} giờ trước`;
        break;
      }
      case 'm': {
        text = `${minute} phút trước`;
        break;
      }
      default:
        text = 'Vừa mới đây';
    }
    return <Text style={{color: COLORS.lightGray}}>{text}</Text>;
  }

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
            ...FONTS.h1,
            color: COLORS.lightBrown,
          }}>
          Không có thông báo
        </Text>
      </View>
    );
  }

  const getRequestNotification = useCallback(async () => {
    if (currentUser) {
      let resultList = [];
      const result = await notificationServices.getRequestNotification(
        currentUser.memberId,
      );
      if (result.length > 0) {
        result.forEach(item => {
          const notificationId = item.notification.notificationId;
          const time = item.notification.time;
          const fromBookName = item.fromBook.name;
          const toBookName = item.toBook.name;
          const fromMemberName = item.fromMember.name;
          const notificationType = item.notification.type.typeId;
          let content;
          if (notificationType === 1) {
            content = `${fromMemberName} yêu cầu trao đổi cuốn sách '${fromBookName}' với cuốn '${toBookName}' của bạn`;
          } else if (notificationType === 2) {
            const requestStatus = item.status;
            if (requestStatus) {
              content = `${fromMemberName} đã chấp nhận yêu cầu trao đổi cuốn sách '${toBookName}' với cuốn '${fromBookName}' của bạn`;
            } else {
              content = `${fromMemberName} không chấp nhận yêu cầu trao đổi cuốn sách '${toBookName}' với cuốn '${fromBookName}' của bạn`;
            }
          }
          resultList.push({
            notificationId,
            type: 'request',
            time,
            content,
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
          const time = item.notification.time;
          const fromMemberName = item.fromMember.name;
          const type = item.notification.type.typeId;
          const createReminderContent = `${fromMemberName} đã tạo một lịch hẹn với bạn`;
          const cancelReminderContent = `${fromMemberName} đã hủy lịch hẹn với bạn`;
          resultList.push({
            notificationId,
            type: 'reminder',
            time,
            content: type === 3 ? createReminderContent : cancelReminderContent,
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
          const time = item.notification.time;
          const bookName = item.book.name;
          const status = item.status;
          const acceptedBookContent = `Cuốn sách ${bookName} đã được admin kiểm tra thành công`;
          const refusedBookContent = `Cuốn sách ${bookName} đã được admin kiểm tra thất bại`;
          resultList.push({
            notificationId,
            type: 'book',
            time,
            content: status ? acceptedBookContent : refusedBookContent,
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
          const time = item.notification.time;
          const content =
            'Bạn được cảnh báo do có nhiều feedback không tốt về bạn. Chúng tôi sẽ xem xét trường hợp này.';
          resultList.push({
            notificationId,
            type: 'ban',
            time,
            content,
          });
        });
      }
      return resultList;
    }
  }, [currentUser]);

  function renderNotificationList() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            marginVertical: 3,
            backgroundColor: COLORS.white,
            borderBottomWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.brown,
          }}>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() => console.log('Notification')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 15,
                marginRight: 30,
              }}>
              {/* User Avatar */}
              <View>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                    backgroundColor: COLORS.lightGray2,
                  }}>
                  <Image
                    source={
                      item.type === 'book'
                        ? icons.book_noti_icon
                        : item.type === 'request'
                        ? icons.request_noti_icon
                        : item.type === 'reminder'
                        ? icons.reminder_noti_icon
                        : icons.warning_icon
                    }
                    resizeMode="cover"
                    style={{width: 30, height: 30, borderRadius: 25}}
                  />
                </View>
              </View>
              {/* Notification Content */}
              <View>
                <Text
                  style={{
                    paddingLeft: 15,
                    paddingRight: 25,
                    color: COLORS.black,
                  }}>
                  {item.content}
                </Text>
                <Text
                  style={{
                    paddingLeft: 15,
                  }}>
                  {renderTime(item.time)}
                </Text>
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
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => `${item.notificationId}`}
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
      {/* Header Section */}
      <HeaderNavigation
        headerName="Thông Báo"
        goBack={() => navigation.goBack()}
      />
      {/* Body Section */}
      <View style={{flex: 1}}>{renderNotificationList()}</View>
    </SafeAreaView>
  );
};

export default Notification;
