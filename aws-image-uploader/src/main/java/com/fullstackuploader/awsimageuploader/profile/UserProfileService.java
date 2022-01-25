package com.fullstackuploader.awsimageuploader.profile;

import com.fullstackuploader.awsimageuploader.bucket.BucketName;
import com.fullstackuploader.awsimageuploader.filestore.FileStore;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.List;

@Service
public class UserProfileService {

    private final FileStore fileStore;
    private final UserProfileRepository userProfileRepository;

    @Autowired
    public UserProfileService(FileStore fileStore, UserProfileRepository userProfileRepository){
        this.fileStore = fileStore;
        this.userProfileRepository = userProfileRepository;
    }

    public List<UserProfile> getUserProfiles() {
        return userProfileRepository.findAll();
    }

    public Optional<UserProfile> getUserProfile(Long userProfileId) {
        Optional<UserProfile> currentUserProfile = userProfileRepository.findUserProfileByUserProfileId(userProfileId);

        return currentUserProfile;
    }

    public void uploadUserProfileImage(Long userProfileId, MultipartFile file){

        //1. Check if image is not empty
        if(file.isEmpty()){
            throw new IllegalStateException("Cannot upload an empty file[" + file.getSize() + "]");
        }

        //2. Check if file is an image
        if(!Arrays.asList(
                ContentType.IMAGE_JPEG.getMimeType(),
                ContentType.IMAGE_PNG.getMimeType())
                .contains(file.getContentType())){
            throw new IllegalStateException("File must be an image.");
        }

        //3. Check wather the user exists in our datebase
        UserProfile currentUserProfile = userProfileRepository.getById(userProfileId);

        //4. Grab  some matadata from file if
        Map<String, String> metadatada = new HashMap<>();
        metadatada.put("Content-Type", file.getContentType());
        metadatada.put("Content-Length", String.valueOf(file.getSize()));

        //5. store the image in s3 and update database (userProfileImageLink) with s3 image link

        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), currentUserProfile.getUserProfileId());
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());
        try {
            fileStore.save(path, filename, Optional.of(metadatada), file.getInputStream());
            currentUserProfile.setUserProfileImageLink(filename);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public byte[] downloadUserProfileImage(Long userProfileId) {

        UserProfile currentUserProfile = userProfileRepository.getById(userProfileId);

        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                currentUserProfile.getUserProfileId());

        return currentUserProfile.getUserProfileImageLink()
                .map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);
    }

    public void addUserProfile(UserProfile userProfile) {
        Optional<UserProfile> userProfileByEmail = userProfileRepository.
                findUserProfileByEmail(userProfile.getEmail());

        if (userProfileByEmail.isPresent()){
            throw new IllegalStateException("Email taken");
        }

        //Check wether the email is valir or not

        userProfileRepository.save(userProfile);
    }
}
