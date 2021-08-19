package com.example.rebook.dtos.member;

public class GetMemberInformationDTO {
    private Long memberId;
    private String username;
    private String name;
    private String avatar;
    private String address;
    private Integer cityId;
    private Integer districtId;
    private Integer wardId;
    private String addressDetail;
    private String email;
    private String phoneNumber;
    private Integer averageStar;
    private boolean isActive;
    private boolean isAdmin;

    public GetMemberInformationDTO() {
    }

    public GetMemberInformationDTO(Long memberId, String username, String name, String avatar, String address, Integer cityId, Integer districtId, Integer wardId, String addressDetail, String email, String phoneNumber, Integer averageStar, boolean isActive, boolean isAdmin) {
        this.memberId = memberId;
        this.username = username;
        this.name = name;
        this.avatar = avatar;
        this.address = address;
        this.cityId = cityId;
        this.districtId = districtId;
        this.wardId = wardId;
        this.addressDetail = addressDetail;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.averageStar = averageStar;
        this.isActive = isActive;
        this.isAdmin = isAdmin;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    public Integer getWardId() {
        return wardId;
    }

    public void setWardId(Integer wardId) {
        this.wardId = wardId;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getAverageStar() {
        return averageStar;
    }

    public void setAverageStar(Integer averageStar) {
        this.averageStar = averageStar;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
