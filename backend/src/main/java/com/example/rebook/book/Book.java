package com.example.rebook.book;

import com.example.rebook.category.Category;
import com.example.rebook.member.Member;

import javax.persistence.*;

@Entity
@Table
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long bookId;
    private String name;
    private String author;
    @Column(length = 10485760)
    private String description;
    private String frontSideImage;
    private String backSideImage;
    private String totalImage;
    private String publisher;
    private String language;
    private Integer pageNum;
    private Integer price;
    private Integer quality;
    private boolean isChecked;
    private boolean isDisplay;
    private Boolean transferStatus;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name="member_id", referencedColumnName = "memberId")
    private Member member;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "categoryId")
    private Category category;

    public Book() {
    }

    public Book(String name, String author, String description, String publisher, String language, Integer pageNum, Integer price, Integer quality, Member member, Category category) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.publisher = publisher;
        this.language = language;
        this.pageNum = pageNum;
        this.price = price;
        this.quality = quality;
        this.transferStatus = false;
        this.member = member;
        this.category = category;
    }

    public Book(String name, String author, String description, String frontSideImage, String backSideImage, String totalImage, String publisher, String language, Integer pageNum, Integer price, Integer quality, Boolean transferStatus, Member member, Category category) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.frontSideImage = frontSideImage;
        this.backSideImage = backSideImage;
        this.totalImage = totalImage;
        this.publisher = publisher;
        this.language = language;
        this.pageNum = pageNum;
        this.price = price;
        this.quality = quality;
        this.transferStatus = transferStatus;
        this.isChecked = false;
        this.isDisplay = false;
        this.member = member;
        this.category = category;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
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

    public Boolean getTransferStatus() {
        return transferStatus;
    }

    public void setTransferStatus(Boolean transferStatus) {
        this.transferStatus = transferStatus;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public void setChecked(boolean checked) {
        isChecked = checked;
    }

    public boolean isDisplay() {
        return isDisplay;
    }

    public void setDisplay(boolean display) {
        isDisplay = display;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
