package com.example.rebook.notification.banMemberNotification;

import com.example.rebook.member.Member;
import com.example.rebook.notification.Notification;

import javax.persistence.*;

@Entity
@Table
public class BanMemberNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long banMemberNotificationId;

    @ManyToOne
    @JoinColumn(name = "notification_id", referencedColumnName = "notificationId")
    private Notification notification;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "memberId")
    private Member member;

    public BanMemberNotification() {
    }

    public BanMemberNotification(Notification notification, Member member) {
        this.notification = notification;
        this.member = member;
    }

    public Long getBanMemberNotificationId() {
        return banMemberNotificationId;
    }

    public void setBanMemberNotificationId(Long banMemberNotificationId) {
        this.banMemberNotificationId = banMemberNotificationId;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
