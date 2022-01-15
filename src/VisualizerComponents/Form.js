import React from "react";
import "./Form.css";

export default class Form extends React.Component {
  state = {
    sortingAlgorithm: "Selection Sort"
  };

  handleSelect = (event) => {
    this.setState({
      sortingAlgorithm: event.target.value
    });
    this.props.generateNewArray();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sortBy(this.state.sortingAlgorithm);
    this.setState({
      showUI: false
    });
  };

  render() {
    return (
      <div className="ui">
        <div>
          <p className="title">SORTING ALGORITHM VISUALIZER</p>
        </div>
        <div>
          <button
            className="generateButton"
            onClick={this.props.generateNewArray}
          >
            Generate New Array
          </button>
        </div>
        <form className="selectForm" onSubmit={this.handleSubmit}>
          <p className="selectTitle">Select a Sorting Algorithm</p>
          <div className="options">
            <select
              value={this.state.sortingAlgorithm}
              onChange={this.handleSelect}
              className="dropdown"
            >
              <option className="dropdown">Selection Sort</option>
              <option className="dropdown">Bubble Sort</option>
              <option className="dropdown">Insertion Sort</option>
              <option className="dropdown">Merge Sort</option>
              <option className="dropdown">Quick Sort</option>
            </select>
          </div>
          <div>
            <button type="submit" className="startButton">
              Start Sorting
            </button>
          </div>
        </form>
      </div>
    );
  }
}
