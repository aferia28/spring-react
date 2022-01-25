package com.fullstackuploader.awsimageuploader.bucket;

public enum BucketName {

    PROFILE_IMAGE("fullstackuploader-123");

    private final String bucketName;

    BucketName(String bucketName){
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
