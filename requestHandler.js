function handleLaunch(json) {}

function handleIntent(json) {}

function handleBadRequest(reasonTitle, reasonDesc) {
	const errorBody = {
		version: "1.0",
		response: {
			outputSpeech: {
				type: "SSML",
				text: `<speak>
				<amazon:emotion name="disappointed" intensity="high"> 
					There was an error with the request. See the app for more information
				</amazon:emotion>
			</speak>`,
			},
			card: {
				type: "Simple",
				title: reasonTitle,
				content: reasonDesc,
			},
		},
	};
	return errorBody;
}

module.exports = {
	handleLaunch, 
	handleIntent, 
	handleBadRequest
}