import React, { Component } from "react";
import Form from "./common/Form";

class PriceFilter extends Component {
  state = {
    data: {},
  };

  render() {
    return (
      <div className="container">
        <div>
          <span>Price</span>
        </div>
        <form
          className="form-inline"
          onSubmit={() => {
            this.props.onPriceSelect(this.state.data);
          }}
        >
          <input
            type="text"
            className="form-control form-inline-item "
            placeholder="Min"
            size="2"
            value={this.state.data.min}
          />

          <input
            type="text"
            className="form-control form-inline-item ml-3 "
            size="2"
            placeholder="Max"
            value={this.state.data.max}
          />
          <button type="submit" className="btn btn-primary ml-1">
            Go
          </button>
        </form>
      </div>
    );
  }
}
export default PriceFilter;
