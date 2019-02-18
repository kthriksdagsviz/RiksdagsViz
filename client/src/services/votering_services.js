import { request } from "http";

const base_url = '/api/v1/'

export const getLedamotVoteringById = async (id) =>{
	let response = await fetch(base_url + 'votering/id?iid=' + id)
	let data = await response.json();
	return data
}
	//id == ledamotId


export const getVoteringByYear = async (years, parti) =>{
	let numOfYears = years.split(',');
	let parties = parti.join()
	console.log(parti)
	let numOfPromises = []
	numOfYears.map((year) => {
		let promise =  new Promise((resolve, reject) => {
			fetch(base_url + 'votering/?rm=' + year + '&parti=' + parties)
				.then((res) => {
					resolve(res.json())
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
