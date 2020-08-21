import React from 'react';

const SearchInput = ({ handleOnChange, handleOnSubmit }) => {

	return (
		<form onSubmit={handleOnSubmit} className="inline-block">
			<div className="flex">
			<input
				className="border p-2"
				type="text"
				name="q"
				placeholder="Search product..."
				autoComplete="off"
				onChange={handleOnChange}
			/>
			<button 
			className="bg-blue-500 text-white py-1 px-2"
			type="submit"
			>Search</button>
			</div>
		</form>
	); 
}

export default SearchInput;