import axios from 'axios'
import convert from 'xml-js'
import xml2js from 'xml2js'
import moment from 'moment'
export default {
    getRiksdagsDb,
    getVoteringByLedamotId
}

function getRiksdagsDb(){
    return new Promise((resolve, reject) => {
        let url = "http://data.riksdagen.se/voteringlista/?rm=2018%2F19&bet=&punkt=&parti=&valkrets=&rost=&iid=&sz=100&utformat=xml&gruppering="
        axios.get(url)
            .then((response) => {
                xml2js.parseString(response.data, function (err, result) {
                    // result.voteringlista.votering.forEach((v) => saveVotering(v))
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

function getVoteringByLedamotId(iid){
    return new Promise((resolve, reject) => {
        let url = "http://data.riksdagen.se/voteringlista/?rm=&bet=&punkt=&parti=&valkrets=&rost=&iid=" + iid +"&sz=100&utformat=xml&gruppering=iid"
        axios.get(url)
            .then((response) => {
                xml2js.parseString(response.data, function (err, result) {
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

function getRiksdagsVoteringar(params){
    var str = "";
  
    params.rm.map((year) => {
        if(str != ""){
            str += "&"
        }
        str += "rm=" + encodeURIComponent(year)
    })


    return new Promise((resolve, reject) => {
        let url = "http://data.riksdagen.se/voteringlista/?" + str + "&bet=&punkt=&parti=&valkrets=&rost=&iid=&sz=500&utformat=xml&gruppering=votering_id"
        axios.get(url)
            .then((response) => {
                xml2js.parseString(response.data, function (err, result) {
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

