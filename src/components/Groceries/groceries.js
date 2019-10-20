import React from 'react';
import './groceries.css';
import ReactDOM from 'react-dom';

class Grocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: 'Grocery Items'}; 
  }
  handleClick() {
    let message = 'kyle is a';
    alert(message);
  }
  render() {
    return (
      <h1>
        <button onClick={this.handleClick}>
	  Placeholder
        </button>
      </h1>
    );
  }
}

const Groceries = () => (
  <div>
    <h1>Groceries</h1>
  </div>
);

export default Grocery;
//export default Groceries;
