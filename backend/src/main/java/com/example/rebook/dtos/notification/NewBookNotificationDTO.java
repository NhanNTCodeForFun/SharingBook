package com.example.rebook.dtos.notification;

public class NewBookNotificationDTO {
    private Long bookId;
    private boolean status;

    public NewBookNotificationDTO() {
    }

    public NewBookNotificationDTO(Long bookId, boolean status) {
        this.bookId = bookId;
        this.status = status;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
