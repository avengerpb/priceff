const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// User Schema.
const ResultSchema = new mongoose.Schema({
    averageAge: Number,
    maximumAge: {
        maxAge: Number,
        user:[
            {_id: {
                firstname: String,
                lastname: String 
                }
            }   
        ]
    },
    minimumAge: {
        minAge: Number,
        user:[
            {_id: {
                firstname: String,
                lastname: String 
            }
                }
        ]
    },
    southernUser: {
        distanceFromSouth: Number,
        users:{
            firstname: String,
            lastname: String 
        }
    },
    northernUser: {
        distanceFromNorth: Number,
        users:{
            firstname: String,
            lastname: String 
        }
    }
});


// Export the model.
module.exports = mongoose.model('Result', ResultSchema);