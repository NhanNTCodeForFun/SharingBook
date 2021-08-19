package com.example.rebook.dtos;

public class ActiveReminderDTO {
    private Long firstMemberId;
    private Long secondMemberId;
    private String location;
    private String time;

    public ActiveReminderDTO() {}

    public ActiveReminderDTO(Long firstMemberId, Long secondMemberId, String location, String time) {
        this.firstMemberId = firstMemberId;
        this.secondMemberId = secondMemberId;
        this.location = location;
        this.time = time;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "ActiveReminderDTO{" +
                "firstMemberId=" + firstMemberId +
                ", secondMemberId=" + secondMemberId +
                ", location='" + location + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
