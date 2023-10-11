package com.example.serverside;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.serverside.Controllers.SuggestionsController;
import com.example.serverside.Models.Suggestions;

@SpringBootTest
class ServerSideApplicationTests {

	@Autowired
	private SuggestionsController suggestionsController;
	

	@Test
	public void testGetSuggestionBySongName() {
		String songName = "Aqua Regia";

		List<Suggestions> result = suggestionsController.getSuggestionsBySongName(songName);

		assertEquals(songName, result.get(0).getSongName());
	}

	@Test
	public void testGetSuggestion2BySongName() {
		String songName = "So Falls The World";

		List<Suggestions> result = suggestionsController.getSuggestionsBySongName(songName);

		assertEquals(songName, result.get(0).getSongName());
	}

	@Test
	public void testGetSuggestion3BySongName() {
		String songName = "Yuve Yuve Yu";

		List<Suggestions> result = suggestionsController.getSuggestionsBySongName(songName);

		assertEquals(songName, result.get(0).getSongName());
	}

	@Test
	public void testGetSuggestion4BySongName() {
		String songName = "Co-Star";

		List<Suggestions> result = suggestionsController.getSuggestionsBySongName(songName);

		assertEquals(songName, result.get(0).getSongName());
	}

	@Test
	public void testGetSuggestion5BySongName() {
		String songName = "Only You Freestyle";

		List<Suggestions> result = suggestionsController.getSuggestionsBySongName(songName);

		assertEquals(songName, result.get(0).getSongName());
	}

	@Test
	public void testGetSuggestion6BySongName() {
		String songName = "Melanin";

		List<Suggestions> result = suggestionsController.getSuggestionsBySongName(songName);

		assertEquals(songName, result.get(0).getSongName());
	}

}
