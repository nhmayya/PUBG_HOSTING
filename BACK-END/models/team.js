const mongoose = require('mongoose')

var uniqueValidator = require('mongoose-unique-validator');
const teamSchema = new mongoose.Schema({

    match_timings : {
        type : String,
        required : true,
    },

    playerone_id : {
        type : String,
        required : true,
        unique:true
    },

    playertwo_id : {
        type : String,
        required : false,
        index: {
            unique: true,
            partialFilterExpression: { playertwo_id: { $type: 'string' } },
          },
        // default : null  
    },

    playerthree_id : {
        type : String,
        required : false,
        index: {
            unique: true,
            partialFilterExpression: { playerthree_id: { $type: 'string' } },
          },
        // default : null 
    },

    playerfour_id : {
        type : String,
        required : false,
        index: {
            unique: true,
            partialFilterExpression: { playerfour_id: { $type: 'string' } },
          },
        //   default : null           
    }
})
teamSchema.plugin(uniqueValidator);

team=mongoose.model('team',teamSchema);
module.exports = team
