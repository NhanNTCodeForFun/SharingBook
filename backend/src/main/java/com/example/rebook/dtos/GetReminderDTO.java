package com.example.rebook.dtos;

import com.example.rebook.reminder.Reminder;

import java.util.List;

public class GetReminderDTO {
    private Reminder reminder;
    private List<Long> transferenceIdList;

    public GetReminderDTO() {}

    public GetReminderDTO(Reminder reminder, List<Long> transferenceIdList) {
        this.reminder = reminder;
        this.transferenceIdList = transferenceIdList;
    }

    public Reminder getReminder() {
        return reminder;
    }

    public void setReminder(Reminder reminder) {
        this.reminder = reminder;
    }

    public List<Long> getTransferenceIdList() {
        return transferenceIdList;
    }

    public void setTransferenceIdList(List<Long> transferenceIdList) {
        this.transferenceIdList = transferenceIdList;
    }
}
