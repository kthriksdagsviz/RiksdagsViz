import Votering from './votering.model'
import axios from 'axios'
import convert from 'xml-js'
import xml2js from 'xml2js'

export default {
    getRiksdagsDb
}

function getRiksdagsDb(){
    return new Promise((resolve, reject) => {
        let url = "http://data.riksdagen.se/voteringlista/?rm=2018%2F19&bet=&punkt=&parti=M&valkrets=&rost=&iid=&sz=10&utformat=xml&gruppering="
        axios.get(url)
            .then((response) => {
                xml2js.parseString(response.data, function (err, result) {
                    result.voteringlista.votering.forEach((v) => saveVotering(v))
                    resolve(result)
                });
                //res.json(resJson)
            })
            .catch((error) => {
                if(error.status == 400){
                    resolve(null)
                }
                else{
                    reject(error)
                }
            })
        
        })
}

function getVoteringById(id){
    return new Promise((resolve, reject) => {
        
    })
}

function saveVotering(votering){
    const vote = {}
    Object.keys(votering).forEach((key) => {
        vote[key] = votering[key][0]
    })
    console.log(vote)
    const dbVote = new Votering(vote)
    dbVote.save((error, savedVote) => {
        if(error) console.log(error)
        console.log("worked!")
    })
}