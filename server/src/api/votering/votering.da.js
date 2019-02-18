import Votering from './votering.model'
import axios from 'axios'
import convert from 'xml-js'
import xml2js from 'xml2js'
import moment from 'moment'
export default {
    getRiksdagsDb,
    getRiksdagsVoteringar,
    VoteringById,
    VoteringarByDate
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

function getRiksdagsVoteringar(params){
    var str = "";
    // let paramsObject = {
    //     rm:['2018/19', '2017/18']
    // }
    params.rm.map((year) => {
        if(str != ""){
            str += "&"
        }
        str += "rm=" + encodeURIComponent(year)
    })
    console.log(params)


    // params.rm.map((year) => {
        
	// 	let promise =  new Promise((resolve, reject) => {
	// 		fetch(base_url + 'votering/?rm=' + year + '&parti=' + parties)
	// 			.then((res) => {
	// 				resolve(res.json())
	// 			}).catch((error) => console.log(error))
	// 	})
	// 	numOfPromises.push(promise)
	// })

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

function VoteringById(id){
    return new Promise((resolve, reject) => {
        Votering.find({votering_id: id}, (error, votering) => {
            if(error){
                reject(error)
            }
            else{
                resolve(votering)
            }
        })
    })
}

function VoteringarByDate(date){
    return new Promise((resolve, reject) => {
        Votering.find({
            systemdatum:{
                $gte:date,
                $lte: moment(date).endOf('day').toDate()
            }
        }, (error, voteringar) => {
            if(error){
                reject(error)
            }
            else{
                resolve(voteringar)
            }
        })
    })
}



function saveVotering(votering){
    const vote = {}
    Object.keys(votering).forEach((key) => {
        let data = votering[key][0]
        if(key == "systemdatum"){
            data = new Date(votering[key][0])
            //console.log(moment(date).format('YYYY-MM-DD H:mm:ss'))   
        }
        vote[key] = data
    })
    //console.log(vote)
    const dbVote = new Votering(vote)
    dbVote.save((error, savedVote) => {
        if(error) console.log(error)
        console.log("worked!")
    })
}