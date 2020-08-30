import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Success = () => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}, 100);
	});

	return (
		<div className="text-center p-3 h-screen">
			<Confetti width={width} height={height} numberOfPieces={450} />
        	<h1 className="uppercase font-bold py-5">congrats!</h1>
			<p>Stripe has successfully processed your payment!</p>
		</div>
	);
};

export default Success;