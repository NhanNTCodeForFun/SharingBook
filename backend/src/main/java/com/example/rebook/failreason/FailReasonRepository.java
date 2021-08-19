package com.example.rebook.failreason;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FailReasonRepository extends JpaRepository<FailReason, Long> {

}
