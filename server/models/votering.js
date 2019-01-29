// External Dependancies
import mongoose from 'mongoose'

const voteringScheme = new mongoose.Schema({
    hangar_id:String,
    beteckning: String,
    punkt: String,
    votering_id: String,
    intressent_id:String,
    namn:String,
    fornamn: String,
    efternamn: String,
    valkrets: String, 
    iort: String,
    kon: String,
    fodd:String,
    rost: String,
    avser:String,
    votering: String,
    votering_url:String,
    votering_url_xml:String,
    dok_id:String,
    systemdatum: String
}, {collection:"voteringar"})

module.exports = mongoose.model('Votering', voteringScheme);