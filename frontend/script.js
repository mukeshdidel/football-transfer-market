
document.addEventListener("DOMContentLoaded", () => {
    // Ensure we only fetch clubs if we're on clubs.html
    // --------club--------
    if (document.getElementById("clubList")) {
        const urlParams = new URLSearchParams(window.location.search);
        const league_id = urlParams.get('league_id');
        if(league_id)
        {
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
    DclubName.innerHTML = club[0].club_name
    found_year.innerHTML = club[0].founded_year

    //
    
    
}