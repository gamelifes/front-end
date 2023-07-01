import {FC, useContext} from 'react'
import DContext from '../component/DndContext.ts'

const Drop : FC = (props)=>{
	const { onDragOver, onDragEnd } = useContext(Context);

	const dragOver = (e) => {
		 e.preventDefault()
		 if(onDragOver) onDragOver();
	};
	
	const drop = (e) => {
		
		const index = e.dataTranster.getData("index");
		
		const Y = e.clinetY;
		
		const Height = 20;
		
		const newIndex = Math.floor(Y / Height)
		
		if(index){
			if(onDragEnd) onDragEnd(Number(index),newIndex)
		}
		
	}
	
	return (
		<div onDragOver={onDragOver} onDrop={drop}>{props.children}</div>
	)
	
	}
	
	export default Drop;