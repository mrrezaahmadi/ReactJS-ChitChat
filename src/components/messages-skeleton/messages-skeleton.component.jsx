import React from "react";
import "./messages-skeleton.styles.scss";

const Skeleton = () => {
	return (
		<div className="skeleton">
			<div className="skeleton__avatar"></div>
			<div className="skeleton__author"></div>
			<div className="skeleton__details"></div>
		</div>
	);
};

export default Skeleton;
