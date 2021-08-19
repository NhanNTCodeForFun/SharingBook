package com.example.rebook.dtos;

public class NewTransference {
    private Long fromBookId;
    private Long toBookId;

    public NewTransference() {}

    public NewTransference(Long fromBookId, Long toBookId) {
        this.fromBookId = fromBookId;
        this.toBookId = toBookId;
    }

    public Long getFromBookId() {
        return fromBookId;
    }

    public void setFromBookId(Long fromBookId) {
        this.fromBookId = fromBookId;
    }

    public Long getToBookId() {
        return toBookId;
    }

    public void setToBookId(Long toBookId) {
        this.toBookId = toBookId;
    }
}
