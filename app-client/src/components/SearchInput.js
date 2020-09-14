import React from 'react';

const SearchInput = ({ handleOnChange, handleOnSubmit }) => {

	return (
		<form onSubmit={handleOnSubmit} className="inline-block">
			<div className="flex">
			<input
				style={{width:300}}
				className="border px-2 py-2"
				type="text"
				name="q"
				placeholder="Search product..."
				autoComplete="off"
				onChange={handleOnChange}
			/>
			<button 
			className="text-white uppercase py-1 px-5 border border-white font-bold"
			type="submit"
			>
			<svg className="shopee-svg-icon search-svg-icon" height="19" viewBox="0 0 19 19" width="19"><g fillRule="evenodd" stroke="none" strokeWidth="1"><g transform="translate(-1016 -32)"><g><g transform="translate(405 21)"><g transform="translate(611 11)"><path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></path><path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></path></g></g></g></g></g></svg>
			</button>
			</div>
		</form>
	); 
}

export default SearchInput;