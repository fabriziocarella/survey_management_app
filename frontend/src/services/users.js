import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACK_URL;

//Register User
export async function registerUser(data) {
	try {
		const response = await axios({
            url: `${baseUrl}/register`,
			method: "POST",
			data
		})
		return response
	} catch (error) {
		return error.response;
	}
}
//Login User
export async function loginUser(data) {
	try {
		const response = await axios({
			url: `${baseUrl}/login`,
			method: "POST",
			data,
		});
		return response;
	} catch (error) {
		return error.response;
	}
}