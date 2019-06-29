const WebSocket   = require('ws');
const painter     = require('./painter.js');
const dataHandler = require('./data_handler.js');



function createStream() {
    const ws = new WebSocket('wss://push.planetside2.com/streaming?environment=ps2&service-id=s:hailotApi');
    ws.on('open', function open() {
        console.log('Stream opened...');
        subscribe(ws);
    });
    ws.on('message', function (data) {
        if (data.indexOf("payload") === 2) {
          dataHandler.dealWithTheData(data);
        //  console.log(data);
        }
    });
    captures = 0;
}

function subscribe(ws) {
    var xpGainString = getExperienceIds(true, false, true, true, true, false);

    console.log(painter.white('Subscribing to DBG websocket...'));

    
        ws.send('{"service":"event","action":"subscribe","characters":["all"],"eventNames":["Death"],"worlds":["13"],"logicalAndCharactersWithWorlds":true}');
        ws.send('{"service":"event","action":"subscribe","characters":["all"],"eventNames":[' + xpGainString + '],"worlds":["13"],"logicalAndCharactersWithWorlds":true}');
        ws.send('{"service":"event","action":"subscribe","characters":["all"],"eventNames":["PlayerFacilityCapture","PlayerFacilityDefend"],"worlds":["13"],"logicalAndCharactersWithWorlds":true}');

    

  
    //facility Subscribing - subscribes to all capture data
    ws.send('{"service":"event","action":"subscribe","worlds":["13"],"eventNames":["FacilityControl"]}');
    

    console.log('Subscribed to facility and kill/death events between ');
}

function unsubscribe(ws) {
    // unsubscribes from all events
    ws.send('{"service":"event","action":"clearSubscribe","all":"true"}');
    console.log('Unsubscribed from facility and kill/death events');
}




/**
 * Generates and returns a string of all experience gain IDs for the specified categories.
 *
 * @param {boolean} revives XP gains corresponding to medic revies
 * @param {boolean} spawns (NOT IMPLEMENTED) XP gains corresponding to respawning players
 * @param {boolean} pointControls XP gains corresponding to contesting and capturing control points and objectives 
 * @param {boolean} dmgAssists XP gains corresponding to kill assists via raw damage 
 * @param {boolean} utilAssists XP gains corresponding to kill assists and other support actions, such as spotting,
 *                              EMP/Flash/Conc assists, and medic heals
 * @param {boolean} bannedTicks XP gains corresponding to banned actions, such as motion spotter assists
 * @returns A string of the format '"GainExperience_experience_id_<xpID>","GainExperience_experience_id_<xpID>",...'
 */
function getExperienceIds(revives, spawns, pointControls, dmgAssists, utilAssists, bannedTicks) {
    var xpGainString = '';
    
    if (revives === true) {
        for (xpIdx = 0; xpIdx < allXpIdsRevives.length; xpIdx++) {
            let xpID = allXpIdsRevives[xpIdx];
            xpGainString = addXpIdToXpGainString(xpID, xpGainString);
        }
    }

    if (pointControls === true) {
        for (xpIdx = 0; xpIdx < allXpIdsPointControls.length; xpIdx++) {
            let xpID = allXpIdsPointControls[xpIdx];
            xpGainString = addXpIdToXpGainString(xpID, xpGainString);
        }
    }

    if (dmgAssists === true) {
        for (xpIdx = 0; xpIdx < allXpIdsDmgAssists.length; xpIdx++) {
            let xpID = allXpIdsDmgAssists[xpIdx];
            xpGainString = addXpIdToXpGainString(xpID, xpGainString);
        }
    }
    if (utilAssists === true) {
        for (xpIdx = 0; xpIdx < allXpIdsUtilAssists.length; xpIdx++) {
            let xpID = allXpIdsUtilAssists[xpIdx];
            xpGainString = addXpIdToXpGainString(xpID, xpGainString);
        }
    }

    if (bannedTicks === true) {
        for (xpIdx = 0; xpIdx < allXpIdsBannedTicks.length; xpIdx++) {
            let xpID = allXpIdsBannedTicks[xpIdx];
            xpGainString = addXpIdToXpGainString(xpID, xpGainString);
        }
    }

    return xpGainString;
}

//#region Experience Gain ID Arrays

const allXpIdsRevives = [
    7,      // Revive (75xp)
    53      // Squad Revive (100xp) 
];

const allXpIdsSpawns = [
    56,     // Squad Spawn (10xp)
    223,    // Sunderer Spawn Bonus (5xp) - DOESN'T RETURN WHO SPAWNED
]

const allXpIdsPointControls = [
    15,     // Control Point - Defend (100xp)
    16,     // Control Point - Attack (100xp)
    272,    // Convert Capture Point (25xp)
    556,    // Objective Pulse Defend (50xp)
    557     // Objective Pulse Capture (100xp)
];

const allXpIdsDmgAssists = [
    2,      // Kill Player Assist (100xp)
    335,    // Savior Kill (Non MAX) (25xp)
    371,    // Kill Player Priority Assist (150xp)
    372     // Kill Player High Priority Assist (300xp)
];

const allXpIdsUtilAssists = [
    5,      // Heal Assis (5xp)
    438,    // Shield Repair (10xp)
    439,    // Squad Shield Repair (15xp)
    550,    // Concussion Grenade Assist (50xp)
    551,    // Concussion Grenade Squad Assist (75xp)
    552,    // EMP Grenade Assist (50xp)
    553,    // EMP Grenade Squad Assist (75xp)
    554,    // Flashbang Assist (50xp)
    555,    // Flashbang Squad Assist (75xp)
    1393,   // Hardlight Cover - Blocking Exp (placeholder until code is done) (50xp)
    1394,   // Draw Fire Award (25xp)
    36,     // Spot Kill (20xp)
    54,     // Squad Spot Kill (30xp)
];

const allXpIdsBannedTicks = [
    293,    // Motion Detect (10xp)
    294,    // Squad Motion Spot (15xp)
    593,    // Bounty Kill Bonus (250xp)
    594,    // Bounty Kill Cashed In (400xp)
    594,    // Bounty Kill Cashed In (400xp)
    595,    // Bounty Kill Streak (595xp)
    582     // Kill Assist - Spitfire Turret (25xp)
];

//#endregion

function addXpIdToXpGainString(xpID, xpGainString) {
    if (xpGainString === '' || xpGainString === null || xpGainString === undefined) {
        return makeXpIdString(xpID);
    }
    return xpGainString.concat(',',makeXpIdString(xpID));
}

function makeXpIdString(xpID) {
    return '"GainExperience_experience_id_' + xpID + '"'; 
}

exports.createStream = createStream;
