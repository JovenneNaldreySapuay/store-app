import React from 'react';

export function EmailInput(props) {
return (
<label>
Email: <input value={props.email} onChange={props.handleChange} />
</label>
);
}

export function TitleInput(props) {
	return (
		<label>
		Title: <input value={props.title} onChange={props.handleChange} />
		</label>
	);
}

export function ContentInput(props) {
	return (
		<label>
		Content: 
		<textarea
		value={props.content}
		onChange={props.handleChange}
		></textarea>
		</label>
	);
}

export default { ContentInput, TitleInput };