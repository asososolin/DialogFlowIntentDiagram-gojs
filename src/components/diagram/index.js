import React from 'react';
import './index.css';

import Diagram from './diagram.js'

class DiagramIndex extends React.Component {

	static propTypes = {};
	constructor(props) {
		super(props);
		
		this.state = {
			modelText: props.dataStr || "",
			intentsJson : props.intentStr || "",
		};

		this.setStateModelText = this.setStateModelText.bind(this);
		this.setStateInstentJson = this.setStateInstentJson.bind(this);
		this.updateStateModelTextFromDiagram = this.updateStateModelTextFromDiagram.bind(this);
		this.generateModleFromIntent = this.generateModleFromIntent.bind(this);

	}

	setStateModelText(arg){
		let _state = Object.assign({}, this.state);
		_state.modelText = arg;
		this.setState(_state);
	}

	setStateInstentJson(arg){
		let _state = Object.assign({}, this.state);
		_state.intentsJson = arg;
		this.setState(_state);
	}

	/***
		直接在gojs重畫的時候會有點問題拖曳圖表之後按鈕將新的model 更新過去
	***/
	updateStateModelTextFromDiagram(){
		let model = this.diagramArea.state.diagram.model;
		let data = {
			nodeDataArray : model.Fe.map(function(item){
				return {
					key : item.key,
					loc : item.loc,
					text : item.text,
					intent : item.intent
				}
			}),
			linkDataArray : model.lf.map(function(item){
				return {
					from : item.from,
					to : item.to,
					text : item.text
				}
			}),
		};

		if(this.state.modelText !== JSON.stringify(data, null, 4)){
			this.setStateModelText(JSON.stringify(data, null, 4));
		}
	}



	generateModleFromIntent(){
		let intents = JSON.parse(this.state.intentsJson)
		let nodeDataArray = intents.map(function(item){
			return {
				key : item.id,
				text : item.name,
				intent : {
					name : item.name,
					action : item.actions
				}

			}
		});
		let linkDataArray = [];

		intents.forEach(function(toNode){
			if(toNode.contextIn && toNode.contextIn.length > 0){
				toNode.contextIn.forEach(function(contextIn){
					let matchFromNodes = intents.filter(function(oneIntent) {
						let matchContextOut = oneIntent.contextOut.find(function(contextOut){
							return contextOut.name == contextIn 
						}) 
						if(matchContextOut){
							return true;
						}
					});

					matchFromNodes.forEach(function(matchFromNode){
						console.log("from:" + matchFromNode.id + " to:" + toNode.id + "  by: " + contextIn);
						linkDataArray.push({
							from : matchFromNode.id ,
							to :  toNode.id,
							text : contextIn
						})

					})

				})

			}
		});
		
		this.setStateModelText(JSON.stringify({nodeDataArray:nodeDataArray, linkDataArray:linkDataArray}, null, 4));

	}

	render() {
		return (

			<div className="diagrame-index">
				<div className="btn-area area">
					<button onClick={ this.updateStateModelTextFromDiagram }>
						update model text from Diagram
					</button>
					<button onClick={ this.generateModleFromIntent }>
						generate from instent 
					</button>
				</div>
				<div className="diagram-part">
					<Diagram 
    					ref={(diagram) => {this.diagramArea = diagram;}}
						modelText = {this.state.modelText}
						// onModelChange = {this.updateCurrentDiagrameModelTextOnChange}
					/>

					<div className="area model-text-area">
						<h5> Diagram Model </h5>
						<textarea
							value =  {this.state.modelText} 
							onChange = {(e) => {this.setStateModelText(e.target.value)}}
						/> 
					</div>
					<div className="area model-text-area">
						<h5> Intents JSON </h5>
						<textarea
							value =  {this.state.intentsJson} 
							onChange = {(e) => {this.setStateInstentJson(e.target.value)}}
						/> 
					</div>
				</div>
			</div>
		);
	}
}

export default DiagramIndex;