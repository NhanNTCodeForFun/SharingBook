package com.example.rebook.dtos.member;

public class LoginResponseDTO {
    private Long memberId;
    private String name;
    private String address;
    private Integer cityId;
    private Integer districtId;
    private Integer wardId;
    private String addressDetail;
    private String email;
    private String phoneNumber;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(Long memberId, String name, String address, Integer cityId, Integer districtId, Integer wardId, String addressDetail, String email, String phoneNumber) {
        this.memberId = memberId;
        this.name = name;
        this.address = address;
        this.cityId = cityId;
        this.districtId = districtId;
        this.wardId = wardId;
        this.addressDetail = addressDetail;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
