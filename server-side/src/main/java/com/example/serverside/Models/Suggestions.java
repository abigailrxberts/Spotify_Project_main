package com.example.serverside.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Suggestions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String songName;
    private String songArtist;
    private String songDescription;


    public Suggestions() {
    }

    public Suggestions(long id, String name, String songName, String songArtist, String songDescription) {
        this.id = id;
        this.name = name;
        this.songName = songName;
        this.songArtist = songArtist;
        this.songDescription = songDescription;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSongName() {
        return this.songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getSongArtist() {
        return this.songArtist;
    }

    public void setSongArtist(String songArtist) {
        this.songArtist = songArtist;
    }

    public String getSongDescription() {
        return this.songDescription;
    }

    public void setSongDescription(String songDescription) {
        this.songDescription = songDescription;
    }


}
