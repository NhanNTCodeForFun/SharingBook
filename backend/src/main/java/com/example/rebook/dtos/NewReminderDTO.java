package com.example.rebook.dtos;

public class NewReminderDTO {
    private Long firstMemberId;
    private Long secondMemberId;

    public NewReminderDTO() {}

    public NewReminderDTO(Long firstMemberId, Long secondMemberId) {
        this.firstMemberId = firstMemberId;
        this.secondMemberId = secondMemberId;
    }

    public Long getFirstMemberId() {
        return firstMemberId;
    }

    public void setFirstMemberId(Long firstMemberId) {
        this.firstMemberId = firstMemberId;
    }

    public Long getSecondMemberId() {
        return secondMemberId;
    }

    public void setSecondMemberId(Long secondMemberId) {
        this.secondMemberId = secondMemberId;
    }
}
