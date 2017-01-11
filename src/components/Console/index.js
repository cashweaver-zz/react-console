import React, { Component } from 'react';
import './Console.css';

class Console extends Component {
  render() {
    return (
      <div className="console">
        <h1>Console</h1>
        <div className="history">
          <ul>
            {this.props.history.map((item, i) => (
              <div className="history-item" key={i}>
                <li>{this.props.promptPrefix}{item.command}</li>
                <li>{item.output}</li>
              </div>
            ))}
          </ul>
        </div>
        <div className="prompt">
          <span className="prefix">{this.props.promptPrefix}</span>
          <span className="command"></span>
        </div>
      </div>
    );
  }
}

export default Console;
