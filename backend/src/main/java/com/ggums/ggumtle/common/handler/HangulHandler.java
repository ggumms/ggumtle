package com.ggums.ggumtle.common.handler;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HangulHandler {

    private static final int HANGUL_UNICODE_START = 44032;

    private static final int HANGUL_UNICODE_END = 55203;

    private static final int INITIAL_CONSONANT_UNICODE_START = 12593;

    private static final int INITIAL_CONSONANT_UNICODE_END = 12622;

    private static final char[] INITIAL_CONSONANT_UNICODES = {
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    public static List<String> separateInitialConsonants(String word) {
        List<String> initials = new ArrayList<>();
        for (char c : word.toCharArray()) {
            if (isHangul(c)) {
                int consonantIndex = (c - HANGUL_UNICODE_START) / 28 / 21;
                char initialConsonant = INITIAL_CONSONANT_UNICODES[consonantIndex];
                initials.add(String.valueOf(initialConsonant));
            } else {
                initials.add(String.valueOf(c));
            }
        }
        for(String initial : initials){
            System.out.println(initial);
        }
        return initials;
    }

    public static String getFirstInitialConsonant(String word) {
        if (word == null || word.isEmpty()) {
            return "";
        }

        char firstChar = word.charAt(0);
        if (isHangul(firstChar)) {
            int consonantIndex = (firstChar - HANGUL_UNICODE_START) / 28 / 21;
            if (consonantIndex >= 0 && consonantIndex < INITIAL_CONSONANT_UNICODES.length) {
                return String.valueOf(INITIAL_CONSONANT_UNICODES[consonantIndex]);
            }
        }

        return String.valueOf(firstChar);
    }

    private static boolean isHangul(char c) {
        return c >= HANGUL_UNICODE_START && c <= HANGUL_UNICODE_END;
    }
}
