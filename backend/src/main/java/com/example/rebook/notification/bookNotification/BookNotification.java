package com.example.rebook.notification.bookNotification;

import com.example.rebook.book.Book;
import com.example.rebook.notification.Notification;

import javax.persistence.*;

@Entity
@Table
public class BookNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookNotificationId;

    @ManyToOne
    @JoinColumn(name = "notification_id", referencedColumnName = "notificationId")
    private Notification notification;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "bookId")
    private Book book;

    private boolean status;

    public BookNotification() {
    }

    public BookNotification(Notification notification, Book book, boolean status) {
        this.notification = notification;
        this.book = book;
        this.status = status;
    }

    public Long getBookNotificationId() {
        return bookNotificationId;
    }

    public void setBookNotificationId(Long bookNotificationId) {
        this.bookNotificationId = bookNotificationId;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
