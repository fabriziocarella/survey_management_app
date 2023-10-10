import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACK_URL;

export async function createSurvey(data, token) {
    console.log('data: ', data);
	try {
		const response = await axios({
            url: `${baseUrl}/new_survey`,
			method: "POST",
            headers: { auth: token, type: 'admin'},
			data
		})
		return response
	} catch (error) {
		return error.response;
	}
}