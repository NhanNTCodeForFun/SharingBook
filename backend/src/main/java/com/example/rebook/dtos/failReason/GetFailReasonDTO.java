package com.example.rebook.dtos.failReason;

public class GetFailReasonDTO {
    private long failReasonId;
    private long fromMemberId;
    private long toMemberId;
    private String content;

    public GetFailReasonDTO() {
    }

    public GetFailReasonDTO(long failReasonId, long fromMemberId, long toMemberId, String content) {
        this.failReasonId = failReasonId;
        this.fromMemberId = fromMemberId;
        this.toMemberId = toMemberId;
        this.content = content;
    }

    public long getFailReasonId() {
        return failReasonId;
    }

    public void setFailReasonId(long failReasonId) {
        this.failReasonId = failReasonId;
    }

    public long getFromMemberId() {
        return fromMemberId;
    }

    public void setFromMemberId(long fromMemberId) {
        this.fromMemberId = fromMemberId;
    }

    public long getToMemberId() {
        return toMemberId;
    }

    public void setToMemberId(long toMemberId) {
        this.toMemberId = toMemberId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
