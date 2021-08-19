package com.example.rebook.dtos.member;

public class NewBanMemberNotificationDTO {
    private Long memberId;

    public NewBanMemberNotificationDTO() {
    }

    public NewBanMemberNotificationDTO(Long memberId) {
        this.memberId = memberId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
}
