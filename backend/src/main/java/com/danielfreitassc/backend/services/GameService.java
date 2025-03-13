package com.danielfreitassc.backend.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.danielfreitassc.backend.dtos.GameResponseDto;


@Service
public class GameService {
    private List<String> alphabet = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"));
    
    private String base;
    private String question;

    private int getLetterIndex(String letter) {
        return alphabet.indexOf(letter);
    }

    public GameResponseDto generateQuestion() {
        Random random = new Random();

        base = alphabet.get(random.nextInt(26));

        do {
            question = alphabet.get(random.nextInt(26));
        } while (base.equals(question));

        
        return new GameResponseDto("\"" + base + "\" vem antes ou depois de \"" + question + "\"");
    }

    public GameResponseDto validateAnswer(int userAnswer) {
        int correctAnswer = getLetterIndex(base) < getLetterIndex(question) ? 1 : 2;

        if (userAnswer == correctAnswer) {
            return new GameResponseDto("Resposta correta!");
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resposta incorreta. Tente novamente!");
        }
    }
}

