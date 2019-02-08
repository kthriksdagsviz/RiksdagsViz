import VoteringDa from './votering.da'

export default {
    fillDb,
    getVoteringarById,
    getVoteringarByDate,
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
    VoteringDa.getRiksdagsVoteringar()
        .then((data)=>   res.json({data}))
        .catch((error) => console.log("there was an error"))
}
/**
   * Get voteringar by id
*/
function getVoteringarById(req, res){
    const { id } = req.params;
    VoteringDa.VoteringById(id)
        .then((votering) => res.status(200).json(votering))
        .catch(() => res.sendStatus(422))
}


/**
   * Get voteringar by date
*/
function getVoteringarByDate(req, res){
    const { date } = req.params;
    console.log(date)
    VoteringDa.VoteringarByDate(date)
        .then((voteringar) => res.status(200).json(voteringar))
        .catch(() => res.sendStatus(422))
}
