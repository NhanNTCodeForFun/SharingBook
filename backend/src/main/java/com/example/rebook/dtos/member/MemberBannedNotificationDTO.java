package com.example.rebook.dtos.member;

import com.example.rebook.notification.Notification;

public class MemberBannedNotificationDTO {
    private Notification notification;

    public MemberBannedNotificationDTO() {
    }

    public MemberBannedNotificationDTO(Notification notification) {
        this.notification = notification;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }
}
