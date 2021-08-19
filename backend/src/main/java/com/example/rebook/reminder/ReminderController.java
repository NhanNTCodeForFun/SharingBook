package com.example.rebook.reminder;

import com.example.rebook.dtos.ActiveReminderDTO;
import com.example.rebook.dtos.GetReminderDTO;
import com.example.rebook.dtos.UpdateReminderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/reminder")
public class ReminderController {
    private final ReminderService reminderService;

    @Autowired
    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }

    @GetMapping(path = "/all")
    public List<Reminder> getAllReminders() {
        return reminderService.getAll();
    }

    @GetMapping
    public GetReminderDTO getReminder(@RequestParam Long firstMemberId, @RequestParam Long secondMemberId) {
        Optional<Reminder> reminderOptional = reminderService.getReminderFromAtoB(firstMemberId, secondMemberId);
        if (reminderOptional.isPresent()) {
            Reminder reminder = reminderOptional.get();
            List<Long> transferenceIdList = new ArrayList<>();
            for (int i = 0; i < reminder.getTransferenceList().size(); i++) {
                transferenceIdList.add(reminder.getTransferenceList().get(i).getTransferenceId());
            }
            return new GetReminderDTO(reminder, transferenceIdList);
        }
        return null;
    }

    @GetMapping(path = "/member")
    public List<GetReminderDTO> getReminderOfMember(@RequestParam Long memberId) {
        List<GetReminderDTO> getReminderDTOList = new ArrayList<>();
        List<Reminder> reminderList = reminderService.getReminderOfMember((memberId));
        for (Reminder reminder : reminderList) {
            List<Long> transferenceIdList = new ArrayList<>();
            for (int i = 0; i < reminder.getTransferenceList().size(); i++) {
                transferenceIdList.add(reminder.getTransferenceList().get(i).getTransferenceId());
            }
            getReminderDTOList.add(new GetReminderDTO(reminder, transferenceIdList));
        }
        return getReminderDTOList;
    }

    @PostMapping
    public void addNewReminder(@RequestBody ActiveReminderDTO dto) {
        reminderService.activeReminder(dto);
    }

    @PutMapping
    public void updateReminder(@RequestBody UpdateReminderDTO dto) {
        reminderService.updateReminder(dto);
    }

    @PutMapping(path = "/done/{reminderId}")
    public void markReminderIsDone(@PathVariable Long reminderId) {
        reminderService.markReminderIsDone(reminderId);
    }

    @DeleteMapping
    public void deleteReminder(@RequestParam Long reminderId, @RequestParam Long memberId) {
        reminderService.deactivateReminder(reminderId, memberId);
    }
}
