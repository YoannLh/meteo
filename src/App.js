// Ceci n'est pas un commentaire

// ligne 117 : <div className="dataInResponse">{ town.icon }</div>

import React, { Component } from 'react'
import ReactDOM from "react-dom"
import Input from './components/Input'
import axios from 'axios'
import Responses from './components/Responses'

class App extends Component {

	constructor() {

		super()
		this.receiveInput = this.receiveInput.bind(this);
		this.state = {

			town : "",
			responsesPerTown : [],
			background : "",
			emptyInput : ""
		}
	}
	receiveInput(data) {

		this.setState((state) => { 

			return { town : data } 

		})
	}
	handleClick(event) {

		let background;

		console.log(this.state.town)

		axios.get(`https://www.prevision-meteo.ch/services/json/${this.state.town}`).then(function(response) {

			if(response.data.current_condition.condition === "Ensoleillé" 
				|| response.data.current_condition.condition === "Eclaircies") {
					background = "backgroundDay"
				} 
				if(response.data.current_condition.condition === "Averses de pluie faible" 
					|| response.data.current_condition.condition === "Nuit avec averses" 
					|| response.data.current_condition.condition === "Averse de pluie modérée" 
					|| response.data.current_condition.condition === "Averse de pluie forte" 
					|| response.data.current_condition.condition === "Couvert avec averses" 
					|| response.data.current_condition.condition === "Pluie faible" 
					|| response.data.current_condition.condition === "Pluie forte" 
					|| response.data.current_condition.condition === "Pluie modérée") {
						background = "backgroundRainyOrCloudy"
				}
				if(response.data.current_condition.condition === "Stratus" 
					|| response.data.current_condition.condition === "Ciel voilé" 
					|| response.data.current_condition.condition === "Nuit légèrement voilée" 
					|| response.data.current_condition.condition === "Faibles passages nuageux" 
					|| response.data.current_condition.condition === "Brouillard" 
					|| response.data.current_condition.condition === "Stratus" 
					|| response.data.current_condition.condition === "Stratus se dissipant" 
					|| response.data.current_condition.condition === "Nuit claire et stratus" 
					|| response.data.current_condition.condition === "Nuit nuageuse" 
					|| response.data.current_condition.condition === "Faiblement nuageux" 
					|| response.data.current_condition.condition === "Fortement nuageux" 
					|| response.data.current_condition.condition === "Développement nuageux" 
					|| response.data.current_condition.condition === "Nuit avec développement nuageux") {
						background = "backgroundRainyOrCloudy"
				}
				if(response.data.current_condition.condition === "Faiblement orageux" 
					|| response.data.current_condition.condition === "Nuit faiblement orageuse" 
					|| response.data.current_condition.condition === "Orage modéré" 
					|| response.data.current_condition.condition === "Fortement orageux") {
						background = "backgroundStorming"
				}
				if(response.data.current_condition.condition === "Neige faible" 
					|| response.data.current_condition.condition === "Averses de neige faible" 
					|| response.data.current_condition.condition === "Nuit avec averse de neige faible" 
					|| response.data.current_condition.condition === "Neige modérée" 
					|| response.data.current_condition.condition === "Neige forte" 
					|| response.data.current_condition.condition === "Pluie et neige mêlée faible" 
					|| response.data.current_condition.condition === "Pluie et neige mêlée modérée" 
					|| response.data.current_condition.condition === "Pluie et neige mêlée forte") {
						background = "backgroundSnowing"
				}
				if(response.data.current_condition.condition === "Nuit claire") {
					background = "backgroundNight"
				}
			
			this.setState(state => { 

				return { 
					
					responsesPerTown : 
						[...this.state.responsesPerTown, 
							{ town : response.data.city_info.name, 
							weather : response.data.current_condition.condition,
							tmp : response.data.current_condition.tmp,
							background : background }
						],
					emptyInput : "added"
				}
			})
			console.log(response)

		}.bind(this));

		background = ""

		console.log(this.state)
	}
	renderArray() {
		
		return this.state.responsesPerTown.map(town => { 
			
			return (

				<div className={ town.background }
					key={ town.town }>
					<div className="dataInResponse">{ town.town }</div>
					<div className="dataInResponse">{ town.weather }</div>
					<div className="dataInResponse">{ town.tmp }<div> °C</div></div>
					<button className="btn btn-link"onClick={() => this.delete(town)}>Delete</button>
				</div>
					
			)	 		
		})
	}
	delete(town) {

		const list = this.state.responsesPerTown;
		const index = list.indexOf(town);
		list.splice(index, 1);

		this.setState({
			responsesPerTown : list
		})
	}
	componentDidUpdate() {

		if(this.state.emptyInput === "added") {

			this.setState({ emptyInput : "" })
		}
	}
	render() {

		return (

			<div>
				<div className="title"><h2>Météo</h2></div>
				<div className="row">
					<div className="col-6-lg">
						<Input value={ this.state.emptyInput } callback={ this.receiveInput } />
					</div>
					<div className="col-6-lg">
						<button className="btn btn-info input" onClick={ (event) => this.handleClick(event) }>Add</button>
					</div>
				</div>
				<div>{ this.renderArray() }</div>
			</div>

		)
	}
}

export default App;