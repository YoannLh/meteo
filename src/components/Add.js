// Ceci n'est pas un commentaire

import React from 'react'
import axios from 'axios'

const Add = (props) => {

	function handleClick(event) {

		let clearCheck = false;

		event.preventDefault();

		let background;

		let icon;

		const responsesPerTown = []

		axios.get(`https://www.prevision-meteo.ch/services/json/${props.value}`).then(function(response) {

			if(response.data.current_condition.condition === "Ensoleillé" 
				|| response.data.current_condition.condition === "Eclaircies") {
					background = "backgroundDay"
					icon = <i className="fas fa-sun"></i>

			} 
			if(response.data.current_condition.condition === "Averses de pluie faible"  
				|| response.data.current_condition.condition === "Averse de pluie modérée" 
				|| response.data.current_condition.condition === "Averse de pluie forte" 
				|| response.data.current_condition.condition === "Couvert avec averses" 
				|| response.data.current_condition.condition === "Pluie faible" 
				|| response.data.current_condition.condition === "Pluie forte" 
				|| response.data.current_condition.condition === "Pluie modérée" ) {
					background = "backgroundRainyOrCloudy"
					icon = <i className="fas fa-cloud-showers-heavy"></i>
			}	
			if(response.data.current_condition.condition === "Stratus" 
				|| response.data.current_condition.condition === "Ciel voilé"  
				|| response.data.current_condition.condition === "Faibles passages nuageux" 
				|| response.data.current_condition.condition === "Brouillard" 
				|| response.data.current_condition.condition === "Stratus" 
				|| response.data.current_condition.condition === "Stratus se dissipant"   
				|| response.data.current_condition.condition === "Faiblement nuageux" 
				|| response.data.current_condition.condition === "Fortement nuageux" 
				|| response.data.current_condition.condition === "Développement nuageux" ) {
					background = "backgroundRainyOrCloudy"
					icon = <i className="fas fa-cloud"></i>
			}
			if(response.data.current_condition.condition === "Faiblement orageux"  
				|| response.data.current_condition.condition === "Orage modéré" 
				|| response.data.current_condition.condition === "Fortement orageux") {
					background = "backgroundStorming"
					icon = <i className="fas fa-bolt"></i>
			}
			if(response.data.current_condition.condition === "Neige faible" 
				|| response.data.current_condition.condition === "Averses de neige faible"  
				|| response.data.current_condition.condition === "Neige modérée" 
				|| response.data.current_condition.condition === "Neige forte" 
				|| response.data.current_condition.condition === "Pluie et neige mêlée faible" 
				|| response.data.current_condition.condition === "Pluie et neige mêlée modérée" 
				|| response.data.current_condition.condition === "Pluie et neige mêlée forte") {
					background = "backgroundSnowing"
					icon = <i className="far fa-snowflake"></i>
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
					icon = <i className="far fa-moon"></i>
			}
		
			responsesPerTown.push( 

				{ town : response.data.city_info.name, 
				weather : response.data.current_condition.condition,
				icon : icon,
				tmp : response.data.current_condition.tmp,
				background : background }

			)
			
			props.callback( responsesPerTown[0] )
					
			console.log(response)

			console.log(responsesPerTown)

			clearCheck = true

			if(clearCheck === true) {

				props.callbackClear( "" )
	
				console.log("clear")

				clearCheck = false
			}

		})	
	}

	return <button className="btn btn-info input" onClick={ (event) => handleClick(event)}>Add</button>

}

export default Add;