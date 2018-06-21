import React from 'react'


export const DragPiece = () => (<div style={{borderWidth: '10px', borderStyle: 'solid', borderImage: 'repeating-linear-gradient(to right, red, violet) 30 20 / 1 1', backgroundColor: 'whitesmoke', position:'absolute' }}> Another Piece </div>)

const dragMaker = (WrappedComponent, providedCB, providedPosition) => {

    return ( 
    class ModDrag extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                top: 0,
                left: 0,
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
    
            const left = moveX < 0 ? 0 : Math.min(moveX, event.target.offsetParent.clientWidth - event.target.getBoundingClientRect().width)
            const top = moveY < 0 ? 0 : Math.min(moveY, event.target.offsetParent.clientHeight - event.target.getBoundingClientRect().height)
             
            if((event.clientX || event.clientY)) this.setState({left, top})
    
            providedCB('providedCB', event.target.children[0].clientWidth)
        }
      
        handleDragStart(event){
      
          this.setState({diffX: event.clientX - event.target.offsetLeft, diffY: event.clientY - event.target.offsetTop})
          return false
        }

        render(){
            return (
            <div draggable  onDragStart={this.handleDragStart} onDrag={this.handleDrag} style={{position: providedPosition, top:this.state.top, left: this.state.left}}
            >
            <WrappedComponent />
            </div>)
                
        }
    }
    )
}

export default dragMaker(DragPiece, console.log, 'absolute')

