package com.example.rebook.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT m FROM Member m WHERE m.username=?1 AND m.password=?2")
    Optional<Member> checkLogin(String username, String password);

    @Query("SELECT m FROM Member m WHERE m.email=?1")
    Optional<Member> findMemberByEmail(String email);
}
