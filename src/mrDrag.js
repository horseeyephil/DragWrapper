import React from 'react'

class mrDrag extends React.Component{
    constructor(props){

    super(props)
        this.state = {
            top: 300,
            left: '90%',
            diffX: null,
            diffY: null
        }
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDragStart = this.handleDragStart.bind(this)
    }

    handleDrag(event){
  
        const moveY = event.clientY - this.state.diffY
        const moveX = event.clientX - this.state.diffX
        

        //if(moveY+event.target.getBoundingClientRect().height<=event.target.parentElement.clientHeight && moveY>=0) stateObject.top = moveY
        //if(moveX+event.target.getBoundingClientRect().width<=event.target.parentElement.clientWidth && moveX>=0) stateObject.left = moveX

        const left = moveX < 0 ? 0 : Math.min(moveX, event.target.parentElement.clientWidth - event.target.getBoundingClientRect().width)
        const top = moveY < 0 ? 0 : Math.min(moveY, event.target.parentElement.clientHeight - event.target.getBoundingClientRect().height)
         
        if((event.clientX || event.clientY)) this.setState({left, top})

        this.props.providedCB('providedCB', this.state.left,this.state.top)
    }
  
    handleDragStart(event){
  
      this.setState({diffX: event.clientX - event.target.offsetLeft, diffY: event.clientY - event.target.offsetTop})
      return false
    }

    render(){
        return(
            <div draggable style={{borderWidth: '10px', borderStyle: 'solid', borderImage: 'repeating-linear-gradient(to right, #e66465, #9198e5) 30 20 / 1 1', backgroundColor: 'whitesmoke', position:'absolute', top:this.state.top, left: this.state.left}}
                onDragStart={this.handleDragStart} onDrag={this.handleDrag}
            >
                Drag me!
            </div>
        )
    }

}

export default mrDrag