package com.example.rebook.notification.reminderNotification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReminderNotificationRepository extends JpaRepository<ReminderNotification, Long> {
    Optional<List<ReminderNotification>> findByToMember_MemberId(final Long userId);
}
