import VoteringDa from './votering.da'

export default {
    fillDb
}

function fillDb(req, res){
    VoteringDa.getRiksdagsDb().then((data)=> {
        
        res.json({"calm": "down"});
    })
    
    
}