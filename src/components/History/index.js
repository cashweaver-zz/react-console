import React, { Component, PropTypes } from 'react';
import './History.css';


class History extends Component {
  componentWillUpdate() {
    this.historyEl.scrollTop = this.historyEl.scrollHeight;
  }

  ASCIndex(arr, i) {
    return arr.length - i - 1;
  }

  render() {
    return (
      <div
        ref={el => this.historyEl = el}
        className="history"
      >
        {this.props.commands.map((c, i) => (
          <div className="history-item" key={i}>
            <li>{this.props.promptPrefix}{this.props.commands[this.ASCIndex(this.props.commands, i)]}</li>
            <li>{this.props.results[this.ASCIndex(this.props.results, i)]}</li>
          </div>
        ))}
      </div>
    );
  }
}

export default History;
