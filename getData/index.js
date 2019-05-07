
module.exports = async function (context, req) {
	// Let's call it log.
	const log = context.log;
    const mongoose = require('mongoose');
    const request = require('request');
    const DATABASE = process.env.MLAB;


	// Connect to our Database and handle any bad connections
	mongoose.connect(DATABASE);
	mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
	mongoose.connection.on('error', (err) => {
		context.log(`ERROR→ ${err.message}`);
	});

	// User Schema.
	require('../modelUser');
	const User = mongoose.model('User');

	// Create a Response.
	if (req.query.number) { 
		await(User.remove());
        let paramsObject = {inc: 'gender,name,dob,location', results: req.query.number};
        
        await (request({url:'https://randomuser.me/api', qs:paramsObject}, (err, response, body) => {
			if (err) { return log(err); }
			result = JSON.parse(body);
			userArray = result.results;
			// console.log(userArray);
			for (var user in userArray) {
				let newUser = {
					gender: userArray[user].gender,
					name: userArray[user].name,
					location: {
						type: "Point",
						coordinates: [userArray[user].location.coordinates.longitude, userArray[user].location.coordinates.latitude]
					   },
					dob: userArray[user].dob
				}
				
				new User(newUser).save();
			  }
            }));
        context.res = {
            status: 200,
            body: "Added new Data"
        };
		
	} else {
		context.res = {
			status: 400,
			body: "Please pass a name on the query string or in the request body"
		};
	}


	// Informs the runtime that your code has finished. You must call context.done, or else the runtime never knows that your function is complete, and the execution will time out.
	// @link: https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#contextdone-method
	context.done();
};