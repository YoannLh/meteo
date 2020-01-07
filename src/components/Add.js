// Ceci n'est pas un commentaire

import React from 'react'
import axios from 'axios'

const Add = (props) => {

	function handleClick(event) {

		event.preventDefault();

		let background;

		let clear = false;

		const responsesPerTown = []

		axios.get(`https://www.prevision-meteo.ch/services/json/${props.value}`).then(function(response) {

			if(response.data.current_condition.condition === "Ensoleillé" 
				|| response.data.current_condition.condition === "Eclaircies") {
					background = "backgroundDay"
			} 
			if(response.data.current_condition.condition === "Averses de pluie faible"  
				|| response.data.current_condition.condition === "Averse de pluie modérée" 
				|| response.data.current_condition.condition === "Averse de pluie forte" 
				|| response.data.current_condition.condition === "Couvert avec averses" 
				|| response.data.current_condition.condition === "Pluie faible" 
				|| response.data.current_condition.condition === "Pluie forte" 
				|| response.data.current_condition.condition === "Pluie modérée"
				|| response.data.current_condition.condition === "Stratus" 
				|| response.data.current_condition.condition === "Ciel voilé"  
				|| response.data.current_condition.condition === "Faibles passages nuageux" 
				|| response.data.current_condition.condition === "Brouillard" 
				|| response.data.current_condition.condition === "Stratus" 
				|| response.data.current_condition.condition === "Stratus se dissipant"   
				|| response.data.current_condition.condition === "Faiblement nuageux" 
				|| response.data.current_condition.condition === "Fortement nuageux" 
				|| response.data.current_condition.condition === "Développement nuageux" ) {
					background = "backgroundRainyOrCloudy"
			}
			if(response.data.current_condition.condition === "Faiblement orageux"  
				|| response.data.current_condition.condition === "Orage modéré" 
				|| response.data.current_condition.condition === "Fortement orageux") {
					background = "backgroundStorming"
			}
			if(response.data.current_condition.condition === "Neige faible" 
				|| response.data.current_condition.condition === "Averses de neige faible"  
				|| response.data.current_condition.condition === "Neige modérée" 
				|| response.data.current_condition.condition === "Neige forte" 
				|| response.data.current_condition.condition === "Pluie et neige mêlée faible" 
				|| response.data.current_condition.condition === "Pluie et neige mêlée modérée" 
				|| response.data.current_condition.condition === "Pluie et neige mêlée forte") {
					background = "backgroundSnowing"
			}
			if(response.data.current_condition.condition === "Nuit claire"
				|| response.data.current_condition.condition === "Nuit légèrement voilée"
				|| response.data.current_condition.condition === "Nuit nuageuse"
				|| response.data.current_condition.condition === "Nuit avec développement nuageux"
				|| response.data.current_condition.condition === "Nuit claire et stratus"
				|| response.data.current_condition.condition === "Nuit avec averses"
				|| response.data.current_condition.condition === "Nuit faiblement orageuse"
				|| response.data.current_condition.condition === "Nuit avec averse de neige faible") {
					background = "backgroundNight"
			}
		
			responsesPerTown.push( 

				{ town : response.data.city_info.name, 
				weather : response.data.current_condition.condition,
				tmp : response.data.current_condition.tmp,
				background : background }

			)
			
			props.callback( responsesPerTown[0] )
					
			console.log(response)

			console.log(responsesPerTown)

			clear = true

		})
	
		if(clear === true) {

			props.callbackClear( "" )

			console.log("clear")

			clear = false
		}	
	}

	return <button className="btn btn-info input" onClick={ (event) => handleClick(event)}>Add</button>

}

export default Add;