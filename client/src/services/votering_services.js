
const base_url = '/api/v1/'

export const getLedamotVoteringById = async (id) =>{
	//id == ledamotId
	let response = await fetch(base_url + 'votering/id?iid=' + id)
	let data = await response.json();
	return data
}

