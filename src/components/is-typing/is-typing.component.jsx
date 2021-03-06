import React, { Component } from "react";
import "./is-typing.styles.scss";

export class IsTyping extends Component {
	render() {
		return (
			<div className="typing">
				<div className="typing__dot"></div>
				<div className="typing__dot"></div>
				<div className="typing__dot"></div>
			</div>
		);
	}
}

export default IsTyping;
