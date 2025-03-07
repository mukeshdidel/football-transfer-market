
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

async function getAllClubs(){
    const [clubs] = await pool.query(`
        select club_name , league_name from clubs natural join leagues;
    `);
    return clubs;
}

async function getClubsByLeague(league_id)
{
    const [clubs] = await pool.query(`
        select club_name , league_name from clubs natural join leagues where league_id = ?;
        `, [league_id]);
    return clubs;
}


export {getAllLeagues ,insertleague ,getAllClubs, getClubsByLeague}