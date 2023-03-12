let missionObject = {};
missionObject.name = "Mission Name";
missionObject.description = "an internal mission description";
missionObject.storyDeps = ["tutorial"];
missionObject.clientPic = "selene";
missionObject.storeParts = ["generator_1x1"];
missionObject.unlockedParts = ["cabgold_3x2"];
missionObject.requirements = [{ type: "Fuel", limit: 10 },{ type: "Command", limit: 10 },{ type: "Passenger", limit: 8 },{ type: "Thrust", limit: 20 },{ type: "Firepower", limit: 10 }];
missionObject.reward = 20000;
missionObject.unique = !0;
missionObject.ship = {};
missionObject.script = {
              before: [],
              after: []
            };

console.log(missionObject);
document.getElementById("cool").innerText = JSON.stringify(missionObject);