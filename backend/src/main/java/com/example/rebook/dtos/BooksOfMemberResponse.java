package com.example.rebook.dtos;

public class BooksOfMemberResponse {
    String username;
    String bookName;

    public BooksOfMemberResponse() {}

    public BooksOfMemberResponse(String username, String bookName) {
        this.username = username;
        this.bookName = bookName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }
}
