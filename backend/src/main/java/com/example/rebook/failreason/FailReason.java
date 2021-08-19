package com.example.rebook.failreason;

import com.example.rebook.member.Member;
import com.example.rebook.reminder.Reminder;
import com.example.rebook.transference.Transference;

import javax.persistence.*;

@Entity
@Table
public class FailReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long failReasonId;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "reminder_id", referencedColumnName = "reminderId")
    private Reminder reminder;

    @ManyToOne
    @JoinColumn(name = "from_member_id", referencedColumnName = "memberId")
    private Member fromMember;

    @ManyToOne
    @JoinColumn(name = "to_member_id", referencedColumnName = "memberId")
    private Member toMember;

    private String reason;

    public FailReason() {
    }

    public FailReason(Reminder reminder, Member fromMember, Member toMember, String reason) {
        this.reminder = reminder;
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.reason = reason;
    }

    public Long getFailReasonId() {
        return failReasonId;
    }

    public void setFailReasonId(Long failReasonId) {
        this.failReasonId = failReasonId;
    }

    public Reminder getReminder() {
        return reminder;
    }

    public void setReminder(Reminder reminder) {
        this.reminder = reminder;
    }

    public Member getFromMember() {
        return fromMember;
    }

    public void setFromMember(Member fromMember) {
        this.fromMember = fromMember;
    }

    public Member getToMember() {
        return toMember;
    }

    public void setToMember(Member toMember) {
        this.toMember = toMember;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
