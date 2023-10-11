import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import lyricsFinder from 'lyrics-finder';


const PORT = 5174;


const app = express();
app.use(cors());
app.use(express.json());


app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refresh_token;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })

    //changed accessToken and expiresIn to access_token, etc
    spotifyApi
        .refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in

            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

app.get("/lyrics", async (req, res) => {
    const lyrics =
        (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
});


app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
