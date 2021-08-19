package com.example.rebook.feedback;

import com.example.rebook.member.Member;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name="from_member_id", referencedColumnName = "memberId")
    private Member fromMember;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name="to_member_id", referencedColumnName = "memberId")
    private Member toMember;

    private Timestamp timestamp;
    private Integer star;
    private String comment;

    public Feedback() {}

    public Feedback(Member fromMember, Member toMember, Timestamp timestamp, Integer star, String comment) {
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.timestamp = timestamp;
        this.star = star;
        this.comment = comment;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
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

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
