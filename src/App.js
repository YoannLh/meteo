// Ceci n'est pas un commentaire

import React, { Component } from 'react'
import ReactDOM from "react-dom"
import Input from './components/Input'
import Add from './components/Add'

class App extends Component {

	constructor() {

		super()
		this.receiveInput = this.receiveInput.bind(this);
		this.receiveDataAdd = this.receiveDataAdd.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.state = {

			town : "",
			responsesPerTown : [],
			background : "",
			checkClear : false
		}
	}
	receiveInput(data) {

		this.setState((state) => { 

			return { town : data } 

		})
	}
	receiveDataAdd(data) {

		this.setState((state) => {

			return { responsesPerTown : [...this.state.responsesPerTown, data ], checkClear : true }
		})
	}
	clearInput(clear) {

		this.setState((state) => {

			return { emptyInput : clear }
		})
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

		console.log("changed")
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

		if(this.state.checkClear) {

			this.setState((state) => {

				return { town : "", checkClear : false }
			})
		}
	}
	render() {

		return (

			<div>
				<div className="title">
					<h2>Météo</h2>
					<p>API : https://www.prevision-meteo.ch/services</p>
				</div>
				<form className="row">
					<div className="col-6-lg">
						<Input callback={ this.receiveInput } value={ this.state.town } />
					</div>
					<div className="col-6-lg">
						<Add value={ this.state.town } callback={ this.receiveDataAdd } callbackClear={ this.clearInput } />
					</div>
				</form>
				<div>{ this.renderArray() }</div>
			</div>

		)
	}
}

export default App;