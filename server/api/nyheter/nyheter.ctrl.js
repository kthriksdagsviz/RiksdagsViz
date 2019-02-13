import NyheterDa from './nyheter.da'

export default {
    getNyheterByParams
}


/**
   * Get ledamoter by name
*/
function getNyheterByParams(req, res){
    const { q, from, to, sortBy, language } = req.query;
    const params ={
        q, from, to, sortBy, language 
    }
    NyheterDa.getNyheterByParams(params)
        .then((nyheter) => res.status(200).json(nyheter))
        .catch(() => res.sendStatus(422))
}

