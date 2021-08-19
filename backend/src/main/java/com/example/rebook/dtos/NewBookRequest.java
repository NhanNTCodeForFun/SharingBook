package com.example.rebook.dtos;

public class NewBookRequest {
    String bookName;
    String author;
    String description;
    String frontSideImage;
    String backSideImage;
    String totalImage;
    String publisher;
    int bookPrice;
    int bookQuality;
    Long memberId;
    Long categoryId;

    public NewBookRequest() {}

    public NewBookRequest(
            String bookName,
            String author,
            String description,
            String frontSideImage,
            String backSideImage,
            String totalImage,
            String publisher,
            int bookPrice,
            int bookQuality,
            Long memberId,
            Long categoryId) {
        this.bookName = bookName;
        this.author = author;
        this.description = description;
        this.frontSideImage = frontSideImage;
        this.backSideImage = backSideImage;
        this.totalImage = totalImage;
        this.publisher = publisher;
        this.bookPrice = bookPrice;
        this.bookQuality = bookQuality;
        this.memberId = memberId;
        this.categoryId = categoryId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFrontSideImage() {
        return frontSideImage;
    }

    public void setFrontSideImage(String frontSideImage) {
        this.frontSideImage = frontSideImage;
    }

    public String getBackSideImage() {
        return backSideImage;
    }

    public void setBackSideImage(String backSideImage) {
        this.backSideImage = backSideImage;
    }

    public String getTotalImage() {
        return totalImage;
    }

    public void setTotalImage(String totalImage) {
        this.totalImage = totalImage;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(int bookPrice) {
        this.bookPrice = bookPrice;
    }

    public int getBookQuality() {
        return bookQuality;
    }

    public void setBookQuality(int bookQuality) {
        this.bookQuality = bookQuality;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
