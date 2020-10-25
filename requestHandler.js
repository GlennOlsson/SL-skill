function handleLaunch(json) {}

function handleIntent(json) {}

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
