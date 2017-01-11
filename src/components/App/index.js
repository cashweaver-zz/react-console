import React, { Component } from 'react';
import Console from './../Console';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promptPrefix: '$ ',
      history: {
        commands: [],
        results: [],
      },
    }

    this.runCommand = this.runCommand.bind(this);
  }

  runCommand(command) {
    const result = `result of running ${command}`;
    console.log('runCommand', this.state.history);
    this.setState({
      history: {
        commands: [command].concat(this.state.history.commands),
        results: [result].concat(this.state.history.results),
      },
    });
  }

  render() {
    return (
      <div className="app">
        <Console
          history={this.state.history}
          promptPrefix={this.state.promptPrefix}
          runCommand={this.runCommand}
        />
      </div>
    );
  }
}

export default App;
