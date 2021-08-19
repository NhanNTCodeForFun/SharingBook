package com.example.rebook.dtos.notification;

public class NewRequestNotificationDTO {
    private Long fromMemberId;
    private Long toMemberId;
    private Long fromBookId;
    private Long toBookId;

    public NewRequestNotificationDTO() {
    }

    public NewRequestNotificationDTO(Long fromMemberId, Long toMemberId, Long fromBookId, Long toBookId) {
        this.fromMemberId = fromMemberId;
        this.toMemberId = toMemberId;
        this.fromBookId = fromBookId;
        this.toBookId = toBookId;
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

    public Long getFromBookId() {
        return fromBookId;
    }

    public void setFromBookId(Long fromBookId) {
        this.fromBookId = fromBookId;
    }

    public Long getToBookId() {
        return toBookId;
    }

    public void setToBookId(Long toBookId) {
        this.toBookId = toBookId;
    }

    @Override
    public String toString() {
        return "NewRequestNotificationDTO{" +
                "fromMemberId=" + fromMemberId +
                ", toMemberId=" + toMemberId +
                ", fromBookId=" + fromBookId +
                ", toBookId=" + toBookId +
                '}';
    }
}
