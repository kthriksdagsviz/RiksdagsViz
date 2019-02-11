import axios from 'axios';

const base_url = '/api/v1/'

export const getLedamoterByParams = async (params) =>{
	let response = await axios.get(base_url + 'ledamoter', {
		params: params
	})
	
	return response.data
}

