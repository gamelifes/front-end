import { FC } from 'react'

interface DragProps{
		index: number;
		id:string | number;
	
};

const Drag : FC<DragProps> = (props) => {
	const	startDrag = (e) => {
		//获取drag 元素的 index，id 属性，赋值当前
		e.dataTransfer.setData("index",props.index)
		e.dataTransfer.setData("id",prors.id)
	};

	return (
	 <div draggable onDragStart={startDrag} >
	      {props.children}
	  </div>
	);
	
}

export default Drag