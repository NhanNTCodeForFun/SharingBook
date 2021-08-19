package com.example.rebook.dtos.member;

public class UpdateMemberDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private Integer cityId;
    private Integer districtId;
    private Integer wardId;
    private String addressDetail;

    public UpdateMemberDTO() {
    }

    public UpdateMemberDTO(String name, String email, String phoneNumber, String address, Integer cityId, Integer districtId, Integer wardId, String addressDetail) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.cityId = cityId;
        this.districtId = districtId;
        this.wardId = wardId;
        this.addressDetail = addressDetail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
