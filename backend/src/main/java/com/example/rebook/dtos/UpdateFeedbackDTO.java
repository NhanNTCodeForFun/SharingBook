package com.example.rebook.dtos;

public class UpdateFeedbackDTO {
    private Integer star;
    private String comment;

    public UpdateFeedbackDTO() {}

    public UpdateFeedbackDTO(Integer star, String comment) {
        this.star = star;
        this.comment = comment;
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
