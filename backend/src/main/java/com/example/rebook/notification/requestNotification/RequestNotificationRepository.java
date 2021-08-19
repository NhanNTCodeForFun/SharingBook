package com.example.rebook.notification.requestNotification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestNotificationRepository extends JpaRepository<RequestNotification, Long> {
    Optional<List<RequestNotification>> findByToMember_MemberId(final Long userId);
}
