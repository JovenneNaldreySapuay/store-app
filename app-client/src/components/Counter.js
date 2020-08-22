import React, { Component } from "react";

class Counter extends Component {
  
  state = {
    value: this.props.productQuantity
  }

  increment = (e) => {
    e.preventDefault();

    this.setState(
      prevState => ({
        value: Number(prevState.value) + 1
      }), () => {

        // this.props.updateQuantity(this.state.value);

      }
    );
  }

  decrement = (e) => {
    e.preventDefault();

    if (this.state.value <= 1) {

      return this.state.value;

    } else {

      this.setState(
        prevState => ({
          
          value: Number(prevState.value) - 1

        }), () => {

          // this.props.updateQuantity(this.state.value);

        }
      );
    }
  }

  feed = (e) => {
    this.setState(
      {
        value: this.refs.feedQty.value
      }, () => {

        // this.props.updateQuantity(this.state.value);
        
      }
    );
  }

  resetQuantity = () => {
    this.setState({
      value: 1
    });
  }

  render() {
    return (
      <div className="stepper-input">
        <button
        onClick={this.decrement}
        className="decrement font-semibold bg-gray-500 text-white px-1" 
        >
          –
        </button>
        <input
          ref="feedQty"
          type="number"
          style={{ width: 60 }}
          className="quantity border border-gray-500 px-1"
          value={this.state.value}
          onChange={this.feed}
        />
        <button 
        onClick={this.increment}
        className="increment font-semibold bg-gray-500 text-white px-1" 
        >
          +
        </button>
      </div>
    );
  }
}

export default Counter;