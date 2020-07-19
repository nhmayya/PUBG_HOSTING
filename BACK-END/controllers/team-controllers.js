const HttpError = require('../models/http-error');
const Team = require('../models/team');

const createTeam = async (req,res,next)=>{
    const team = new Team(req.body)
   
    try {
        await team.save()
    } catch (error) {
        const error1 = new HttpError('couldnt save team info',500)
        return next(error1)
    }
    res.status(201)
}
exports.createTeam = createTeam


