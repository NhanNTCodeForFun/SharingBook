package com.example.rebook.dtos.failReason;

public class NewFailReasonDTO {
    private Long reminderId;
    private Long fromMemberId;
    private Long toMemberId;
    private String reason;

    public NewFailReasonDTO() {}

    public NewFailReasonDTO(Long reminderId, Long fromMemberId, Long toMemberId, String reason) {
        this.reminderId = reminderId;
        this.fromMemberId = fromMemberId;
        this.toMemberId = toMemberId;
        this.reason = reason;
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

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
