
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







export {getAllLeagues ,insertleague }