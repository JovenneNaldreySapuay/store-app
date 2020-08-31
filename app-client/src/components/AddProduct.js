import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { 
	Editor, 
	EditorState 
} from 'draft-js';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
	Link, 
	Redirect 
} from 'react-router-dom';

import { addProduct } from '../actions/product';

class AddProduct extends Component {

	state = {
		data: {
			title: '',
			slug: '',
			description: EditorState.createEmpty(),
			price: '',
			category: '',
			rating: 0,
			stock: 0,
			image: '',
		},
		loading: false,
		redirect: false,
		errors: {}
	};

	handleOnSubmit = (e) => {

		e.preventDefault();

		const errors = this.validate(this.state.data);

	    this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		if (isValid) { 
			
			const { data: { 
					title, 
					slug,
					description, 
					price, 
					category, 
					rating, 
					stock, 
					image
					} 
				  } = this.state;
			
			// console.log("Product", this.state);

			const info = {
				title,
				slug,
				price,
				category,
				rating,
				stock,
				image,
				description: description.getCurrentContent().getPlainText('\u0001')
			};

			console.log("Product Info", info);
	
			this.props.addProduct(info);

			this.setState({ 
				loading: true,
				redirect: true
			});
		}
	};

	handleOnChange = (e) => {
		
		if (!!this.state.errors[e.target.name]) {

			let errors = Object.assign({}, this.state.errors);
					
			delete errors[e.target.name];

			this.setState({
				errors,
				data: {
					...this.state.data,
					[e.target.name]: e.target.value
				}
			});
		} else {
			this.setState({ 
				data: {
					...this.state.data,
					[e.target.name]: e.target.value
				}
			});
		}
	}

	handleEditorChange = (description) => {
		this.setState({ 
			data: {
				...this.state.data,
				description 
			},
		});
	}

	setEditor = (editor) => {
      this.editor = editor;
    };

    focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };

    componentDidMount() {
    	this.focusEditor();
  	}


	handleUploadChange = async (e) => {
		const files = e.target.files;
		const formData = new FormData();
		const preset = 'msmbotss';

		formData.append('file', files[0]);
		formData.append('upload_preset', preset);

		try {

			const res = await axios.post('/api/upload', formData ); 
			
			this.setState({
				data: {
					...this.state.data,
					image: res.data.url
				}
			});
		} catch(err) {
			console.log(err);
		}
	}

	validate = (values) => {
    	const formErrors = {};

    	const { title, slug } = this.state.data;

    	if (! title) formErrors.title = "Title is required";
    	if (! slug) formErrors.slug = "Slug is required";
    	// if (! content) formErrors.content = "Content is required";
    	// if (! image) formErrors.image = "Image is required";
    	// if (! category) formErrors.category = "Category is required";
    	// if (! tags) formErrors.tags = "Tags is required";
    	
    	return formErrors;
  	};

  	
	render() {

		const styles = {
			editor: {
				border: '1px solid rgba(34,36,38,.15)',
				minHeight: '10em',
				padding: '10px 15px',
				borderRadius: '4px',
				background: '#fff',
				color: '#4a5568'
			}
		};

	    const { data : { 
	    	title, 
	    	slug,
	    	description, 
	    	price, 
	    	category, 
	    	rating, 
	    	stock, 
	    	image 
	    }, errors, loading, redirect } = this.state;


	  	const InlineError = ({ text }) => (
	  		<span style={{ color: "#ae5856" }}>{text}</span>
		);

		return (
			<React.Fragment>
				
				{this.props.role !== "admin" && <Redirect to="/dashboard" />}

				<div className="w-full bg-white mt-3 sm:pl-64">
					<div className="p-4 text-sm text-gray-800">
						<h1 className="text-4xl text-gray-700 font-bold leading-none mb-8">Add New Product</h1>
					
						<Form onSubmit={ this.handleOnSubmit } loading={ loading } className="sm:w-1/2 w-full product-new">
						<Form.Field error={ !!errors.title }>
							<label htmlFor="title" className="text-gray-600 pb-1 block">Product Title</label>
							<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							name="title"
							id="title"
							value={title}
							placeholder="Enter title here"
							onChange={this.handleOnChange}
							/>
							{errors.title && <InlineError text={errors.title} />}
						</Form.Field>

						<Form.Field error={ !!errors.slug }>
							<label htmlFor="slug" className="text-gray-600 pb-1 block">Slug</label>
							<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							name="slug"
							id="slug"
							value={slug}
							placeholder="Enter slug here"
							onChange={this.handleOnChange}
							/>
							{errors.slug && <InlineError text={errors.slug} />}
						</Form.Field>

						<Form.Field>
							<label htmlFor="description" className="text-gray-600 pb-1 block">Description</label>
							<div className="editor" style={styles.editor} onClick={this.focusEditor}>
								<Editor
								ref={this.setEditor}
								id="description"
								editorState={description}
								onChange={this.handleEditorChange}
								/>
							</div>
						</Form.Field>

						<Form.Field error={ !!errors.price }>
							<label htmlFor="price" className="text-gray-600 pb-1 block">Price</label>
							<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							name="price"
							id="price"
							value={price}
							placeholder="Enter price here"
							onChange={this.handleOnChange}
							/>
							{errors.price && <InlineError text={errors.price} />}
						</Form.Field>

						<Form.Field error={ !!errors.category }>
							<label htmlFor="category" className="text-gray-600 pb-1 block">Category</label>
							<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="text" 
							name="category"
							id="category"
							value={category}
							placeholder="Enter category here"
							onChange={this.handleOnChange}
							/>
							{errors.category && <InlineError text={errors.category} />}
						</Form.Field>

						<Form.Field error={ !!errors.rating }>
							<label htmlFor="rating" className="text-gray-600 pb-1 block">Rating</label>
							<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="number" 
							name="rating"
							id="rating"
							value={rating}
							min="1" 
							max="5"
							placeholder="Enter rating here"
							onChange={this.handleOnChange}
							/>
							{errors.rating && <InlineError text={errors.rating} />}
						</Form.Field>

						<Form.Field error={ !!errors.stock }>
							<label htmlFor="stock" className="text-gray-600 pb-1 block">Stock</label>
							<input
							className="bg-white focus:outline-none border border-gray-300 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							type="number" 
							name="stock"
							id="stock"
							value={stock}
							min="1" 
							max="20"
							placeholder="Enter stock here"
							onChange={this.handleOnChange}
							/>
							{errors.stock && <InlineError text={errors.stock} />}
						</Form.Field>
						
						<Form.Field error={ !!errors.image }>
							<label htmlFor="file" className="text-gray-600 pb-1 block">Product Image</label>
							<input
							  className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
			                  type="file"
			                  id="file"
			                  name="file"
			                  onChange={this.handleUploadChange}
			                />
		        			{errors.image && <InlineError text={errors.image} />}
		        			{image && (
		                  		<img width="100" src={image} alt="Upload Preview" style={{ marginTop: '5px' }}/>
		                	)}
						</Form.Field>
					    
						{ this.props.role === "demo_admin" ? (<button disabled className="bg-blue-500 inline-block w-32 text-white p-2 rounded mt-3">Publish</button>) : (<button className="bg-blue-500 inline-block w-32 text-white p-2 rounded mt-3 text-center">Add Product</button>) }

						<Link to="/admin/products" className="bg-transparent border border-gray-700 inline-block w-16 text-gray-700 p-2 rounded ml-2 mt-3 text-center">Cancel</Link>
						</Form>
						{redirect && ( 
							<Redirect to="/admin/products" /> 
						)}
						
					</div>
				</div>	
			</React.Fragment>
			
		);
	}
}


const mapStateToProps = (state) => ({
	role: state.auth.role
});

export default connect(mapStateToProps, { addProduct })(AddProduct);
