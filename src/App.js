import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MrDrag from './mrDrag'


const easeType = 'ease-in-out'

const originStyle = {border: '1px solid black', top: 300, position: 'absolute', backgroundColor: 'seagreen' }

const shakedStyle = {border: '1px solid black', top: 300, position: 'absolute', backgroundColor: 'seagreen'  }

const keyF = [ {color: 'orange', transform: 'rotate(0deg)', easing: easeType}, 
               {color: 'orange', transform: 'rotate(-24deg) scale(1.15)', offset: 0.1, easing: easeType} , 
               {color: 'orange', transform: 'rotate(27deg) translateY(-8px) scale(1.15)', offset: 0.15, easing: easeType} , 
               {color: 'whitesmoke', transform: 'rotate(-20deg) translateY(-15px) scale(1.15)', offset: 0.3, easing: easeType} , 
               {color: 'whitesmoke', transform: 'rotate(24deg) translateY(-15px) scale(1.15)', offset: 0.4, easing: easeType} , 
               {color: 'whitesmoke', transform: 'rotate(-26deg) translateY(-15px) scale(1.15)', offset: 0.5, easing: easeType} , 
               {color: 'orange', transform: 'rotate(24deg) scale(1.15)', offset: 0.6, easing: easeType} , 
               {color: 'orange', transform: 'rotate(-28deg)', offset: 0.7, easing: easeType} , 
               {color: 'red', transform: 'rotate(24deg)', offset: 0.8, easing: easeType} , 
               {color: 'red', transform: 'rotate(-5deg)'} , 
              ]


class App extends Component {


  constructor(props){
    super(props)
    this.state = {
      clicked: false
    }
    this.handleClick=this.handleClick.bind(this)
  }

  shake(elem){
    elem.animate(keyF, 2500)
  }

  handleClick(event){
    this.setState({clicked:true})
    this.shake(event.target)
    
  }



  render() {
    return (
      <div className="App">
        <div style={{height: 600, width: 600, backgroundColor: 'palegreen', position: 'absolute', zIndex: -2, border: '5px solid plum', top: 50, left: 50}}         >
        <span onClick={(evt)=>{evt.preventDefault(); this.shake(this.alert)}}>HELLO</span>
        



        <div style={this.state.clicked ? shakedStyle : originStyle} onClick={this.handleClick}
          ref={alert=>{this.alert=alert}}
        >  Click me!  
        </div>
        {this.state.clicked && <div style={{...originStyle, zIndex:-1, opacity: 0.4, backgroundColor: 'grey', transform: 'scale(0.8)'}}>Click me!</div> }
        <MrDrag providedCB={console.log}/>
        </div>

      </div>
    );
  }
}

export default App;