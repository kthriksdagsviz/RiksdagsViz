import axios from 'axios';

const base_url = '/api/v1/'

export const getNyheterByParams = async (params) =>{
	let response = await axios.get(base_url + 'nyheter', {
		params: params
	})
	
	return response.data
}

