package com.example.rebook.dtos;

public class UpdateBookRequest {
    private String bookName;
    private String author;
    private Long categoryId;
    private String publisher;
    private Integer price;
    private Integer quality;
    private Boolean status;

    public UpdateBookRequest() {}

    public UpdateBookRequest(
            String bookName, String author, Long categoryId, String publisher,
            Integer price, Integer quality, Boolean status) {
        this.bookName = bookName;
        this.author = author;
        this.categoryId = categoryId;
        this.publisher = publisher;
        this.price = price;
        this.quality = quality;
        this.status = status;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuality() {
        return quality;
    }

    public void setQuality(Integer quality) {
        this.quality = quality;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
