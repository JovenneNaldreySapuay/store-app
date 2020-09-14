import React from 'react';

const SearchInput = ({ handleOnChange, handleOnSubmit }) => {

	return (
		<form onSubmit={handleOnSubmit} className="inline-block">
			<div className="flex">
			<input
				className="border px-2"
				type="text"
				name="q"
				placeholder="Search product..."
				autoComplete="off"
				onChange={handleOnChange}
			/>
			<button 
			className="text-white uppercase py-1 px-2 border border-grey-100 font-bold"
			type="submit"
			>Search</button>
			</div>
		</form>
	); 
}

export default SearchInput;