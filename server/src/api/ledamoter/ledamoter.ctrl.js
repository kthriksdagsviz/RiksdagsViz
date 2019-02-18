import LedamoterDa from './ledamoter.da'

export default {
    getLedamoterByName,
    getAntalLedamoterByGroup,
    getLedamoterByParams
}


/**
   * Get ledamoter by name
*/
function getLedamoterByName(req, res){
    const { fname, ename } = req.query;
    LedamoterDa.getLedamotByName(fname, ename)
        .then((ledamoter) => res.status(200).json(ledamoter))
        .catch(() => res.sendStatus(422))
}


function getLedamoterBySize(req, res){
    const { size } =req.body;

}

function getAntalLedamoterByGroup(req,res){
    const { group } = req.body;
    LedamoterDa.getLedamoterByGroup(group)
        .then((groupering) => res.status(200).json(groupering))
        .catch(() => res.sendStatus(422))
}

function getLedamoterByParams(req, res){
    const { iid, fnamn, enamn, f_ar, kn, parti, valkrets, rdlstatus, org, termlist, size} =  req.query;
    const params = {
        iid, fnamn, enamn, f_ar, kn, parti, valkrets, rdlstatus, org, utformat:'json', termlist
    }
    LedamoterDa.getLedamoterByParams(params, size)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(422))    
}