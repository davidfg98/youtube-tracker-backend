require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;
const CHANNEL_IDS = ["UCX6OQ3DkcsbYNE6H8uQQuVA", "UC-lHJZR3Gqxm24_Vd_AJ5Yw"]; // PewDiePie y MrBeast

app.use(cors());

app.get("/top-channels", async (req, res) => {
    try {
        let results = [];
        for (const id of CHANNEL_IDS) {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${id}&key=${API_KEY}`
            );
            const data = response.data.items[0];
            results.push({
                name: data.snippet.title,
                subscribers: data.statistics.subscriberCount,
            });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo los datos" });
    }
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
