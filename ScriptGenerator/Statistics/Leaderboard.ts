//https://sunshine-heavy-industries.com/api/getScores?key=daily%3A2021.05.27 Might be the first one?
//maybe add an theorethical minimum?
//maybe click on a name and it drops down their prior scores, bit grayed out.
//maybe provide that day's seed?
//there's also a get ships? I can possibly retrieve people's creations and show them the day afterwards?
//Normally this is done WITH a version parameter, but https://sunshine-heavy-industries.com/api/getScores?key=daily%3A2023.02.24&includeShips=true should work.
//Maybe a "ship of the day" screen that shows the best ship from yesterday? Keeps it more private apart from that.



async function retrieveDailyScoreboard (currentDate: Function) {

    interface userInfo {
        userId: string;
        username: string;
        score: number
      };

      interface versionResponse {
        serverVersion: string;
      };

      const ModCATVersion = "1.3.2";


    
    const key: string = currentDate(new Date());
    //"2/25/23" in the Date() is valid for a specific date, though it's always 1 day behind.
    //console.log("Source: " + "https://sunshine-heavy-industries.com/api/" + "getScores?" + new URLSearchParams({ key }));
    
    let result: Array<userInfo> = await fetch("https://sunshine-heavy-industries.com/api/" + "getScores?" + new URLSearchParams({ key })).then(response =>
        response.json(),
      );

      let latestGameVersion: versionResponse = await fetch("https://sunshine-heavy-industries.com/api/status").then(response =>
      response.json(),
    );

    //console.log(latestGameVersion.serverVersion);

    let totalSubmissions: number = result.length;
    result = result.filter((v, i, a) => a.findIndex(v2 => (v2.userId === v.userId)) === i);


    for(let i = 0; i < result.length; i++)
      {
       let playerscoreListElement: HTMLLIElement = document.createElement("li");
       playerscoreListElement.setAttribute("style", "padding: 0; margin: 0; position: relative; top: -27px; left: 0px; display: block; color: rgb(249, 81, 146); width: 527px; background-color: rgb(36, 9, 51); margin-bottom: 5px; max-height: 25px;");


       const playerName: HTMLElement = document.createElement("span");
       playerName.setAttribute("style", "text-align: left; display: inline-block; width: 355px; position: relative; top:-0px; text-transform: capitalize;");
       playerName.innerText = JSON.stringify(result[i].username).replace(/"/g,'');  

       
       const playerScore: HTMLElement = document.createElement("span");
       playerScore.setAttribute("style", "text-align: right; display: inline-block; width: 170px; position: relative; top:-0px; left: 0px;");
       playerScore.innerText = JSON.stringify(result[i].score);



       playerscoreListElement.append(playerName, playerScore);
       (document.getElementById("LeaderboardList") as HTMLUListElement).appendChild(playerscoreListElement)
      };

    //console.log(result);
    //console.log("Final Submissions: " + result.length);


    let submissionAmount: string = "Submissions: " + result.length + " | Total Submissions: " + totalSubmissions;
    (document.getElementById("submissionCount") as HTMLUListElement).innerText = submissionAmount;


    let retrieveVersions: string = "Latest Game Version: " + latestGameVersion.serverVersion + " | Latest ModCAT Version: " + ModCATVersion;
    (document.getElementById("versions") as HTMLUListElement).innerText = retrieveVersions;


    let match: string = "";

    if (latestGameVersion.serverVersion > ModCATVersion) {
        match = "ModCAT is OUT OF DATE - Usage is NOT recommended";
        (document.getElementById("versionMatching") as HTMLUListElement).setAttribute("style", "color: red")
    } else if (latestGameVersion.serverVersion < ModCATVersion) {
        match = "SHI'S Servers are OUT OF DATE - Usage is NOT recommended (...This is not supposed to happen?)";
        (document.getElementById("versionMatching") as HTMLUListElement).setAttribute("style", "color: red")
    } else {
        match = (latestGameVersion.serverVersion === ModCATVersion) ? "Version Match! - Feel free to use it!" : "Version Match unknown. Are you connected to the internet?"; //currently won't work. I need a better version check. Strings, blanks and unusual values work instead of reporting "Unknown"
        latestGameVersion.serverVersion === ModCATVersion ? (document.getElementById("versionMatching") as HTMLUListElement).setAttribute("style", "color: green"): (document.getElementById("versionMatching") as HTMLUListElement).setAttribute("style", "color: red")
        //I probably want the values to be a check on all three: Major, Minor, Update. This would also detect that version x.x.12 is more than x.x.9. (currently it just sees .9 > .12 which, I guess is fair)
    };
    
    (document.getElementById("versionMatching") as HTMLUListElement).innerText = match;
};


const currentDate = (d: Date) => {
  return "daily:" + d.toISOString().slice(0, 10).replace(/-/g, ".")
};

retrieveDailyScoreboard(currentDate)