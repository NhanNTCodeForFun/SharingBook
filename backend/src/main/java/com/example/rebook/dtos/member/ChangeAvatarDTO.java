package com.example.rebook.dtos.member;

public class ChangeAvatarDTO {
    private String newAvatar;

    public ChangeAvatarDTO() {
    }

    public ChangeAvatarDTO(String newAvatar) {
        this.newAvatar = newAvatar;
    }

    public String getNewAvatar() {
        return newAvatar;
    }

    public void setNewAvatar(String newAvatar) {
        this.newAvatar = newAvatar;
    }
}
