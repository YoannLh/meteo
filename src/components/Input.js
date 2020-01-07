// Ceci n'est pas un commentaire

import React, { Component } from 'react'

class Input extends Component {
	
	handleChange(event) {

		event.persist();

		this.props.callback(event.target.value)

	}
	render() {

		return (

			<div>
				<input 
					className="form-control" 
					placeholder = "Une commune fr..."
					onChange={ (event) => this.handleChange(event) } 
					value={ this.props.value } 
				/>
			</div>

		)

	}
}
 
export default Input;