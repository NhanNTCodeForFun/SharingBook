package com.example.rebook.dtos;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

public class UploadImage implements Serializable {
    private String name;
    private String fileName;
    private MultipartFile data;

    public UploadImage() {}

    public UploadImage(String name, String fileName, MultipartFile data) {
        this.name = name;
        this.fileName = fileName;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public MultipartFile getData() {
        return data;
    }

    public void setData(MultipartFile data) {
        this.data = data;
    }
}
