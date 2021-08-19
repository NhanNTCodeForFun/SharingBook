package com.example.rebook.notification.bookNotification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookNotificationRepository extends JpaRepository<BookNotification, Long> {
    Optional<List<BookNotification>> findByBookMemberMemberId(final Long memberId);
}
