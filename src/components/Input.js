// Ceci n'est pas un commentaire

import React from 'react'

const Input = (props) => {
	
	function handleChange(event) {

		event.persist();

		props.callback(event.target.value)

	}

	return <input className="form-control" onChange={ (event) => handleChange(event) } />
				
}
 
export default Input;