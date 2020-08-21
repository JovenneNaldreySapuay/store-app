import axios from 'axios';
import React, { Component } from 'react';

class ImageUpload extends Component {
	state = {
		name: '', // added recently to get the image name and save to DB
		file: null
	};

	// fileSelectedHandler = event => {

		// console.log("event.target", event.target.files[0].name );

		// let file = event.target.files[0];

		// console.log("file", file );

		// this.setState({	
		// 	file: event.target.files[0]
		// });
	// }

	fileUploadHandler = async (e) => {

		const files = e.target.files;
		const formData = new FormData();
		const preset = 'msmbotss';
	
		formData.append('file', files[0]);
		formData.append('upload_preset', preset);

		try {
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/jovennesapuay/image/upload', formData 
			);

			const imgUrl = res.data.secure_url;
			console.log("imgUrl:", imgUrl );
			console.log("axios response", res.data );

			this.setState({	
				file: res.secure_url
			});

		} catch(err) {

			console.log( err );
		}
		
	}

	renderForm() {
		return (
			<div>
				<input type="file" id="file" name="file" onChange={this.fileUploadHandler} />
				<button>Save Info</button>
			</div>
		);
	}

	render() {
		return (
			<div>
				<h2>Upload Image</h2>
				{this.renderForm()}
			</div>

		); 
	}
}

export default ImageUpload;