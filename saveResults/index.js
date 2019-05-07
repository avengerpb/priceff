
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
	require('../modelResult');
	const Result = mongoose.model('Result');

	var getResult = require('./getResult');
	let averageAge = await(getResult.averageAge());
	let maxAge = await(getResult.maxAge());
	let minAge = await(getResult.minAge());
	let southernUser = await(getResult.southernUser());
	let northernUser = await(getResult.northernUser());

	// Create a Response.
	if (req) { 
        let newResult = {
            averageAge: averageAge,
            maximumAge: maxAge,
            minimumAge: minAge,
            southernUser: {
				distanceFromSouth: southernUser.dist.calculated,
        		users:{
					firstname: southernUser.name.first,
					lastname: southernUser.name.last
        		}
			},
            northernUser: {
				distanceFromNorth: northernUser.dist.calculated,
        		users:{
					firstname: northernUser.name.first,
					lastname: northernUser.name.last
        		}
			}
        }

		// console.log(getResult.averageAge());
        await(new Result(newResult).save());
        context.res = {
            status: 200,
            body: newResult
        };
	} else {
		context.res = {
			status: 400,
			body: "Please pass a name on the query string or in the request body"
		};
	}
	context.done();
};