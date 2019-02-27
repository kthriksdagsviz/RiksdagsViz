import { request } from "http";
import axios from 'axios'
import xml2js from 'xml2js'


const base_url = '/api/v1/'



export const getLedamotVoteringById = async (id) =>{
	let response = await fetch(base_url + 'votering/id?iid=' + id)
	let data = await response.json();
	return data
}
export const getVoteringByVoteringId = async (id) =>{
	return new Promise((resolve, reject) => {
		let url ="https://data.riksdagen.se/votering/" + id + "/xml"
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




	//id == ledamotId

export const getVoteringarByParams = async (id) =>{
	return new Promise((resolve, reject) => {
		let url ="https://data.riksdagen.se/voteringlista/?bet=&punkt=&valkrets=&rost=&iid=" + id +"&sz=10000&utformat=xml&gruppering="
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

export const getNumberOfVotesByLedamot = async (id) =>{
	return new Promise((resolve, reject) => {
		let url ="https://data.riksdagen.se/voteringlista/?rm=2018%2F19&bet=&punkt=&valkrets=&rost=&iid=" + id + "&sz=10000&utformat=xml&gruppering="
		axios.get(url)
			.then((response) => {
				xml2js.parseString(response.data, function (err, result) {
					resolve(result.voteringlista.votering.length)
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
	
	

export const getVoteringByYear = async (years, parti) =>{
	let numOfYears = years.split(',');
	let parties = parti.join()
	console.log(parti)
	let numOfPromises = []
	numOfYears.map((year) => {
		let promise =  new Promise((resolve, reject) => {
			fetch(base_url + 'votering/?rm=' + year + '&parti=' + parties)
				.then((res) => {
					resolve(res)
				}).catch((error) => console.log(error))
		})
		numOfPromises.push(promise)
	})

	let dataToSendBack = {

	}

	Promise.all([numOfPromises]).then((response) => {
		response[0].map((res, index) => res.then((data) => dataToSendBack[numOfYears[index]] = data.data.voteringlista  ))
	})

	//let response = await fetch(base_url + 'votering/?rm=' + '2018/19' )
	//let data = await response.json();
	//return data
	return dataToSendBack
}
