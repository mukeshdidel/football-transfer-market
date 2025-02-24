
import express from 'express';
import { getAllLeagues ,insertleague } from './database.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


app.get('/leagues', async function (req, res) {
    const leagues = await getAllLeagues()
    res.json(leagues)
})


app.post('/insertleague', async function (req, res) {
    const {league_name, country} = await req.body
    await insertleague(league_name, country);
    res.send('League added successfully')
})



app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('something went wrong')
})

app.listen(5000, function () {
    console.log('Server is running on port 5000');  // Server started on port 5000
})