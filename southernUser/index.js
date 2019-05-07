module.exports = async function (context, req) {
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
    let maxAge;
    
    if (req){
        // await();
        
        await(User.aggregate([ {
            $geoNear: {
                near: { type: "Point", coordinates: [ 180, -90] },
                key: "location",
                distanceField: "dist.calculated",
                spherical: true,
                num: 1,
             }
            }
            ]).then(function (res) {
                context.res = {
                status: 200,
                body: res
                };
              })
            );

    }
    else {
		context.res = {
			status: 404,
			body: "Not Found"
		};
	}
};

