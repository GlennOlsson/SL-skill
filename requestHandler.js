function handleLaunch(json) {
	return {
		response: {
			outputSpeech: {
				type: "SSML",
				ssml:
					"<speak>This skill can help you with the <amazon:emotion name=\"excited\" intensity=\"high\"> transit schedule in Stockholm, Sweden</amazon:emotion></speak>",
			},
		},
		version: "1.0",
		sessionAttributes: {},
	}
}

function handleIntent(json) {
	return {
		response: {
			outputSpeech: {
				type: "SSML",
				ssml:
					"<speak>The next train leaves in <amazon:emotion name=\"excited\" intensity=\"high\"> 5 minutes</amazon:emotion></speak>",
			},
		},
		version: "1.0",
		sessionAttributes: {},
	}
}

function handleBadRequest(reasonTitle, reasonDesc) {
	const errorBody = {
		response: {
			outputSpeech: {
				type: "SSML",
				ssml:
					"<speak><amazon:emotion name='disappointed' intensity='high'> There was an error with the request. See the app for more information</amazon:emotion></speak>",
			},
			card: {
				type: "Simple",
				title: reasonTitle,
				content: reasonDesc,
			},
			reprompt: {
				outputSpeech: {
					type: "SSML",
					ssml: "<speak>Go ahead and say hello to me!</speak>",
				},
			},
			shouldEndSession: false,
		},
		version: "1.0",
		sessionAttributes: {},
	};
	return errorBody;
}

module.exports = {
	handleLaunch,
	handleIntent,
	handleBadRequest,
};
