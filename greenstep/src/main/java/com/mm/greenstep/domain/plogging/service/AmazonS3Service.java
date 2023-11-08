package com.mm.greenstep.domain.plogging.service;


import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AmazonS3Service {
    @Value("${aws.s3.bucketName}")
    private String bucketName;
    @Value("${aws.region}")
    private String region;

    private final S3Client s3Client;

    public String uploadFile(MultipartFile file) {
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        try (InputStream inputStream = file.getInputStream()) {
            // 파일 확장자와 컨텐츠 타입을 결정하는 코드는 여기에 그대로 작성합니다.
            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            String contentType;

            if ("jpg".equalsIgnoreCase(fileExtension) || "jpeg".equalsIgnoreCase(fileExtension)) {
                contentType = "image/jpeg"; // .jpg 이미지일 경우
            } else if ("png".equalsIgnoreCase(fileExtension)) {
                contentType = "image/png"; // .png 이미지일 경우
            } else if ("mp3".equalsIgnoreCase(fileExtension)) {
                contentType = "audio/mpeg"; // .mp3 음원 파일일 경우
            } else if ("wav".equalsIgnoreCase(fileExtension)) {
                contentType = "audio/wav"; // .wav 음원 파일일 경우
            } else if ("mp4".equalsIgnoreCase(fileExtension)) {
                contentType = "video/mp4"; // .mp4 동영상 파일일 경우
            } else if ("avi".equalsIgnoreCase(fileExtension)) {
                contentType = "video/x-msvideo"; // .avi 동영상 파일일 경우
            } else {
                throw new IllegalArgumentException("Unsupported image format");
            }
            // S3에 파일 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(contentType)
                    .build(), RequestBody.fromInputStream(inputStream, file.getSize()));

            // S3 URL 생성
            String S3url = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
            return S3url;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload file to S3");
        }
        // try-with-resources 구문을 사용하면 InputStream은 자동으로 닫힙니다.
    }

//    public String uploadFile(MultipartFile file) {
//        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
//        try {
//            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
//            String contentType;
//
//            if ("jpg".equalsIgnoreCase(fileExtension) || "jpeg".equalsIgnoreCase(fileExtension)) {
//                contentType = "image/jpeg"; // .jpg 이미지일 경우
//            } else if ("png".equalsIgnoreCase(fileExtension)) {
//                contentType = "image/png"; // .png 이미지일 경우
//            } else if ("mp3".equalsIgnoreCase(fileExtension)) {
//                contentType = "audio/mpeg"; // .mp3 음원 파일일 경우
//            } else if ("wav".equalsIgnoreCase(fileExtension)) {
//                contentType = "audio/wav"; // .wav 음원 파일일 경우
//            } else if ("mp4".equalsIgnoreCase(fileExtension)) {
//                contentType = "video/mp4"; // .mp4 동영상 파일일 경우
//            } else if ("avi".equalsIgnoreCase(fileExtension)) {
//                contentType = "video/x-msvideo"; // .avi 동영상 파일일 경우
//            } else {
//                throw new IllegalArgumentException("Unsupported image format");
//            }
//
//            s3Client.putObject(PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(fileName)
//                    .contentType(contentType)
//                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
//            String S3url = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
//            return S3url;
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new RuntimeException("Failed to upload file to S3");
//        }
//    }
}
