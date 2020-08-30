import axios from 'axios';

export default {
	user: {
		login: (credentials) => 
			axios.post(
				"/api/auth", 
				{ credentials })
			.then(res => res.data.user),
		signup: (user) => 
			axios.post(
				"/api/users", 
				{ user })
			.then(res => res.data.user),
		confirm: (token) => 	
			axios.post(
				"/api/auth/confirmation", 
				{ token })
			.then(res => res.data.user),
		resetPasswordRequest: (email) =>			
			axios.post("/api/auth/reset_password_request", 
				{ email }),
		validateToken: (token) => 
			axios.post(
				"/api/auth/validate_token", 
				{ token }),
		resetPassword: (data) =>
			axios.post(
				"/api/auth/reset_password", 
				{ data })
	},
	cart: {
		create: (values) => 
			axios.post(
				"/api/carts", 
				{ values })
			.then(res => res.data.values),	
	},	
	product: {
		getProduct : (id) => 
		axios.get(`/api/products/${id}`) 
	}	
}