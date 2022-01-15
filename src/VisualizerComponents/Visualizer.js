import React from "react";
import "./Visualizer.css";
import { visualizeBubbleSort } from "../SortingAlgorithms/BubbleSort";
import { visualizeMergeSort } from "../SortingAlgorithms/MergeSort";
import { visualizeSelectionSort } from "../SortingAlgorithms/SelectionSort";
import { visualizeQuickSort } from "../SortingAlgorithms/QuickSort";
import { visualizeInsertionSort } from "../SortingAlgorithms/InsertionSort";
import Form from "./Form";

let ARRAY_SIZE = 84;
const SPEED = 5;
const SWAP_COLOR = "#00ff00";
const COMPARING_COLOR = "#ff0000";
const DEFAULT_COLOR = "aqua";
const SORTED_COLOR = "#00ff00";

export default class Visualizer extends React.Component {
  state = {
    array: [],
    sorted: false
  };

  // generate new values for the array
  componentDidMount() {
    this.generateNewArray();
  }

  // way to generate array of random numbers from:
  // https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
  generateNewArray = () => {
    this.setState({
      array: Array.from({ length: ARRAY_SIZE }, () =>
        Math.floor(10 + Math.random() * 460)
      ),
      sorted: false
    });
    // reset color of the bars
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "aqua";
    }
  };

  // if array is sorted, indicate by having all bars turn #06da4f
  componentDidUpdate() {
    if (this.state.sorted) {
      const bars = document.getElementsByClassName("bar");
      for (let i = 0; i < bars.length; i++) {
        setTimeout(() => {
          bars[i].style.backgroundColor = DEFAULT_COLOR;
        }, i * SPEED);
        setTimeout(() => {
          bars[i].style.backgroundColor = SORTED_COLOR;
        }, (i + 3) * SPEED);
      }
    }
  }

  visualizeCompletion(delay) {
    setTimeout(() => {
      this.setState({
        sorted: true
      });
    }, delay);
  }

  handleVisualization(color, type, bars, visualizations, i) {
    if (color) {
      setTimeout(() => {
        bars[visualizations[i][0]].style.backgroundColor = COMPARING_COLOR;
        bars[visualizations[i][1]].style.backgroundColor = COMPARING_COLOR;
      }, i * SPEED);
      setTimeout(() => {
        bars[visualizations[i][0]].style.backgroundColor = DEFAULT_COLOR;
        bars[visualizations[i][1]].style.backgroundColor = DEFAULT_COLOR;
      }, (i + 1) * SPEED);
    } else {
      if (type === "bubble" || type === "selection" || type === "quick") {
        setTimeout(() => {
          bars[
            visualizations[i][0][0]
          ].style.height = `${visualizations[i][0][1]}px`;
          bars[
            visualizations[i][1][0]
          ].style.height = `${visualizations[i][1][1]}px`;
          if (type === "selection" || type === "bubble") {
            bars[visualizations[i][1][0]].style.backgroundColor = SWAP_COLOR;
          }
        }, i * SPEED);
      } else {
        // type is replace
        setTimeout(() => {
          bars[
            visualizations[i][0][0]
          ].style.height = `${visualizations[i][0][1]}px`;
          if (type === "insertion") {
            bars[visualizations[i][0][0]].style.backgroundColor = SWAP_COLOR;
          }
        }, i * SPEED);
      }
    }
  }

  bubbleSort() {
    const visualizations = visualizeBubbleSort(this.state.array);
    for (let i = 0; i < visualizations.length; i++) {
      const bars = document.getElementsByClassName("bar");
      // condition below checks the type of visualization being handled:
      if (!isNaN(visualizations[i][0])) {
        this.handleVisualization(true, "bubble", bars, visualizations, i);
      } else {
        this.handleVisualization(false, "bubble", bars, visualizations, i);
      }
    }
    this.visualizeCompletion((visualizations.length - 1) * SPEED);
  }

  selectionSort() {
    const visualizations = visualizeSelectionSort(this.state.array);
    for (let i = 0; i < visualizations.length; i++) {
      const bars = document.getElementsByClassName("bar");
      // condition below checks the type of visualization being handled:
      if (!isNaN(visualizations[i][0])) {
        this.handleVisualization(true, "selection", bars, visualizations, i);
      } else {
        this.handleVisualization(false, "selection", bars, visualizations, i);
      }
    }
    this.visualizeCompletion((visualizations.length - 1) * SPEED);
  }

  mergeSort() {
    const visualizations = visualizeMergeSort(this.state.array);
    for (let i = 0; i < visualizations.length; i++) {
      const bars = document.getElementsByClassName("bar");
      // condition below checks the type of visualization being handled:
      if (!isNaN(visualizations[i][0])) {
        this.handleVisualization(true, "merge", bars, visualizations, i);
      } else {
        this.handleVisualization(false, "merge", bars, visualizations, i);
      }
    }
    this.visualizeCompletion((visualizations.length - 1) * SPEED);
  }

  quickSort() {
    const visualizations = visualizeQuickSort(this.state.array);
    for (let i = 0; i < visualizations.length; i++) {
      const bars = document.getElementsByClassName("bar");
      // condition below checks the type of visualization being handled:
      if (!isNaN(visualizations[i][0])) {
        this.handleVisualization(true, "quick", bars, visualizations, i);
      } else {
        this.handleVisualization(false, "quick", bars, visualizations, i);
      }
    }
    this.visualizeCompletion((visualizations.length - 1) * SPEED);
  }

  insertionSort() {
    // if the first element in the array is the smallest value
    // then color it gray to indicate sorted portion
    if (this.state.array[0] === Math.min(...this.state.array)) {
      const bars = document.getElementsByClassName("bar");
      setTimeout(() => {
        bars[0].style.backgroundColor = SWAP_COLOR;
      }, SPEED * 2);
    }
    const visualizations = visualizeInsertionSort(this.state.array);
    for (let i = 0; i < visualizations.length; i++) {
      const bars = document.getElementsByClassName("bar");
      // condition below checks the type of visualization being handled:
      if (!isNaN(visualizations[i][0])) {
        this.handleVisualization(true, "insertion", bars, visualizations, i);
      } else {
        this.handleVisualization(false, "insertion", bars, visualizations, i);
      }
    }
    this.visualizeCompletion((visualizations.length - 1) * SPEED);
  }

  sortBy = (algorithm) => {
    if (algorithm === "Selection Sort") this.selectionSort();
    else if (algorithm === "Bubble Sort") this.bubbleSort();
    else if (algorithm === "Insertion Sort") this.insertionSort();
    else if (algorithm === "Merge Sort") this.mergeSort();
    else this.quickSort();
  };

  render() {
    return (
      <div>
        <div className="graph">
          {this.state.array.map((value, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: `${value}px`, backgroundColor: "aqua" }}
            ></div>
          ))}
        </div>
        <div>
          <Form
            generateNewArray={() => this.generateNewArray()}
            sortBy={(algorithm) => this.sortBy(algorithm)}
          />
        </div>
      </div>
    );
  }
}
