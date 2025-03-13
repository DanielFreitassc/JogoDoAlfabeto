package com.danielfreitassc.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.danielfreitassc.backend.dtos.GameResponseDto;
import com.danielfreitassc.backend.services.GameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameController {
    private final GameService gameService;

    @GetMapping("/question")
    public GameResponseDto getQuestion() {
        return gameService.generateQuestion();
    }

    @PostMapping("/answer")
    public GameResponseDto submitAnswer(@RequestParam int userAnswer) {
        return gameService.validateAnswer(userAnswer);
    }
}
