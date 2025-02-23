


async function getAllLeagues(){
    const leagueslist = document.getElementById('leagueslist');
    const response = await fetch('http://localhost:5000/leagues')
    const leagues = await response.json();
    leagueslist.textContent = '';  // Clear the list before adding new leagues
    console.log(leagues);
    leagueslist.innerHTML = "";
    leagues.forEach(league => {

        leagueslist.innerHTML += `<li><a href="">${league.league_name}</a></li>`;
    });
}
getAllLeagues();