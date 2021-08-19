package com.example.rebook.notification.requestNotification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/requestNotifications")
public class RequestNotificationController {
    private final RequestNotificationRepository requestNotificationRepository;

    public RequestNotificationController(RequestNotificationRepository requestNotificationRepository) {
        this.requestNotificationRepository = requestNotificationRepository;
    }

    @GetMapping
    public Optional<List<RequestNotification>> getAllRequestNotificationsToUser(@RequestParam Long userId) {
        return requestNotificationRepository.findByToMember_MemberId(userId);
    }
}
