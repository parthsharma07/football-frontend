import './App.css';
import React, { useState } from 'react';

function App() {

  const [countryId, setCountryId] = useState('--');
  const [countryName, setCountryName] = useState('--');
  const [leagueId, setLeagueId] = useState('--');
  const [leagueName, setLeagueName] = useState('--');
  const [teamId, setTeamId] = useState('--');
  const [teamName, setTeamName] = useState('--');
  const [leaguePosition, setLeaguePosition] = useState('--');
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
      setIsChecked(!isChecked);
      fetch("/footballStanding/toggleOnlineOffline")
            .then(response => isChecked==true?alert("You are now online"):alert("You are now offline"));
    };

  function clickMe() {
    var countryName = document.getElementsByName("countryName")[0].value;
    var leagueName = document.getElementsByName("leagueName")[0].value;
    var teamName = document.getElementsByName("teamName")[0].value;
  //  alert(countryName + " " + leagueName + " " + teamName);
    fetch("/footballStanding/getStandings?countryName=" + countryName + "&leagueName=" + leagueName + "&teamName=" + teamName)
      .then(response => response.json())
            .then(data => {
            if(data.error!=null){
                alert("No data found for the given inputs. Please try again with proper inputs.")
            }
              setCountryId(data.country_id);
              setCountryName(data.country_name);
                setLeagueId(data.league_id);
                setLeagueName(data.league_name);
                setTeamId(data.team_id);
                setTeamName(data.team_name);
                setLeaguePosition(data.overall_league_position);
            });

  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-link">
          Enter below details to find standing of a team
        </p>
        <p style={{ width: "30%", height:"12px" }}>
        Country:
        <input st name="countryName" style={{float:"right", width: "200px", height: "25px",marginLeft: "20px",border: "2px solid", fontSize: "20px"}}/>
        </p>
        <p style={{ width: "30%", height:"12px" }}>
                League:
                <input st name="leagueName" style={{float:"right", width: "200px", height: "25px",marginLeft: "20px",border: "2px solid", fontSize: "20px"}}/>
                </p>
        <p style={{ width: "30%" }}>
                Team:
                <input st name="teamName" style={{float:"right", width: "200px", height: "25px",marginLeft: "20px",border: "2px solid", fontSize: "20px"}}/>
                </p>
        <div>
                        <button onClick={clickMe} style={{ backgroundColor:"#283593", cursor: "pointer",padding: "5px 10px", textTransform: "uppercase", borderRadius: "5px", color: "white", outline: 0,border: 0, width: "220px", height: "35px", fontSize: "20px" }}>Get Standing</button>
                      </div>
        <p className="App-link">
          Below are the standing details of the team
        </p>
        <p style={{textAlign:"left", width: "40%"}}>
            Country Id: {countryId}
            <span style={{float:"right"}}>
                Country Name: {countryName}
            </span>
        </p>
        <p style={{textAlign:"left",  width: "40%"}}>
                    League Id: {leagueId}
                    <span style={{float:"right"}}>
                        League Name: {leagueName}
                    </span>
                </p>
        <p style={{textAlign:"left",  width: "40%"}}>
                    Team Id: {teamId}
                    <span style={{float:"right"}}>
                        Team Name: {teamName}
                    </span>
                </p>
        <p style={{textAlign:"center",  width: "40%"}}>Overall League Position: {leaguePosition}
        </p>
        <p style={{textAlign:"left",  width: "15%", marginLeft: "80%", marginTop: "-2%"}}>Offline Support
                    <span style={{float:"right"}}>
                      <input
                      style={{ height: "22px", width: "22px" }}
                                type="checkbox"
                                id="offline"
                                name="offline"
                                value="offline"
                                checked={isChecked}
                                onChange={handleOnChange}
                              />
                      </span>
                      </p>
      </header>
    </div>
  );
}

export default App;
