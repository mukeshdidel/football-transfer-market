
document.addEventListener("DOMContentLoaded", () => {
    // Ensure we only fetch clubs if we're on clubs.html
    // --------club--------
    if(document.getElementById("form2")){
        const urlParams = new URLSearchParams(window.location.search);
        const leagueID = urlParams.get('league_id');
        if(leagueID){
        document.getElementById("form2").addEventListener('submit', event=>submitClubForm(event,leagueID));
        }
    }

    if (document.getElementById("clubList")) {
        const urlParams = new URLSearchParams(window.location.search);
        const league_id = urlParams.get('league_id');
        if(league_id)
        {
            const ClubForm = document.getElementById("form2");
            ClubForm.style.display = 'flex';
            getClubsByLeague(league_id);
        }
        else{
            getClubsByLeague(null);
        }
    }

    // --------leagues--------
    if(document.getElementById("form1")){
        document.getElementById("form1").addEventListener('submit', event=>submitLeagueForm(event));
    }
    // Ensure we only fetch leagues if we're on leagues.html
    if (document.getElementById("leagueList")) {
        getAllLeagues();
    }
    
    //------club details------


    if(document.getElementById('DclubName')){
        const urlParams = new URLSearchParams(window.location.search);
        const club_id = urlParams.get('club_id');
        getClubDetails(club_id);
    }
    // -----------players------------
    if(document.getElementById('playerList')){
        getAllPlayers();
    }


});



//-----------leagues------------------


const leagueForm = document.getElementById("form1")
async function submitLeagueForm(event) {
    event.preventDefault(); // Prevent default form submission
    const formdata1 = new FormData(leagueForm);
    const leagueName = document.getElementById("league_name");
    const country = document.getElementById("country");
    const data1 = Object.fromEntries(formdata1);


    if(leagueName.value.trim()=="" )
    {   
        leagueName.placeholder = "fill this !!"
        return;
    }
    if(country.value.trim()=="")
    {
        country.placeholder = "fill this!!"   
        return;
    }


    try{
        const response = await fetch('http://localhost:5000/insertleague', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
    });
    leagueForm.reset();
    getAllLeagues(); 
    }
    catch(error){
        console.error("Error:", error);
        alert("Failed to submit data.");
    }
}

async function getAllLeagues(){    

    const leagueList = document.getElementById('leagueList');
    
    const response = await fetch('http://localhost:5000/leagues')
    const leagues = await response.json();

    leagueList.innerHTML = ''; 
    leagues.forEach(league => {
        const leagueDiv = document.createElement('div');
        const leagueA = document.createElement('a');

        leagueDiv.innerHTML = `
            <h3>${league.league_name}</h3>
            <p>${league.country}</p>
        `;
        leagueA.href = `clubs.html?league_id=${league.league_id}`;
        leagueA.appendChild(leagueDiv)
        leagueList.appendChild(leagueA);

    });
}


//---------------------------CLUBS-----------------------


const ClubForm = document.getElementById("form2")
async function submitClubForm(event,league_id) {
   
    event.preventDefault(); // Prevent default form submission
    const formdata2 = new FormData(ClubForm);
    const clubName = document.getElementById("club_name");
    const foundedYear = document.getElementById("founded_year");
    const data2 = Object.fromEntries(formdata2);

    if(clubName.value.trim()=="" )
    {   
        clubName.placeholder = "fill this !!"
        return;
    }
    if(foundedYear.value.trim()==""|| isNaN(foundedYear.value.trim()))
        {
        country.placeholder = "fill this!!"   
        return;
    }
    try{
        const response = await fetch(`http://localhost:5000/insertclub/${league_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
    });
    ClubForm.reset();
    getClubsByLeague(league_id); 
    }
    catch(error){
        console.error("Error:", error);
        alert("Failed to submit data.");
    }
}


async function getClubsByLeague(league_id){
    const clubList = document.getElementById('clubList');
    clubList.innerHTML = '';  
    let clubs = [];
    if(league_id){
           const response = await fetch(`http://localhost:5000/clubs/${league_id}`)
           clubs = await response.json(); 
    }else{
        const response = await fetch('http://localhost:5000/clubs')
        clubs = await response.json();  // get all clubs from the database
    }
    console.log(clubs);
    clubs.forEach(club => {
        const leagueNAMEH3 = document.getElementById('leagueNAMEH3');
        leagueNAMEH3.innerHTML = club.league_name;
        const clubDiv = document.createElement('div');
        const clubA = document.createElement('a');

        clubDiv.classList.add('club_div');
        clubDiv.innerHTML = `
            <h3>${club.club_name}</h3>
            <p>${club.league_name}</p>
        `;
        clubA.href = `clubdetails.html?club_id=${club.club_id}`;
        clubA.appendChild(clubDiv);
        clubList.appendChild(clubA);
    });
}

//----------------club details------------

async function getClubDetails(club_id1){
    //-------fetching club name for heading-----
    const DclubName = document.getElementById('DclubName');
    const found_year = document.getElementById('found_year');
    const response = await fetch(`http://localhost:5000/clubdetails/${club_id1}`);    
    const club = await response.json();
    console.log(club[0]);
    DclubName.innerHTML = club[0].club_name;
    found_year.innerHTML = club[0].founded_year;



    //-----------------finances-----------------------------
    
    
    
    const financeDiv = document.getElementById('clubFinanceD');
    const responsef = await fetch(`http://localhost:5000/finances/${club_id1}`);
    const finances = await responsef.json();
    
    const financeTable = document.createElement('table');
    financeTable.innerHTML = `
        <tr>
            <th>Year</th>
            <th>Revenue</th>
            <th>Sales</th>
            <th>Expenses</th>
            <th>Net spent</th>
        </tr>`
    
    finances.forEach(finance => {
        const financeRow = document.createElement('tr');
        financeRow.innerHTML = `
            <td>${finance.finance_year}</td>
            <td>${finance.revenue}</td>
            <td>${finance.sales}</td>
            <td>${finance.expenses}</td>
            <td>${finance.net_spent}</td>`;
            
        financeTable.appendChild(financeRow);
    })
    financeDiv.appendChild(financeTable);
    
    
    //-----------------players-----------------------------


    const clubPlayerD = document.getElementById('clubPlayersD');
    const responsep = await fetch(`http://localhost:5000/players/${club_id1}`);
    let players = await responsep.json();
    console.log(players);

    players.forEach(player =>  {

        const playerDiv = document.createElement('div');
        if(player.position =='cf'){
            player.position = 'forward';
        }else if(player.position == 'mf'){
            player.position = 'midfielder';
        }else if(player.position == 'cb'){
            player.position = 'defender';
        }else if(player.position == 'gk'){
            player.position = 'goalkeeper';
        }
            
        let month ={
            m01: 'Jan', m02: 'Febr', m03: 'Mar', m04: 'Apr', m05: 'May', m06: 'June', m07: 'July', m08: 'Aug', m09: 'Sep', m10: 'Oct', m11: 'Nov', m12: 'Dec'
        }
        const DOByear = player.date_of_birth.slice(0,4)
        const DOBmonth = `m${player.date_of_birth.slice(5,7)}`;
        const DOBdate = player.date_of_birth.slice(8,10);
        const DOB = `${DOBdate} ${month[DOBmonth]} ${DOByear}`
        
        playerDiv.innerHTML= `<h3>${player.player_name}</h3>`;
        playerDiv.innerHTML += `
            <p>${DOB}</p>
            <p>${player.nationality}</p>
            <p>${player.position}</p>`;   
            
        clubPlayerD.appendChild(playerDiv);    
    });
}        

// ----------players----------------------------

async function getAllPlayers(){    

    const playerList = document.getElementById('playerList');
    
    const response = await fetch('http://localhost:5000/players')
    const players = await response.json();
    console.log(players);
    
    playerList.innerHTML = ''; 
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        const playerA = document.createElement('a');

        playerDiv.innerHTML = `
            <h3>${player.player_name}</h3>
            <p>${player.club_name}</p>
            <p>${player.nationality}</p>
            <p>${player.position}</p>
            
        `;
        playerA.href = "";
        playerA.appendChild(playerDiv)
        playerList.appendChild(playerA);

    });
}
