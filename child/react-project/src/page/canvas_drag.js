			
const canvas_drag = props => {
  const handleDragEnter = e => {
		e.dataTransfer.setData("Text",e.target.id);
   // e.preventDefault();
    //e.stopPropagation();
  };
  const handleDragLeave = e => {
			console.log(e)
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
			console.log(e)
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
			console.log(e)
		var data = e.dataTransfer.getData("Text");
		e.target.appendChild(document.getElementById(data));
    e.preventDefault();
    //e.stopPropagation();
	
		//e.dataTransfer.setData('componentId', componentId)
  };
	const astyle = {
		width:'100vw',
		height:'100vh',
		padding:'10px',
		border:'1px solid #aaaaaa',
		}
  return (
    <div>
      <p id="1"
      className={"drag-drop-zone"}  
			onDragStart={e => handleDragEnter(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
			draggable
			>Drag files here to upload</p>
			<div id="div1" style={{...astyle}}  onDrop={e => handleDrop(e)} onDragOver={e => handleDragOver(e)}></div>
    </div>
		
  );
};
export default canvas_drag