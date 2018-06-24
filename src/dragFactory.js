import React from 'react'
import ReactDOM from 'react-dom'
import DragPiece from './DragPiece'

const dragMaker = (providedPosition, providedCB) => {

    const dragFunction = providedPosition === 'fixed' ? (
        function(event) {
            const moveY = event.clientY - this.state.diffY
            const moveX = event.clientX - this.state.diffX
            
            const left = moveX < 0 ? 0 - event.target.children[0].offsetLeft : Math.min(moveX, window.innerWidth - event.target.getBoundingClientRect().width )
            const top = moveY < 0 - event.target.offsetTop ? 0 - event.target.children[1].offsetTop : Math.min(moveY, window.innerHeight - event.target.getBoundingClientRect().height)
            
            if((event.clientX || event.clientY)) {console.log('time to set ', left, top); event.target.style.top = top+'px'; event.target.style.left = left+'px' 
            }
    
            providedCB('providedCB', event.target.clientWidth)
        })

    :   function(event) {


        const moveY = event.clientY - this.state.diffY
        const moveX = event.clientX - this.state.diffX

        const left = moveX < 0 - event.target.children[0].offsetLeft ? 0 - event.target.children[0].offsetLeft : Math.min(moveX, event.target.offsetParent.clientWidth - event.target.getBoundingClientRect().width )
        const top = moveY < 0 - event.target.children[1].offsetTop ? 0 - event.target.children[1].offsetTop : Math.min(moveY, event.target.offsetParent.clientHeight - event.target.getBoundingClientRect().height)
        
        if((event.clientX || event.clientY)) {console.log('time to set ', left, top); event.target.style.top = top+'px'; event.target.style.left = left+'px' 
        }

        providedCB('providedCB', event.target.clientWidth)
    }
        
   ////////// 

    return (WrappedComponent) => {

    return ( 
    class ModDrag extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                top: null,
                left: null,
                diffX: null,
                diffY: null,
                hasBeenDragged: false
            }
            this.handleDrag = this.handleDrag.bind(this)
            this.handleDragStart = this.handleDragStart.bind(this)
            this.dragFunction = dragFunction.bind(this)
        }


        handleDragStart(event){
      
            console.log('You started a drag!', event.target)
          this.setState({diffX: event.clientX - event.target.offsetLeft, diffY: event.clientY - event.target.offsetTop})
          return false
        }

        handleDrag(event){
  
            const moveY = event.clientY - this.state.diffY
            const moveX = event.clientX - this.state.diffX
            //if(moveY+event.target.getBoundingClientRect().height<=event.target.parentElement.clientHeight && moveY>=0) stateObject.top = moveY
            //if(moveX+event.target.getBoundingClientRect().width<=event.target.parentElement.clientWidth && moveX>=0) stateObject.left = moveX
            const left = moveX < 0 ? 0 : Math.min(moveX, event.target.offsetParent.clientWidth - event.target.getBoundingClientRect().width)
            const top = moveY < 0 ? 0 : Math.min(moveY, event.target.offsetParent.clientHeight - event.target.getBoundingClientRect().height)
             
            if((event.clientX || event.clientY)) this.setState({left, top})
    
            providedCB('providedCB', event.target.clientWidth)
        }

        componentDidMount(){

            const theNode = ReactDOM.findDOMNode(this.myRef)
            console.log('findDom', theNode)

            theNode.setAttribute('draggable', true)
            theNode.addEventListener('drag', this.dragFunction)
            
            theNode.addEventListener('dragstart', event=>{
                if(!this.state.hasBeenDragged){
                    theNode.style.position = providedPosition
                    this.setState({hasBeenDragged:true})
                }
                console.log('You started a drag!', event.target.offsetLeft)
                this.setState({diffX: event.clientX - event.target.offsetLeft , diffY: event.clientY - event.target.offsetTop})
                return false
            })
        }

        render(){
            
            return (
            <WrappedComponent ref={myRef=>{this.myRef=myRef}} />
            )
                
        }
    }
    )
}
}

export default dragMaker('absolute', console.log)(DragPiece)


