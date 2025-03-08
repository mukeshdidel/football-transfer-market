
import mysql from 'mysql2';

const pool = mysql.createPool({ // pool is a collection of connection  in DB
    host: 'localhost',
    user: 'root',
    password: 'Mukesh@7976',
    database: 'football_market'
}).promise(); // promise to use promise api version of mysql instead of callback version


async function getAllLeagues(){
    const [leagues] = await pool.query(`
        SELECT * FROM leagues
    `);
    return leagues;
}
//const leagues = await getAllLeagues();
//console.log(leagues);
 async function insertleague(league_name , country){
    await pool.query(`INSERT INTO leagues (league_name, country) VALUES (?,?);`,[league_name, country])
}



//--------clubs------------------

async function insertclub(club_name,league_id, founded_year){
    await pool.query(`INSERT INTO clubs (club_name, league_id, founded_year) VALUES (?,?,?);`,[club_name,league_id, founded_year])
}

async function getAllClubs(){
    const [clubs] = await pool.query(`
        select club_id, club_name , league_name from clubs natural join leagues;
    `);
    return clubs;
}

async function getClubsByLeague(league_id)
{
    const [clubs] = await pool.query(`
        select club_id, club_name , league_name from clubs natural join leagues where league_id = ?;
        `, [league_id]);
    return clubs;
}

async function getClubDetails(club_id){
    const [clubs] = await pool.query(`
        select * from clubs where club_id = ?;
        `, [club_id]);
    return clubs;
}
//-----------finances-----------------------------------------

async function getClubFinances(club_id){
    const [finances] = await pool.query(`select club_name, finance_year, revenue, sales, expenses , net_spent from clubs natural join finances where club_id = ?`, [club_id]);
    return finances;
}


//----------players------------------------------------------------------


async function getPlayersByClub(club_id){
    const  [players] = await pool.query(`select player_id, player_name, date_of_birth, nationality, position from players natural join clubs where club_id = ?`,[club_id]);
    return players;
}
async function getAllPlayers(){
    const [players] = await pool.query(`
        select player_id, player_name, club_name, nationality, position from players natural join clubs ;
    `);
    return players;
}
// -------player cotracts-------

async function getPlayerContracts(player_id){
    const [contract] = await pool.query(`select * from contracts where player_id = ?`, [player_id]);
    return contract;
}



export {getAllLeagues ,insertleague ,insertclub,getAllClubs, getClubsByLeague,getClubDetails ,getClubFinances,getAllPlayers, getPlayersByClub,getPlayerContracts }