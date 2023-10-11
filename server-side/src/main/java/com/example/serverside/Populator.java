package com.example.serverside;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.serverside.Models.Suggestions;
import com.example.serverside.Repositories.SuggestionsRepo;

@Component
public class Populator implements CommandLineRunner{

    @Autowired
    private SuggestionsRepo suggestionsRepo;
    
    @Override
    public void run(String... args) throws Exception {

        Suggestions suggestion1 = new Suggestions(1, "Abigail Roberts", "Aqua Regia", "Sleep Token", "Aqua Regia by Sleep Token is a powerful and emotive song that delves into the corrosive nature of love and desire, blending intricate musical arrangements with haunting vocals to create a captivating experience.");
        suggestionsRepo.save(suggestion1);

        Suggestions suggestions2 = new Suggestions(2, "Abigail Roberts", "So Falls The World", "Ulver", "So Falls the World by Ulver explores themes of impending catastrophe and existential reflection, offering a thought-provoking perspective on the state of the world.");
        suggestionsRepo.save(suggestions2);

        Suggestions suggestions3 = new Suggestions(3, "Abigail Roberts", "Yuve Yuve Yu", "The Hu", "Yuve Yuve Yu by The Hu is an electrifying fusion of traditional Mongolian throat singing and rock elements that celebrates Mongolian culture and tells a captivating story of warrior spirits.");
        suggestionsRepo.save(suggestions3);

        Suggestions suggestions4 = new Suggestions(4, "Jadyn Asamoah", "Co-Star", "Amaarae", "Co-Star by Amaarae is a sultry and genre-blending track that explores themes of desire and self-empowerment through its captivating blend of Afrobeat, R&B, and electronic influences.");
        suggestionsRepo.save(suggestions4);

        Suggestions suggestions5 = new Suggestions(5, "Jadyn Asamoah", "Only You Freestyle", "Drake & Headie One", "Only You Freestyle by Drake and Headie One is a lyrically charged track that boasts confident verses and success while touching on themes of wealth and power.");
        suggestionsRepo.save(suggestions5); 

        Suggestions suggestions6 = new Suggestions(6, "Jadyn Asamoah", "Melanin", "Wolfacejoeyy" , "Melanin by WolfAceJoeyy is an empowering and uplifting song that celebrates the beauty and strength of people with melanated skin, promoting self-confidence and self-love.");
        suggestionsRepo.save(suggestions6);

        Suggestions suggestions7 = new Suggestions(7, "Devan Spears", "Sabbath", "Meltycanon" , "Sabbath by Meltycanon is a serinating experience with minimal vocals smooth-as-butter transitions, and experimental instrumentation that is guaranteed to send you to your happy place ");
        suggestionsRepo.save(suggestions7);
        Suggestions suggestions8 = new Suggestions(8, "Devan Spears", "This House Is a Circus", "Artic Monkeys" , "This House Is a Circus by Arctic Monkeys is a high-energy mess that embodies the chaos of a disfunctional friend group, getting progressively more overwhelming, spiraling into nothing short of insanity ");
        suggestionsRepo.save(suggestions8);
        Suggestions suggestions9 = new Suggestions(9, "Devan Spears", "90210", "Travis Scott" , "90210 by Travis Scott is an awe-inspiring track that offers a spaced-out-nirvanna vibe meant to be enjoyed with (legal) accompaniment. It then switches up to a in-your-face victory lap that ends the song triumphantly ");
        suggestionsRepo.save(suggestions9);
        Suggestions suggestions10 = new Suggestions(10L, "Abdullah Abuharb", "Day Light", "David Kushner", "An uplifting and catchy pop song that radiates positivity and joy. With its vibrant melodies and heartfelt lyrics, it captures the essence of a bright and hopeful moment in life ");
        this.suggestionsRepo.save(suggestions10);
        Suggestions suggestions11 = new Suggestions(11L, "Abdullah Abuharb", "Perfect", "Ed Sheeran ", "A timeless love song that resonates with audiences across generations ");
        this.suggestionsRepo.save(suggestions11);
        Suggestions suggestions12 = new Suggestions(12L, "Abdullah Abuharb", "A Thousand Years", "Christina Perri ", "A hauntingly beautiful and emotionally charged ballad that captures the essence of enduring love. Sung by Christina Perri, the song's delicate piano melodies and heartfelt lyrics evoke a sense of timelessness and devotion ");
        this.suggestionsRepo.save(suggestions12);
        Suggestions suggestions13 = new Suggestions(13L, "Noor Abutaha", "Perfect", "Ed Sheeran ", " is a timeless love song that resonates with audiences across generations ");
        this.suggestionsRepo.save(suggestions13);
        Suggestions suggestions14 = new Suggestions(14L, "Noor Abutaha", "A Thousand Years", "Christina Perri ", "is a hauntingly beautiful and emotionally charged ballad that captures the essence of enduring love. Sung by Christina Perri, the song's delicate piano melodies and heartfelt lyrics evoke a sense of timelessness and devotion ");
        this.suggestionsRepo.save(suggestions14);
        Suggestions suggestions15 = new Suggestions(15L, "Noor Abutaha", "Thinking Out Loud ", "Ed Sheeran", "is a heartfelt and soulful love song that showcases Ed Sheeran's musical talent and emotional depth. With its melodic acoustic guitar and lyrics that speak of lasting love and commitment, the song resonates with listeners on a deep, personal level ");
        this.suggestionsRepo.save(suggestions15);
        Suggestions suggestions16 = new Suggestions(16L, "Tequan Browning", "Every Time", "Mac Ayres", "Every Time by Mac Ayres is a Indie R&B/Soul track that explores the of inner conflict of a relationship that is on the verge of ending. The song is a perfect blend of smooth vocals and a groovy bassline that will have you vibing from start to finish.");
        this.suggestionsRepo.save(suggestions16);
        Suggestions suggestions17 = new Suggestions(17L, "Tequan Browning", "In Style", "Masego", "In Style by Masego is a uptempo Jazz infuse/R&B track that boastfully describes the new found confidence of the artist.");
        this.suggestionsRepo.save(suggestions17);
        Suggestions suggestions18 = new Suggestions(18L, "Tequan Browning", "The Secret Recipe", "Lil Yachty & J. Cole", "The Secret Recipe by Lil Yachty is a Hip-Hop/Rap track that displays the lyrically growth of Lil Boat, while also showcasing the lyrically prowess of a modern day legend, J. Cole.");
        this.suggestionsRepo.save(suggestions18);
    }
}
