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
        'ShiftLeft',
        'ShiftRight',
      ],
      arrows: [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
      ],
      ignored: [
        'CapsLock',
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
      cursorIndex: 0,
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

  isShiftKey(keyCode) {
    return (
      keyCode === 'ShiftLeft'
      || keyCode === 'ShiftRight'
    );
  }

  isEnterKey(keyCode) {
    return (
      keyCode === 'Enter'
    );
  }

  isBackspaceKey(keyCode) {
    return (
      keyCode === 'Backspace'
    );
  }

  isModifierKey(keyCode) {
    return this.keyCodes.modifiers.includes(keyCode);
  }

  isArrowKey(keyCode) {
    return this.keyCodes.arrows.includes(keyCode);
  }

  isIgnoredKey(keyCode) {
    return this.keyCodes.ignored.includes(keyCode);
  }

  modifyCommand(e) {
    const newCommands = this.state.commands;
    const oldCommand = this.state.commands[this.state.commandIndex];
    const newCommand = `${oldCommand.slice(0, this.state.cursorIndex)}${e.key}${oldCommand.slice(this.state.cursorIndex)}`;
    newCommands[this.state.commandIndex] = newCommand;
    this.setState({
      commands: newCommands,
    });

    this.moveCursorRight();
  }

  handleKeydown(e) {
    console.log(e);

    if (this.isEnterKey(e.code)) {
      this.handleSubmit();
    } else if (this.isBackspaceKey(e.code)) {
      this.handleBackspace();
    } else if (this.isModifierKey(e.code)) {
      this.handleModifier(e);
    } else if (this.isArrowKey(e.code)) {
      this.handleArrow(e);
    } else if (this.isIgnoredKey(e.code)) {
      // Do nothing
    } else {
      this.modifyCommand(e);
    }
  }

  moveCursorLeft() {
    this.setState({
      cursorIndex: (this.state.cursorIndex > 0) ? this.state.cursorIndex - 1 : 0,
    });
  }

  moveCursorRight() {
    this.setState({
      cursorIndex: (this.state.cursorIndex < this.state.commands[this.state.commandIndex].length)
        ? this.state.cursorIndex + 1 : this.state.commands[this.state.commandIndex].length,
    });
  }

  handleArrow(e) {
    if (e.code === 'ArrowLeft') {
      this.moveCursorLeft();
    } else if (e.code === 'ArrowRight') {
      this.moveCursorRight();
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

  handleModifier(e) {
    if (e.key === 'Shift') {
      // Do nothing
    } else if (e.key === 'Alt') {
      // TODO
    } else if (e.key === 'Control') {
      // TODO
    }
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
            <span className="command">
              {this.state.commands[this.state.commandIndex].slice(0, this.state.cursorIndex)}
              <span className="cursor" />
              {this.state.commands[this.state.commandIndex].slice(this.state.cursorIndex)}
            </span>
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
