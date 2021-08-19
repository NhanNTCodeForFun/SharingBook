package com.example.rebook.transference;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferenceRepository extends JpaRepository<Transference, Long> {
    List<Transference> findByFromBookMemberMemberIdAndToBookMemberMemberId(final Long fromMemberId, final Long toMemberId);
    List<Transference> findByFromBookMemberMemberId(final Long userId);
    List<Transference> findByToBookMemberMemberId(final Long userId);
    List<Transference> findByToBookBookId(final Long bookId);
}
