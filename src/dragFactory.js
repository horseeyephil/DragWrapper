import React from 'react'
import ReactDOM from 'react-dom'
import DragPiece from './DragPiece'

import perimeterFinderUtility from './utilityReduce'

const dragMaker = (providedPosition, providedCB) => {

    const dragFunction = providedPosition === 'fixed' ? (
        function(event) {
            const moveY = event.clientY - this.state.diffY
            const moveX = event.clientX - this.state.diffX
            
            if((event.clientX || event.clientY)){ event.target.style.top = moveY+'px'; event.target.style.left = moveX+'px' 
            }
            providedCB('providedCB', event.target.clientWidth)
        })

    :   function(event) {

        const moveY = event.clientY - this.state.diffY
        const moveX = event.clientX - this.state.diffX

        const left = moveX < this.cachedPerimeters.leftFence ? this.cachedPerimeters.leftFence : Math.min(moveX, event.target.offsetParent.clientWidth - this.cachedPerimeters.rightFence )//+ this.furthestObject.furthestRight.offsetLeft))
        const top = moveY < this.cachedPerimeters.topFence ? this.cachedPerimeters.topFence : Math.min(moveY, event.target.offsetParent.clientHeight - this.cachedPerimeters.bottomFence )//+ this.furthestObject.furthestBottom.offsetTop))
        
        if((event.clientX || event.clientY)) {event.target.style.top = top+'px'; event.target.style.left = left+'px' 
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
                hasBeenDragged: false,
                furthestMembers: null
            }

            this.dragFunction = dragFunction.bind(this)
        }

        componentDidMount(){

            const theNode = ReactDOM.findDOMNode(this.myRef)

            // if(theNode.children.length) {
                
            //     const perimeters = perimeterFinderUtility(theNode.children)

            //     this.cachedPerimeters = 
            //         {leftFence: perimeters.furthestLeft.offsetLeft || 0,
            //         rightFence: theNode.offsetParent.clientWidth - perimeters.furthestRight.getBoundingClientRect().width,
            //         topFence: 0 - perimeters.furthestTop.offsetTop,
            //         bottomFence: theNode.offsetParent.clientHeight - perimeters.furthestBottom.getBoundingClientRect().height
            //         }
            // }

            // else {
                this.cachedPerimeters = 
                    {leftFence: 0,
                    rightFence: theNode.getBoundingClientRect().width,
                    topFence: 0,
                    bottomFence: theNode.getBoundingClientRect().height,
                    }
            //}


            theNode.setAttribute('draggable', true)
            theNode.addEventListener('drag', this.dragFunction)
            
            theNode.addEventListener('dragstart', event=>{

                if(!this.state.hasBeenDragged){
                    theNode.style.position = providedPosition
                    this.setState({hasBeenDragged:true})
                }

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


