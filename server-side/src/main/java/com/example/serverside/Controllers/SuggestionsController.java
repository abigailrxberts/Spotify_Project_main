package com.example.serverside.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.serverside.Models.Suggestions;
import com.example.serverside.Repositories.SuggestionsRepo;

@RestController
@RequestMapping("/suggestions")
@CrossOrigin (origins = "http://localhost:5173")
public class SuggestionsController {
    
    @Autowired
    private SuggestionsRepo suggestionsRepo;

    @PostMapping("/new")
    public Suggestions addSuggestions(@RequestBody Suggestions suggestions) {
        return suggestionsRepo.save(suggestions);
    }

    @GetMapping("{id}")
    public Suggestions getSuggestionsById(@PathVariable Long id) {
        return suggestionsRepo.findById(id).orElse(null);
    }

    @GetMapping("/name/{name}")
    public List<Suggestions> getSuggestionsByName(@PathVariable String name) {
        return suggestionsRepo.findByName(name);
    }

    @GetMapping("/songName/{songName}")
    public List<Suggestions> getSuggestionsBySongName(@PathVariable String songName) {
        return suggestionsRepo.findBySongName(songName);
    }

    @GetMapping("/songArtist/{songArtist}")
    public List<Suggestions> getSuggestionsByArtist(@PathVariable String songArtist) {
        return suggestionsRepo.findBySongArtist(songArtist);
    }

    @GetMapping("/songDescription/{songDescription}")
    public List<Suggestions> getSuggestionsBySongDescription(@PathVariable String songDescription) {
        return suggestionsRepo.findBySongDescription(songDescription);
    }


}