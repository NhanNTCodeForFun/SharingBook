package com.example.rebook.dtos;

public class UpdateReminderDTO {
    private Long reminderId;
    private String location;
    private String time;

    public UpdateReminderDTO() {}

    public UpdateReminderDTO(Long reminderId, String location, String time) {
        this.reminderId = reminderId;
        this.location = location;
        this.time = time;
    }

    public Long getReminderId() {
        return reminderId;
    }

    public void setReminderId(Long reminderId) {
        this.reminderId = reminderId;
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
}
