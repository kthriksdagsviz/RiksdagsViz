// External Dependancies
import mongoose from 'mongoose'

const voteringScheme = new mongoose.Schema({
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
    systemdatum: String
}, {collection:"voteringar"})



const Votering  = mongoose.model('Votering', voteringScheme);

Votering.schema.path('votering_id').validate({
    isAsync: true,
    validator: function (v, cb) {
        Votering.find({votering_id: v}, function(err,docs){
            cb(docs.length == 0);
        });
    }, 
    message: "Votering already exists"
})
    



export default Votering;