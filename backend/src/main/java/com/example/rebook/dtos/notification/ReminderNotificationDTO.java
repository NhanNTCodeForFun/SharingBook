package com.example.rebook.dtos.notification;

public class ReminderNotificationDTO {
    private Long reminderId;
    private Long fromMemberId;
    private Long toMemberId;

    public ReminderNotificationDTO() {
    }

    public ReminderNotificationDTO(Long reminderId, Long fromMemberId, Long toMemberId) {
        this.reminderId = reminderId;
        this.fromMemberId = fromMemberId;
        this.toMemberId = toMemberId;
    }

    public Long getReminderId() {
        return reminderId;
    }

    public void setReminderId(Long reminderId) {
        this.reminderId = reminderId;
    }

    public Long getFromMemberId() {
        return fromMemberId;
    }

    public void setFromMemberId(Long fromMemberId) {
        this.fromMemberId = fromMemberId;
    }

    public Long getToMemberId() {
        return toMemberId;
    }

    public void setToMemberId(Long toMemberId) {
        this.toMemberId = toMemberId;
    }
}
