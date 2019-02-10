import LedamoterDa from './ledamoter.da'

export default {
    getLedamoterByName
}


/**
   * Get ledamoter by name
*/
function getLedamoterByName(req, res){
    //const { fname, ename } = req.body;
    console.log(req.body)
    let fname = "Peter"
    let ename =""
    LedamoterDa.getLedamotByName(fname, ename)
        .then((ledamoter) => res.status(200).json(ledamoter))
        .catch(() => res.sendStatus(422))
}
