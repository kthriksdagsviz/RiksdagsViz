// External Dependancies
import mongoose from 'mongoose'

const ledamotScheme = new mongoose.Schema({
    hangar_id:String,
    rm:String,
    beteckning: String,
    punkt: String,
    votering_id: String,
    intressent_id:String,
    namn:String,
    fornamn: String,
    efternamn: String,
    valkrets: String, 
    iort: String,
    parti:String,
    banknummer:String,
    kon: String,
    fodd:String,
    rost: String,
    avser:String,
    votering: String,
    votering_url_xml:String,
    dok_id:String,
    systemdatum: Date
}, {collection:"ledamoter"})




export default mongoose.model('Ledamot', ledamotScheme);



