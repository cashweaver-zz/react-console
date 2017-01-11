import React, { Component, PropTypes } from 'react';
import History from './../History';
import './Console.css';

class Console extends Component {
  constructor(props) {
    super(props);

    this.keyCodes = {
      modifiers: [
        'AltRight',
        'AltLeft',
        'ControlRight',
        'ControlLeft',
      ],
      arrows: [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
      ],
    };

    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    let initialCommand = '';
    if ('initialCommand' in props) {
      initialCommand = props.initialCommand;
    }

    this.state = {
      commands: [initialCommand].concat(props.history.commands),
      commandIndex: 0,
    };
  }

  componentDidMount() {
    this.consoleElement.addEventListener('keydown', this.handleKeydown);
    this.consoleElement.addEventListener('click', this.handleClick);
  }

  componentWillUpdate() {
    this.scrollWithNewInput();
  }

  componentWillUnmount() {
    this.consoleElement.removeEventListener('keydown', this.handleKeydown);
    this.consoleElement.removeEventListener('click', this.handleClick);
  }

  scrollWithNewInput() {
    this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
  }

  handleClick() {
    this.consoleElement.focus();
  }

  handleKeydown(e) {
    if (e.code === 'Enter') {
      this.handleSubmit();
    } else if (e.code === 'Backspace') {
      this.handleBackspace();
    } else if (this.keyCodes.modifiers.includes(e.code)) {
      this.handleModifier(e);
    } else if (this.keyCodes.arrows.includes(e.code)) {
      this.handleArrow(e);
    } else {
      const newCommands = this.state.commands;
      newCommands[this.state.commandIndex] += e.key;
      this.setState({
        commands: newCommands,
      });
    }
  }

  handleArrow(e) {
    if (e.code === 'ArrowLeft') {
      // TODO
    } else if (e.code === 'ArrowRight') {
      // TODO
    } else if (e.code === 'ArrowUp') {
      if (this.state.commandIndex < this.state.commands.length - 1) {
        this.setState({
          commandIndex: this.state.commandIndex + 1,
        });
      }
    } else if (e.code === 'ArrowDown') {
      if (this.state.commandIndex > 0) {
        this.setState({
          commandIndex: this.state.commandIndex - 1,
        });
      }
    }
  }

  handleModifier() {
    // TODO
  }

  handleBackspace() {
    const newCommands = this.state.commands;
    const curCommand = newCommands[this.state.commandIndex];
    newCommands[this.state.commandIndex] = curCommand.substring(0, curCommand.length - 1);
    this.setState({
      commands: newCommands,
    });
  }

  handleSubmit() {
    this.props.runCommand(this.state.commands[this.state.commandIndex]);
    this.setState({
      commands: [''].concat(this.state.commands),
    });

    this.setState({
      commandIndex: 0,
    });
  }

  render() {
    return (
      <div
        ref={(el) => { this.consoleElement = el; }}
        className="console"
        tabIndex={0}
      >
        <ul>
          <History
            {...this.props.history}
            promptPrefix={this.props.promptPrefix}
          />
          <li className="prompt">
            <span className="prefix">{this.props.promptPrefix}</span>
            <span className="command">{this.state.commands[this.state.commandIndex]}</span>
          </li>
        </ul>
      </div>
    );
  }
}

Console.propTypes = {
  history: PropTypes.object.isRequired,
  promptPrefix: PropTypes.string.isRequired,
  initialCommand: PropTypes.string,
  runCommand: PropTypes.func,
};

export default Console;
