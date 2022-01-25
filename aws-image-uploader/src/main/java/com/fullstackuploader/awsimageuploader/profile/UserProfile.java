package com.fullstackuploader.awsimageuploader.profile;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table
public class UserProfile {

    @Id
    @SequenceGenerator(
            name = "userprofile_sequence",
            sequenceName = "userprofile_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userprofile_sequence"
    )
    private Long userProfileId;
    private String userName;
    private String lastName;
    private String nickname;
    private String email;
    private String userProfileImageLink; //this will be the s3 key

    public UserProfile(Long userProfileId,
                       String userName,
                       String lastName,
                       String nickname,
                       String email,
                       String userProfileImageLink) {
        this.userProfileId = userProfileId;
        this.userName = userName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.email = email;
        this.userProfileImageLink = userProfileImageLink;
    }

    public UserProfile() {
    }

    public UserProfile(String userName, String lastName, String nickname, String email) {
        this.userName = userName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.email = email;
    }

    public Long getUserProfileId() {
        return userProfileId;
    }

    public String getUserName() {
        return userName;
    }

    public Optional<String> getUserProfileImageLink() {
        return Optional.ofNullable(userProfileImageLink);
    }

    public void setUserProfileImageLink(String userProfileImageLink) {
        this.userProfileImageLink = userProfileImageLink;
    }

    public String getLastName() {
        return lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfile that = (UserProfile) o;
        return Objects.equals(userProfileId, that.userProfileId) &&
                Objects.equals(userName, that.userName) &&
                Objects.equals(userProfileImageLink, that.userProfileImageLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userProfileId, userName, userProfileImageLink);
    }
}
