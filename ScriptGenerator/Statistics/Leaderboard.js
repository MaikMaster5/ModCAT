//https://sunshine-heavy-industries.com/api/getScores?key=daily%3A2021.05.27 Might be the first one?
//maybe add an theorethical minimum?
//maybe click on a name and it drops down their prior scores, bit grayed out.
//maybe provide that day's seed?
//there's also a get ships? I can possibly retrieve people's creations and show them the day afterwards?
//Normally this is done WITH a version parameter, but https://sunshine-heavy-industries.com/api/getScores?key=daily%3A2023.02.24&includeShips=true should work.
//Maybe a "ship of the day" screen that shows the best ship from yesterday? Keeps it more private apart from that.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function retrieveDailyScoreboard(currentDate) {
    return __awaiter(this, void 0, void 0, function () {
        var ModCATVersion, key, result, latestGameVersion, totalSubmissions, i, playerscoreListElement, playerName, playerScore, submissionAmount, retrieveVersions, match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ;
                    ;
                    ModCATVersion = "1.3.2";
                    key = currentDate(new Date());
                    return [4 /*yield*/, fetch("https://sunshine-heavy-industries.com/api/" + "getScores?" + new URLSearchParams({ key: key })).then(function (response) {
                            return response.json();
                        })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, fetch("https://sunshine-heavy-industries.com/api/status").then(function (response) {
                            return response.json();
                        })];
                case 2:
                    latestGameVersion = _a.sent();
                    totalSubmissions = result.length;
                    result = result.filter(function (v, i, a) { return a.findIndex(function (v2) { return (v2.userId === v.userId); }) === i; });
                    for (i = 0; i < result.length; i++) {
                        playerscoreListElement = document.createElement("li");
                        playerscoreListElement.setAttribute("style", "padding: 0; margin: 0; position: relative; top: -27px; left: 0px; display: block; color: rgb(249, 81, 146); width: 527px; background-color: rgb(36, 9, 51); margin-bottom: 5px; max-height: 25px;");
                        playerName = document.createElement("span");
                        playerName.setAttribute("style", "text-align: left; display: inline-block; width: 355px; position: relative; top:-0px; text-transform: capitalize;");
                        playerName.innerText = JSON.stringify(result[i].username).replace(/"/g, '');
                        playerScore = document.createElement("span");
                        playerScore.setAttribute("style", "text-align: right; display: inline-block; width: 170px; position: relative; top:-0px; left: 0px;");
                        playerScore.innerText = JSON.stringify(result[i].score);
                        playerscoreListElement.append(playerName, playerScore);
                        document.getElementById("LeaderboardList").appendChild(playerscoreListElement);
                    }
                    ;
                    submissionAmount = "Submissions: " + result.length + " | Total Submissions: " + totalSubmissions;
                    document.getElementById("submissionCount").innerText = submissionAmount;
                    retrieveVersions = "Latest Game Version: " + latestGameVersion.serverVersion + " | Latest ModCAT Version: " + ModCATVersion;
                    document.getElementById("versions").innerText = retrieveVersions;
                    match = "";
                    if (latestGameVersion.serverVersion > ModCATVersion) {
                        match = "ModCAT is OUT OF DATE - Usage is NOT recommended";
                        document.getElementById("versionMatching").setAttribute("style", "color: red");
                    }
                    else if (latestGameVersion.serverVersion < ModCATVersion) {
                        match = "SHI'S Servers are OUT OF DATE - Usage is NOT recommended (...This is not supposed to happen?)";
                        document.getElementById("versionMatching").setAttribute("style", "color: red");
                    }
                    else {
                        match = (latestGameVersion.serverVersion === ModCATVersion) ? "Version Match! - Feel free to use it!" : "Version Match unknown. Are you connected to the internet?"; //currently won't work. I need a better version check. Strings, blanks and unusual values work instead of reporting "Unknown"
                        latestGameVersion.serverVersion === ModCATVersion ? document.getElementById("versionMatching").setAttribute("style", "color: green") : document.getElementById("versionMatching").setAttribute("style", "color: red");
                        //I probably want the values to be a check on all three: Major, Minor, Update. This would also detect that version x.x.12 is more than x.x.9. (currently it just sees .9 > .12 which, I guess is fair)
                    }
                    ;
                    document.getElementById("versionMatching").innerText = match;
                    return [2 /*return*/];
            }
        });
    });
}
;
var currentDate = function (d) {
    return "daily:" + d.toISOString().slice(0, 10).replace(/-/g, ".");
};
retrieveDailyScoreboard(currentDate);
