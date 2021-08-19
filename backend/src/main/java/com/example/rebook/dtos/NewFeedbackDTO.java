package com.example.rebook.dtos;

public class NewFeedbackDTO {
    private Long fromUserId;
    private Long toUserId;
    private Integer star;
    private String comment;

    public NewFeedbackDTO() {}

    public NewFeedbackDTO(Long fromUserId, Long toUserId, Integer star, String comment) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.star = star;
        this.comment = comment;
    }

    public Long getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(Long fromUserId) {
        this.fromUserId = fromUserId;
    }

    public Long getToUserId() {
        return toUserId;
    }

    public void setToUserId(Long toUserId) {
        this.toUserId = toUserId;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
