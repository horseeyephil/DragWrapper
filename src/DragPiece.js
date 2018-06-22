import React from 'react'

export default class extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (<React.Fragment>
            <div style={{width: 200, height: 200, border: '1px solid', borderRadius: 24, position: 'fixed'}}>
            <div style={{width :500, height: 2, backgroundColor: 'black', left: -100, position: 'absolute'}}></div>
            <div style={{borderWidth: '10px', borderStyle: 'solid', borderImage: 'repeating-linear-gradient(to right, red, violet) 30 20 / 1 1', backgroundColor: 'whitesmoke', position:'absolute', left:50, top: 50 }}> Another Piece 
            </div>
            </div>
            <button></button></React.Fragment>)
    }
}