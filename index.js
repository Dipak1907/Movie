import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { name: "Enter the Movie name 👇"});
});

// Get your own api-key at this url="https://rapidapi.com/rapidapi/api/movie-database-alternative/"

app.post("/submit", async (req, res) => {
    const moviename = req.body.moviename
    try {
        const response = await axios.get('https://movie-database-alternative.p.rapidapi.com/', {
            params: {
                t: moviename,
                r: 'json',
                plot: "short"
              },
              headers: {
                'X-RapidAPI-Key': //Add your api-key here,
                'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
              }});
        const result = response.data;
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});