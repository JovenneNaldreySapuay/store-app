const keys = require('../../config/keys');

module.exports = confirmation => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Welcome to Bookworm. Please confirm your email.</h3>
					
					<p>Confirmation Link here</p>
				</div>
			</body>
		</html>
	`;
};