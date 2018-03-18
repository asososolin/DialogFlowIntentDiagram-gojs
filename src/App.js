import React, { Component } from 'react';
import './App.css';

import DiagramIndex from './components/diagram'

import intents from './defaultData/intents.js'
import diagramModel from './defaultData/diagramModel.js'

class App extends Component {
	render() {

		let DIAGRAME_PARAM = {};

		DIAGRAME_PARAM.dataStr = JSON.stringify(diagramModel, null, 4);
		DIAGRAME_PARAM.intentStr = JSON.stringify(intents, null, 4);

		return ( 
			<div className ="App">
				<DiagramIndex {...DIAGRAME_PARAM}/>
			</div>
		);
	}
}

export default App;