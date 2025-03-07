
import express from 'express';
import { getAllLeagues ,insertleague , getAllClubs,getClubsByLeague , getClubDetails} from './database.js';
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



//-------------clubs-------------------------------

app.get('/clubs', async function (req, res) {
    const clubs = await getAllClubs()
    res.json(clubs)
}); 

app.get('/clubs/:id', async function (req, res) {
    try {
        const league_id = req.params.id;

        const clubs = await getClubsByLeague(league_id);            

        if (!clubs) {
            return res.status(404).json({ message: "No clubs found" });
        }
        res.json(clubs);
    } catch (error) {
        console.error("Error fetching clubs:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get('/clubdetails/:id',async function (req, res){
    try {
        const club_id = req.params.id;
        const club = await getClubDetails(club_id);
        if (!club) {
            return res.status(404).json({ message: "No club found" });
        }
        res.json(club);
        
    } catch (error) {
        console.error("Error fetching club details:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('something went wrong')
})

app.listen(5000, function () {
    console.log('Server is running on port 5000');  // Server started on port 5000
})