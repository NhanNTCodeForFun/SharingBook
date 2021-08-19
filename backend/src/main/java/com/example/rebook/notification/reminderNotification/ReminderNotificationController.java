package com.example.rebook.notification.reminderNotification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/reminderNotification")
public class ReminderNotificationController {
    private final ReminderNotificationRepository reminderNotificationRepository;

    public ReminderNotificationController(ReminderNotificationRepository reminderNotificationRepository) {
        this.reminderNotificationRepository = reminderNotificationRepository;
    }

    @GetMapping
    public Optional<List<ReminderNotification>> getAllReminderNotificationsToUser(@RequestParam Long userId) {
        return reminderNotificationRepository.findByToMember_MemberId(userId);
    }
}
