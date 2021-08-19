package com.example.rebook.notification.bookNotification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/bookNotifications")
public class BookNotificationController {
    private final BookNotificationRepository bookNotificationRepository;

    public BookNotificationController(BookNotificationRepository bookNotificationRepository) {
        this.bookNotificationRepository = bookNotificationRepository;
    }

    @GetMapping
    public Optional<List<BookNotification>> getAllBookNotificationsToUser(@RequestParam Long memberId) {
        return bookNotificationRepository.findByBookMemberMemberId(memberId);
    }
}
