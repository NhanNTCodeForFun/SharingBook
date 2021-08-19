package com.example.rebook.notification.reminderNotification;

import com.example.rebook.member.Member;
import com.example.rebook.notification.Notification;
import com.example.rebook.reminder.Reminder;

import javax.persistence.*;

@Entity
@Table
public class ReminderNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderNotificationId;

    @ManyToOne
    @JoinColumn(name = "notification_id", referencedColumnName = "notificationId")
    private Notification notification;

    @ManyToOne
    @JoinColumn(name = "reminder_id", referencedColumnName = "reminderId")
    private Reminder reminder;

    @ManyToOne
    @JoinColumn(name = "from_member_id", referencedColumnName = "memberId")
    private Member fromMember;

    @ManyToOne
    @JoinColumn(name = "to_member_id", referencedColumnName = "memberId")
    private Member toMember;

    public ReminderNotification() {
    }

    public ReminderNotification(Notification notification, Reminder reminder, Member fromMember, Member toMember) {
        this.notification = notification;
        this.reminder = reminder;
        this.fromMember = fromMember;
        this.toMember = toMember;
    }

    public Long getReminderNotificationId() {
        return reminderNotificationId;
    }

    public void setReminderNotificationId(Long reminderNotificationId) {
        this.reminderNotificationId = reminderNotificationId;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Reminder getReminder() {
        return reminder;
    }

    public void setReminder(Reminder reminder) {
        this.reminder = reminder;
    }

    public Member getFromMember() {
        return fromMember;
    }

    public void setFromMember(Member fromMember) {
        this.fromMember = fromMember;
    }

    public Member getToMember() {
        return toMember;
    }

    public void setToMember(Member toMember) {
        this.toMember = toMember;
    }
}
