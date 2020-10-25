const fetch = require("node-fetch");

//Takes  the display time (2 min, Nu etc.) and returns the amount of minutes
function parseDepartureTime(displayTime) {
	if(displayTime.toLowerCase() === "nu")
		return 0;
	
	//Discard HH:mm formats
	if(displayTime.includes(":"))
		return -1;

	var minuteStrings = displayTime.match(/\d+/);
	if(minuteStrings.length != 1)
		return -1;

	try {
		var minutes = parseInt(minuteStrings[0]);
		return minutes;
	} catch (error) {
		return -1;
	}

}

const DIRECTIONS = {
	north: 1,
	south: 2
}

class Departure {
	constructor(json) {
		this.destination = json.Destination
		this.departsIn = parseDepartureTime(json.DisplayTime);
		this.direction = json.JourneyDirection;
	}
}

function nextTrain(json, settings) {
	const realtimeSetting = settings.apis.realtime;
	const key = realtimeSetting.key;

	const siteID = 9183
	const direction = DIRECTIONS.north

	var url = realtimeSetting.url;
	url += `?key=${key}&siteid=${siteID}&timewindow=60&bus=false&train=false&tram=false&ship=false&metro=true`;

	return fetch(url)
		.then(res => res.json())
		.then(resJSON => {
			let deps = resJSON.ResponseData.Metros.map(metro => new Departure(metro));
			return deps
		})
		.then(deps => deps.filter(dep => dep.departsIn > 0 && dep.direction === direction))
		//Sorted so we can reply with more information in the future
		.then(deps => deps.sort((a, b) => a.departsIn > b.departsIn))
		.then(deps => {
			const nextTrain = deps[0];

			const speachReply = `
			<speak>
				The next train leaves in ${nextTrain.departsIn} minutes.
			</speak>
			`
			return {
				response: {
					outputSpeech: {
						type: "SSML",
						ssml: speachReply
					},
				},
				version: "1.0",
			}
		})

}

module.exports = {
	nextTrain
}