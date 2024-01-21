package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.PostBucketReactionRequestDto;
import com.ggums.ggumtle.dto.request.PostBucketRequestDto;
import com.ggums.ggumtle.dto.request.UpdateBucketRequestDto;
import com.ggums.ggumtle.dto.response.BucketSearchResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketReactionResponseDto;
import com.ggums.ggumtle.dto.response.GetBucketResponseDto;
import com.ggums.ggumtle.dto.response.model.BucketSearchListDto;
import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.BucketReaction;
import com.ggums.ggumtle.entity.Interest;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.BucketReactionRepository;
import com.ggums.ggumtle.repository.BucketRepository;
import com.ggums.ggumtle.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class BucketService {

    @Value("${spring.web.baseUrl}")
    private String baseUrl;

    private final BucketRepository bucketRepository;
    private final InterestRepository interestRepository;
    private final BucketReactionRepository bucketReactionRepository;

    public Long postBucket(User user, PostBucketRequestDto requestDto){
        Set<Interest> interests = new HashSet<>();

        if (requestDto.getCategory() != null) {
            for (String interestName : requestDto.getCategory()) {
                Interest interest = interestRepository.findByName(interestName)
                        .orElseGet(() -> interestRepository.save(new Interest(null, interestName, new HashSet<>())));
                interests.add(interest);
            }
        }

        Bucket bucket = Bucket.builder()
                .user(user)
                .title(requestDto.getTitle())
                .timeCapsule(requestDto.getTimeCapsule())
                .latitude(requestDto.getLatitude())
                .longitude(requestDto.getLongitude())
                .color(requestDto.getColor())
                .address(requestDto.getAddress())
                .interests(interests)
                .isPrivate(requestDto.getIsPrivate())
                .build();

        Bucket savedBucket = bucketRepository.save(bucket);
        return savedBucket.getId();
    }

    @Transactional(readOnly = true)
    public GetBucketResponseDto getBucket(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if(bucket.getIsPrivate() && !bucket.getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        String timeCapsule = null;
        if (bucket.getAchievementDate() != null) {
            timeCapsule = bucket.getTimeCapsule();
        }

        return GetBucketResponseDto.builder()
                .writerId(bucket.getUser().getId())
                .reviewId(null)
                .title(bucket.getTitle())
                .timeCapsule(timeCapsule)
                .bucketPicture(bucket.getBucketPicture())
                .color(bucket.getColor())
                .latitude(bucket.getLatitude())
                .longitude(bucket.getLongitude())
                .address(bucket.getAddress())
                .dayCount(ChronoUnit.DAYS.between(bucket.getCreatedDate(), LocalDateTime.now()))
                .writeDate(bucket.getCreatedDate())
                .achievementDate(bucket.getAchievementDate())
                .category(bucket.getInterests().stream()
                        .map(Interest::getName)
                        .collect(Collectors.toCollection(ArrayList::new)))
                .isPrivate(bucket.getIsPrivate())
                .build();
    }

    public Long updateBucket(User user, UpdateBucketRequestDto requestDto){
        Bucket bucket = bucketRepository.findById(requestDto.getBucketId())
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (requestDto.getTitle() != null) bucket.setTitle(requestDto.getTitle());
        if (requestDto.getTimeCapsule() != null) bucket.setTimeCapsule(requestDto.getTimeCapsule());
        if (requestDto.getLatitude() != null) bucket.setLatitude(requestDto.getLatitude());
        if (requestDto.getLongitude() != null) bucket.setLongitude(requestDto.getLongitude());
        if (requestDto.getColor() != null) bucket.setColor(requestDto.getColor());
        if (requestDto.getAddress() != null) bucket.setAddress(requestDto.getAddress());

        if (requestDto.getCategory() != null) {
            Set<Interest> updatedInterests = requestDto.getCategory().stream()
                    .map(interestName -> interestRepository.findByName(interestName)
                            .orElseGet(() -> interestRepository.save(new Interest(null, interestName, new HashSet<>())))
                    )
                    .collect(Collectors.toSet());
            bucket.setInterests(updatedInterests);
        }

        bucketRepository.save(bucket);

        return bucket.getId();
    }

    public String deleteBucket(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        bucketRepository.delete(bucket);

        return "삭제를 완료하였습니다.";
    }

    public String achieveBucket(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (bucket.getAchievementDate() != null) {
            throw new CustomException(ExceptionType.BUCKET_ALREADY_ACHIEVED);
        }

        bucket.setAchievementDate(LocalDate.now());
        bucketRepository.save(bucket);

        return "버킷 달성일이 등록되었습니다.";
    }

    @Transactional(readOnly = true)
    public BucketSearchResponseDto searchBuckets(String word, Pageable pageable) {
        Page<Bucket> buckets = bucketRepository.findByTitleContainingAndIsPrivateIsFalse(word, pageable);
        Page<BucketSearchListDto> searchList = buckets.map(this::convertToBucketSearchListDto);
        return BucketSearchResponseDto.builder().searchList(searchList).build();
    }

    private BucketSearchListDto convertToBucketSearchListDto(Bucket bucket) {
        LocalDateTime dateTime = bucket.getCreatedDate();
        boolean isAchieved = false;
        if(bucket.getAchievementDate() != null){
            dateTime = bucket.getAchievementDate().atStartOfDay();
            isAchieved = true;
        }

        return BucketSearchListDto.builder()
                .bucketId(bucket.getId())
                .title(bucket.getTitle())
                .dayCount(ChronoUnit.DAYS.between(dateTime, LocalDateTime.now()))
                .category(bucket.getInterests().stream().map(Interest::getName).collect(Collectors.toList()))
                .reactionCount(bucket.getBucketReactions().size())
                .commentCount(0) // doesn't have comment feature
                .color(bucket.getColor())
                .isAchieved(isAchieved)
                .build();
    }

    public String bucketImage(User user, Long bucketId, MultipartFile bucketImage) {
        // check bucket and user
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));
        if (!user.getId().equals(bucket.getUser().getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        try {
            String basicPath = new File(System.getProperty("user.dir")).getParent();
            String uploadFilePath = basicPath + File.separator + "image" + File.separator + "bucketImage";
            String fileName = "bucket_image_" + bucket.getId();
            String fileExtension = extractExtension(bucketImage.getOriginalFilename());
            Path imageDirectoryPath = Paths.get(uploadFilePath);

            // Deleting existing files that match the pattern
            deleteFilesWithPattern(uploadFilePath, fileName);

            // Creating directories if they don't exist
            Files.createDirectories(imageDirectoryPath);

            Path targetLocation = imageDirectoryPath.resolve(fileName + "." + fileExtension);
            bucket.setBucketPicture(null);

            // upload file
            if (!bucketImage.isEmpty()) {
                Files.copy(bucketImage.getInputStream(), targetLocation);
                bucket.setBucketPicture(baseUrl + "/image/bucketImage/" + fileName + "." + fileExtension);
                bucketRepository.save(bucket);
                return baseUrl + "/image/bucketImage/" + fileName + "." + fileExtension;
            }

            bucketRepository.save(bucket);
            return null;
        } catch (IOException e) {
            if (e instanceof DirectoryNotEmptyException) {
                throw new CustomException(ExceptionType.DIRECTORY_CREATION_FAILED);
            } else if (e instanceof FileAlreadyExistsException) {
                throw new CustomException(ExceptionType.FILE_DELETION_FAILED);
            } else {
                throw new CustomException(ExceptionType.FILE_COPY_FAILED);
            }
        }
    }

    private String extractExtension(String originalFileName) {
        if (originalFileName == null || originalFileName.lastIndexOf('.') == -1) {
            return ""; // No extension found
        }
        return originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
    }

    private void deleteFilesWithPattern(String directoryPath, String pattern) {
        try {
            Path dirPath = Paths.get(directoryPath);
            if (Files.exists(dirPath) && Files.isDirectory(dirPath)) {
                try (Stream<Path> paths = Files.list(dirPath)) {
                    paths.filter(Files::isRegularFile)
                            .filter(path -> path.getFileName().toString().contains(pattern))
                            .forEach(path -> {
                                try {
                                    if (Files.exists(path)) { // if files exist, delete
                                        Files.delete(path);
                                    }
                                } catch (IOException e) {
                                    throw new CustomException(ExceptionType.FILE_DELETION_FAILED);
                                }
                            });
                }
            }
        } catch (IOException e) {
            throw new CustomException(ExceptionType.DIRECTORY_CREATION_FAILED);
        }
    }

    @Transactional(readOnly = true)
    public GetBucketReactionResponseDto getBucketReaction(User user, Long bucketId){
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        if(bucket.getIsPrivate() && !bucket.getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        String userReaction = null;
        Map<String, Integer> reactionCounts = new HashMap<>();
        List<BucketReaction> list = bucket.getBucketReactions();
        if(!list.isEmpty()){
            for (BucketReaction reaction : list) {
                if(reaction.getUser().getId().equals(user.getId())){
                    userReaction = reaction.getReaction();
                }
                String reactionType = reaction.getReaction();
                reactionCounts.put(reactionType, reactionCounts.getOrDefault(reactionType, 0) + 1);
            }
        }

        return GetBucketReactionResponseDto.builder()
                .userReaction(userReaction)
                .reactionCounts(reactionCounts)
                .build();
    }

    public String postBucketReaction(User user, PostBucketReactionRequestDto requestDto) {
        Bucket bucket = bucketRepository.findById(requestDto.getBucketId())
                .orElseThrow(() -> new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        Optional<BucketReaction> existingReaction = bucketReactionRepository
                .findByBucketAndUser(bucket, user);

        // if reaction is same, pass
        if (existingReaction.isPresent()) {
            if (existingReaction.get().getReaction().equals(requestDto.getUserReaction())) {
                return requestDto.getUserReaction();
            } else {
                bucketReactionRepository.delete(existingReaction.get());
            }
        }

        if(!requestDto.getUserReaction().isEmpty()){
            BucketReaction newReaction = BucketReaction.builder()
                    .bucket(bucket)
                    .user(user)
                    .reaction(requestDto.getUserReaction())
                    .build();
            bucketReactionRepository.save(newReaction);
        }

        return requestDto.getUserReaction();
    }
}
