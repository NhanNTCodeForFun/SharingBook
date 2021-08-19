package com.example.rebook.notification;

import com.example.rebook.dtos.member.NewBanMemberNotificationDTO;
import com.example.rebook.dtos.notification.NewBookNotificationDTO;
import com.example.rebook.dtos.notification.ReminderNotificationDTO;
import com.example.rebook.dtos.notification.NewRequestNotificationDTO;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationService notificationService, NotificationRepository notificationRepository) {
        this.notificationService = notificationService;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public Optional<Notification> getNotificationById(@RequestParam Long notificationId) {
        return notificationRepository.findById(notificationId);
    }

    @PostMapping(path = "/request")
    public void newRequestNotification(@RequestBody NewRequestNotificationDTO dto) {
        notificationService.newRequestNotification(dto);
    }

    @PutMapping(path = "/requestStatus")
    public void updateRequestStatusNotification(@RequestParam Long transferenceId, @RequestParam boolean status) {
        notificationService.newRequestStatusNotification(transferenceId, status);
    }

    @DeleteMapping(path = "/request")
    public void cancelRequestNotification(@RequestParam Long fromMemberId, @RequestParam Long toBookId) {
        notificationService.cancelRequestNotification(fromMemberId, toBookId);
    }

    @PostMapping(path = "/reminder")
    public void newReminderNotification(@RequestBody ReminderNotificationDTO dto) {
        notificationService.newReminderNotification(dto);
    }

    @DeleteMapping(path = "/reminder")
    public void cancelReminderNotification(@RequestBody ReminderNotificationDTO dto) {
        notificationService.cancelReminderNotification(dto);
    }

    @PostMapping(path = "/book")
    public void newBookNotification(@RequestBody NewBookNotificationDTO dto) {
        notificationService.newBookNotification(dto);
    }

    @PostMapping(path = "/ban")
    public void newBanMemberNotification(@RequestBody NewBanMemberNotificationDTO dto) {
        notificationService.newBanMemberNotification(dto.getMemberId());
    }

    @PutMapping(path = "/seen")
    public void markNotificationSeen(@RequestParam Long notificationId) {
        notificationService.markNotificationSeen(notificationId);
    }
}
