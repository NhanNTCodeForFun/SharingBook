package com.example.rebook.notification.requestNotification;

import com.example.rebook.book.Book;
import com.example.rebook.member.Member;
import com.example.rebook.notification.Notification;

import javax.persistence.*;

@Entity
@Table
public class RequestNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reqNotificationId;

    @ManyToOne
    @JoinColumn(name = "notification_id", referencedColumnName = "notificationId")
    private Notification notification;

    @ManyToOne
    @JoinColumn(name = "from_member_id", referencedColumnName = "memberId")
    private Member fromMember;

    @ManyToOne
    @JoinColumn(name = "to_member_id", referencedColumnName = "memberId")
    private Member toMember;

    @ManyToOne
    @JoinColumn(name = "from_book_id", referencedColumnName = "bookId")
    private Book fromBook;

    @ManyToOne
    @JoinColumn(name = "to_book_id", referencedColumnName = "bookId")
    private Book toBook;

    private Boolean status;

    public RequestNotification() {
    }

    public RequestNotification(Notification notification, Member fromMember, Book toBook) {
        this.notification = notification;
        this.fromMember = fromMember;
        this.toBook = toBook;
    }

    public RequestNotification(Notification notification, Member fromMember, Member toMember, Book fromBook, Book toBook) {
        this.notification = notification;
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.fromBook = fromBook;
        this.toBook = toBook;
        this.status = null;
    }

    public RequestNotification(Notification notification, Member fromMember, Member toMember, Book fromBook, Book toBook, boolean status) {
        this.notification = notification;
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.fromBook = fromBook;
        this.toBook = toBook;
        this.status = status;
    }

    public Long getReqNotificationId() {
        return reqNotificationId;
    }

    public void setReqNotificationId(Long reqNotificationId) {
        this.reqNotificationId = reqNotificationId;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
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

    public Book getFromBook() {
        return fromBook;
    }

    public void setFromBook(Book fromBook) {
        this.fromBook = fromBook;
    }

    public Book getToBook() {
        return toBook;
    }

    public void setToBook(Book toBook) {
        this.toBook = toBook;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
