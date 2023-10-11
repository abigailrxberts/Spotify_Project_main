package com.example.serverside.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.serverside.Models.Suggestions;

public interface SuggestionsRepo extends JpaRepository<Suggestions, Long>{
    List<Suggestions> findByName(String name);
    List<Suggestions> findBySongName(String name);
    List<Suggestions> findBySongArtist(String songArtist);
    List<Suggestions> findBySongDescription(String songDescription);
}
