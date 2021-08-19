package com.example.rebook.notification;

import com.example.rebook.notification.notificationType.NotificationType;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "typeId")
    private NotificationType type;

    private Timestamp time;
    private boolean isSeen;

    public Notification() {
    }

    public Notification(NotificationType type, Timestamp time) {
        this.type = type;
        this.time = time;
        this.isSeen = false;
    }

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public boolean isSeen() {
        return isSeen;
    }

    public void setSeen(boolean seen) {
        isSeen = seen;
    }
}
