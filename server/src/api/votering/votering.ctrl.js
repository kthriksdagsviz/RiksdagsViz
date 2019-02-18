import VoteringDa from './votering.da'

export default {
    fillDb,
    getVoteringarById,
    getVoteringarByDate,
    getVoteringarByLedamotId,
    getDb
}


/**
   * FillDb with latest voteringar, wip
*/
function fillDb(req, res){
    VoteringDa.getRiksdagsDb()
        .then((data)=>   res.json({"Filled Db": true}))
        .catch((error) => console.log("there was an error"))
}

function getDb(req, res){
    const { rm, parti } =  req.query;
    let listOfYears = rm.split(',')

    let params = {
        rm: listOfYears,
        parties: parti
    }

    VoteringDa.getRiksdagsVoteringar(params)
        .then((data)=>   res.json({data}))
        .catch((error) => console.log("there was an error"))
}
/**
   * Get voteringar by id
*/
function getVoteringarById(req, res){
    const { id } = req.query;
    VoteringDa.VoteringById(id)
        .then((votering) => res.status(200).json(votering))
        .catch(() => res.sendStatus(422))
}

function getVoteringarByLedamotId(req, res){
    const { iid } = req.query
    console.log(iid)
    VoteringDa.getVoteringByLedamotId(iid)
        .then((data) => res.status(200).json(data) )
}


/**
   * Get voteringar by date
*/
function getVoteringarByDate(req, res){
    const { date } = req.params;
    VoteringDa.VoteringarByDate(date)
        .then((voteringar) => res.status(200).json(voteringar))
        .catch(() => res.sendStatus(422))
}
