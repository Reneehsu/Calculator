import React, { Component } from 'react';
import './App.css';
import math from 'mathjs';

class Upper extends Component{
  fieldUpdate(e){
    const newVal = e.target.value;
    //this.props.updateValue(newDig);
    this.props.updateValue(newVal[newVal.length - 1]);
  }
  render() {
    return (
      <div>
        <div className="current">{this.props.current}</div>
        <div><input className="field" value = {this.props.field} onChange = {this.fieldUpdate.bind(this)}></input></div>
      </div>
    )
  }
}

class Lower extends Component{
  render() {
    return (
      <div>
        <div className = "board-row">
          <button className='square operator'>x!</button>
          <button className='square operator'>√</button>
          <button className='square operator'>%</button>
          <button className='square operator' onClick={() => this.props.clearClicked()}>C</button>
        </div>
        <div className = "board-row">
          <button className='square number' onClick={() => this.props.numberClicked(7)}>7</button>
          <button className='square number' onClick={() => this.props.numberClicked(8)}>8</button>
          <button className='square number' onClick={() => this.props.numberClicked(9)}>9</button>
          <button className='square operator' onClick={() => this.props.operatorClicked('÷')}>÷</button>
        </div>
        <div className = "board-row">
          <button className='square number' onClick={() => this.props.numberClicked(4)}>4</button>
          <button className='square number' onClick={() => this.props.numberClicked(5)}>5</button>
          <button className='square number' onClick={() => this.props.numberClicked(6)}>6</button>
          <button className='square operator' onClick={() => this.props.operatorClicked('×')}>×</button>
        </div>
        <div className = "board-row">
          <button className='square number' onClick={() => this.props.numberClicked(1)}>1</button>
          <button className='square number' onClick={() => this.props.numberClicked(2)}>2</button>
          <button className='square number' onClick={() => this.props.numberClicked(3)}>3</button>
          <button className='square operator' onClick={() => this.props.operatorClicked('-')}>-</button>
        </div>
        <div className = "board-row">
          <button className='square number' onClick={() => this.props.numberClicked(0)}>0</button>
          <button className='square number' onClick={() => this.props.numberClicked('.')}>.</button>
          <button className='square operator' onClick={() => this.props.equalClicked()}>=</button>
          <button className='square operator' onClick={() => this.props.operatorClicked('+')}>+</button>
        </div>
        </div>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      field: '0',
      current: 'Ans = 0',
      currentIsAnswer: true,
      fieldIsDefaultOrAns: true,
    }
    this.numberClicked = this.numberClicked.bind(this);
    this.equalClicked = this.equalClicked.bind(this);
    this.clearClicked = this.clearClicked.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.operatorClicked = this.operatorClicked.bind(this);
  }

  updateValue(newDig) {
    // this.setState({
    //   field: newVal,
    // })

    if (newDig === '*') {
        this.operatorClicked('×');
    } else if (newDig === '/') {
        this.operatorClicked('÷');
    } else if (newDig === '=') {
        this.equalClicked();
    } else if (newDig === '+' || newDig === '-'){
        this.operatorClicked(newDig);
    } else {
        this.numberClicked(newDig);
    }
  }

  numberClicked(num){
    if (this.state.fieldIsDefaultOrAns){
        const fieldSaved = this.state.field;
        this.setState({
          field: num.toString(),
          fieldIsDefaultOrAns: false,
          current: 'Ans = ' + fieldSaved,
        })
    } else {
        let newField = this.state.field.toString() + num.toString();
        this.setState({
          field: newField,
        })
    }
  }

  operatorClicked(oper){
    if (!this.state.currentIsAnswer) {
      const updatedCurrent = 'Ans = ' + this.state.field;
      this.setState({
        current: updatedCurrent,
        currentIsAnswer: true,
      })
    }

    if (this.state.fieldIsDefaultOrAns){
      this.setState({
        fieldIsDefaultOrAns: false,
      })
    }

    let newField = this.state.field.toString() + oper.toString();
    this.setState({
      field: newField,
    })
  }

  equalClicked(){
    const fieldSaved = this.state.field;
    let mod = fieldSaved.replace(/×/g,'*');
    mod = mod.replace(/÷/g,'/');
    mod = mod.replace(/√/g, 'sqrt')
    const newField = math.eval(mod);
    this.setState({
      field: newField,
      current: fieldSaved + '=',
      currentIsAnswer: false,
      fieldIsDefaultOrAns: true,
    })
  }

  clearClicked(){
    if (!this.state.currentIsAnswer) {
      const updatedCurrent = 'Ans = ' + this.state.field;
      this.setState({
        current: updatedCurrent,
        currentIsAnswer: true,
      })
    }

    this.setState({
      field: '0',
      fieldIsDefaultOrAns: true,
    })
  }

  render() {
    return (
      <div className="App">
        <Upper current={this.state.current} field={this.state.field} updateValue={this.updateValue}/>
        <Lower numberClicked={this.numberClicked} equalClicked={this.equalClicked} clearClicked={this.clearClicked} operatorClicked={this.operatorClicked}/>
      </div>
    )
  }
}

export default App;
