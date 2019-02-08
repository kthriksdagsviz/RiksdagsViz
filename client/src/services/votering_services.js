
const base_url = '/api/v1/'

export const getVoteringById = async (id) =>{
	let response = await fetch(base_url + 'votering/')
	let data = await response.json();
	return data
}

