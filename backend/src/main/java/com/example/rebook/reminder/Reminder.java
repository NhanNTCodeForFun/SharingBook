package com.example.rebook.reminder;

import com.example.rebook.member.Member;
import com.example.rebook.transference.Transference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId;

    @ManyToOne
    @JoinColumn(name = "member_1st_id", referencedColumnName = "memberId")
    private Member firstMember;

    @ManyToOne
    @JoinColumn(name = "member_2nd_id", referencedColumnName = "memberId")
    private Member secondMember;

    @JsonIgnore
    @OneToMany(mappedBy = "reminder")
    private List<Transference> transferenceList;

    private String location;
    private Timestamp timestamp;
    private boolean isActive;
    private String status;

    public Reminder() {
    }

    public Reminder(Member firstMember, Member secondMember) {
        this.firstMember = firstMember;
        this.secondMember = secondMember;
        this.isActive = false;
    }

    public Long getReminderId() {
        return reminderId;
    }

    public void setReminderId(Long reminderId) {
        this.reminderId = reminderId;
    }

    public Member getFirstMember() {
        return firstMember;
    }

    public void setFirstMember(Member firstMember) {
        this.firstMember = firstMember;
    }

    public Member getSecondMember() {
        return secondMember;
    }

    public void setSecondMember(Member secondMember) {
        this.secondMember = secondMember;
    }

    public List<Transference> getTransferenceList() {
        return transferenceList;
    }

    public void setTransferenceList(List<Transference> transferenceList) {
        this.transferenceList = transferenceList;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Reminder{" +
                "reminderId=" + reminderId +
                ", firstMember=" + firstMember +
                ", secondMember=" + secondMember +
                ", transferenceList=" + transferenceList +
                ", location='" + location + '\'' +
                ", timestamp=" + timestamp +
                ", isActive=" + isActive +
                ", status='" + status + '\'' +
                '}';
    }
}
