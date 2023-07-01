import React, {
  useState,
  useEffect
} from 'react'
import useMousePosition from '../page/hokMouse'
import mousePointHoc from '../page/mousePoint.js'



// class MousePoint extends React.Component{
// 	constructor(props){
// 		super(props)
// 	}
// 	render(){
// 		return(
// 			<div>
// 				<span>鼠标的x坐标{this.props.positionX}</span>
// 				<span>鼠标的y坐标{this.props.positionY}</span>
// 			</div>
// 		)
// 	}
// }


const Mpoint = () => {
  const mousePosition = useMousePosition()
  return(
    <div>
      <span>鼠标的横坐标{mousePosition.positionX}</span>
      <span>鼠标的纵坐标{mousePosition.positionY}</span>
    </div>
  )
}


export default Mpoint //export default mousePointHoc(MousePoint)