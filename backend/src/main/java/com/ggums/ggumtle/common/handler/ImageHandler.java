package com.ggums.ggumtle.common.handler;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.stream.Stream;


@Component
public class ImageHandler {

    @Value("${spring.web.baseUrl}")
    private String baseUrl;

    public String uploadImage(MultipartFile imageFile, String directory, String fileNamePrefix) {
        try {
            String basicPath = new File(System.getProperty("user.dir")).getParent();
            String uploadFilePath = basicPath + File.separator + "image" + File.separator + directory;
            String fileExtension = extractExtension(imageFile.getOriginalFilename());
            Path imageDirectoryPath = Paths.get(uploadFilePath);

            deleteFilesWithPattern(uploadFilePath, fileNamePrefix);

            Files.createDirectories(imageDirectoryPath);

            String fileName = fileNamePrefix + "." + fileExtension;
            Path targetLocation = imageDirectoryPath.resolve(fileName);

            if (!imageFile.isEmpty()) {
                Files.copy(imageFile.getInputStream(), targetLocation);
                return baseUrl + "/image/" + directory + "/" + fileName;
            }

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
}