function dealWithTheData(raw) {
    raw = raw.replace(': :', ':');
    const data = JSON.parse(raw).payload;
    switch(data.event_name) {
        case "Death":
        console.log('Death: ' + raw);
            // itsPlayerData(data);
            break;
            
        case "PlayerFacilityCapture":
        console.log('Player cap: ' + data);
            // itsPlayerFacilityData(data);
            break;

        case "PlayerFacilityDefend":
        console.log('Player Def: ' + data);
            // itsPlayerFacilityData(data);
            break;

        case "FacilityControl":
        console.log('Control: ' + data);
            // itsFacilityData(data);
            break;

        case "GainExperience":
        console.log('Exp: ' + data);
            // itsExperienceData(data);
            break;

        default:
            //console.log(data.event_name);
            return;
    }
}

function isPlayerDeath(data){
    
}

exports.dealWithTheData = dealWithTheData;