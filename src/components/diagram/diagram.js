import React from 'react';
import go from 'gojs';
import PropTypes from 'prop-types';

class Diagram extends React.Component {

	static propTypes = {
		modelText: PropTypes.string,
		onModelChange: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.renderCanvas = this.renderCanvas.bind(this);
	}

	renderCanvas() {
		let self = this;
		var $ = go.GraphObject.make; // for conciseness in defining templates
		var diagram =
			$(go.Diagram, "myDiagramDiv", // must name or refer to the DIV HTML element
				{
					initialContentAlignment: go.Spot.Center,						// start everything in the middle of the viewport
					"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,		// have mouse wheel events zoom in and out instead of scroll up and down
					// support double-click in background creating a new node		// "clickCreatingTool.archetypeNodeData": { text: "new node" },
					"undoManager.isEnabled": true,									// enable undo & redo

					"layout": $(go.ForceDirectedLayout, { })
				}
			);

		// define the Node template <= from stateChart
		diagram.nodeTemplate = $(go.Node, "Auto",
				new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
				$(go.Shape, "RoundedRectangle", {
					parameter1: 20, // the corner has a large radius
					fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
					stroke: null,
					portId: "", // this Shape is the Node's port, not the whole Node
					cursor: "pointer"
				}),
				$(go.TextBlock, {
						font: "bold 11pt helvetica, bold arial, sans-serif",
						editable: false // editing the text automatically updates the model data
					},
					new go.Binding("text").makeTwoWay()
				)
		);

		// replace the default Link template in the linkTemplateMap
		diagram.linkTemplate = $(go.Link, // the whole link panel
				new go.Binding("points").makeTwoWay(),
				new go.Binding("curviness"),
				$(go.Shape, // the link shape
					{ strokeWidth: 1.5 }),
				$(go.Shape, // the arrowhead
					{ toArrow: "standard", stroke: null }),
				$(go.Panel, "Auto",
					$(go.Shape, // the label background, which becomes transparent around the edges
						{
							fill: $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
							stroke: null
						}),
					$(go.TextBlock, "transition", // the label text
						{
							textAlign: "center",
							font: "9pt helvetica, arial, sans-serif",
							margin: 4,
							editable: true // enable in-place editing
						},
						// editing the text automatically updates the model data
						new go.Binding("text").makeTwoWay())
				)
		);
		
		// notice whenever a transaction or undo/redo has occurred
		if(self.props.onModelChange){
			diagram.addModelChangedListener(function(evt) {
				if (evt.isTransactionFinished) self.props.onModelChange(evt.model);
			});
		}

		this.setState({diagram:diagram});

		try{
			this.setDigramModel(diagram, this.props.modelText)
		}
		catch(e){
			//use try & catch here since nee JSONstringify
		}
	}

	componentDidMount() {
		this.renderCanvas();
	}


	componentWillUpdate(nextProps,nextState) {
		if (this.props !== nextProps && nextProps.modelText) {
			try{
				this.setDigramModel(this.state.diagram, nextProps.modelText)
			}
			catch(e){
				//use try & catch here since nee JSONstringify
				console.log(e);
			}
		}
	}

	setDigramModel(diagram, modelStr){

		let data = JSON.parse(modelStr)
		let model = new go.GraphLinksModel(data.nodeDataArray, data.linkDataArray);
		if (diagram && model) {
			diagram.model = model;
		}
	}

	render() {
		return (
			<div className="diagram-area area">
				<div className="myDiagramDiv" id="myDiagramDiv">
				</div>
			</div>
		);
	}
}

export default Diagram;