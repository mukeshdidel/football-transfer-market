
import express from 'express';
import { getAllLeagues ,insertleague , getAllClubs,getClubsByLeague ,insertclub, getClubDetails,getClubFinances,getAllPlayers, getPlayersByClub,getPlayerContracts} from './database.js';
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

app.post('/insertclub/:id', async function (req, res) {
    const league_id = req.params.id;
    const {club_name, founded_year} = await req.body
    await insertclub(club_name, league_id, founded_year);
    res.send('League added successfully')
})


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

//----------------------finances-------------------------------------------

app.get('/finances/:id',async function (req, res){
    try {
        const club_id = req.params.id;
        const finances = await getClubFinances(club_id);
        if (!finances) {
            return res.status(404).json({ message: "No finances found" });
        }
        res.json(finances);
    } 
    catch (error) {
        console.error("Error fetching club finances:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//------------players--------------------------------

app.get('/players/:id',async function (req, res){
    try {
        const club_id = req.params.id;
        const players = await getPlayersByClub(club_id);
        if (!players) {
            return res.status(404).json({ message: "No players found" });
        }
        res.json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.get('/players',async function (req, res){
    try {
        const players = await getAllPlayers();
        if (!players) {
            return res.status(404).json({ message: "No players found" });
        }
        res.json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})
// ------------contracts---------------

app.get('/contracts/:id',async function (req, res) {
    try{
        const player_id = req.params.id;
        const contracts = await getPlayerContracts(player_id);
        if (!contracts) {
            return res.status(404).json({ message: "No contracts found" });
        }
        res.json(contracts);
    }
    catch (error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('something went wrong')
})

app.listen(5000, function () {
    console.log('Server is running on port 5000');  // Server started on port 5000
})