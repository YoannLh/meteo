// Ceci n'est pas un commentaire

import React from 'react'

const Input = (props) => {
	
	function handleChange(event) {

		props.callback(event.target.value)

		if(props.value === "added") {

			event.target.value = ""

		}
	}

	return <input className="form-control" onChange={ (event) => handleChange(event) } />
				
}
 
export default Input;