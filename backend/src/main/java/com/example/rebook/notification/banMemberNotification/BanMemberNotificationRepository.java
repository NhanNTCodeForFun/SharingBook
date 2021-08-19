package com.example.rebook.notification.banMemberNotification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BanMemberNotificationRepository extends JpaRepository<BanMemberNotification, Long> {
    Optional<List<BanMemberNotification>> findByMemberMemberId(final Long memberId);
}
