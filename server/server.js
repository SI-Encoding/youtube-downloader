const express = require('express');
const cors = require('cors');
const app = express();
const ytdl = require('ytdl-core');


app.use(cors());
app.use(express.json());
app.listen(5000, ()=> console.log('Listening on port 5000'));

app.get('/download', async (req,res) => {
    
    const vidId = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
    res.send(JSON.stringify({
        url: "https://www.youtube.com/embed/" + vidId,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
    }))
})