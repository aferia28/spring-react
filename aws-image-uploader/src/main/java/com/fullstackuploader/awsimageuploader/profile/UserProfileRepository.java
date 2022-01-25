package com.fullstackuploader.awsimageuploader.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query("SELECT s FROM UserProfile s WHERE s.email = ?1")
    Optional<UserProfile> findUserProfileByEmail(String email);

    @Query("SELECT s FROM UserProfile s WHERE s.userProfileId = ?1")
    Optional<UserProfile> findUserProfileByUserProfileId(Long userProfileId);
}
