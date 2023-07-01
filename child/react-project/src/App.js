import logo from './logo.svg';
import './App.css';
// import CanvasDrag from './page/canvas_drag.js'
// import MousePoint from './page/mouseProsi.js'
// import DndContext from './component/DndContext.ts'
import './cssFiles/btn.css'
//import Drag from './component/Draggable.ts'
//import Drop from './component/Drop.ts'
function App() {
  return (
    <div className="App">
      <header className="App-header">	
				  <div className="cloud" id="cloud-back"></div>
				    <div className="cloud" id="cloud-mid"></div>
				    <div className="cloud" id="cloud-front"></div>    
				
				<svg width="0" height="0"> 
				  <defs>
				    <filter id="filter-back">
				      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" 
				seed="0" />     
				      <feDisplacementMap  in="SourceGraphic" scale="170" />
				    </filter>
				       <filter id="filter-mid">
				        <feTurbulence type="fractalNoise"  baseFrequency="0.012" numOctaves="2" 
				seed="0"/>
				      <feDisplacementMap  in="SourceGraphic" scale="150" />
				    </filter>
				    <filter id="filter-front">
				        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" 
				seed="0"/>
				      <feDisplacementMap  in="SourceGraphic" scale="100" />
				    </filter>
						</defs>
						<defs>
						<filter id="surface">
						  
	
							 <feGaussianBlur stdDeviation="10" result="BLUR"></feGaussianBlur>
								<feColorMatrix
										type="matrix"
										in="BLUR"
										result="DROPSHADOW"
										values="1 0 0 0 0
														0 1 0 0 0
														0 0 1 0 0
														0 0 0 0.5 0"></feColorMatrix>
														
							<feMorphology operator="erode" radius="2" in="SourceGraphic" 
							      result="DILATE" />
							<feFlood floodColor="#303030" floodOpacity="0.5" result="FLOOD" />
							<feComposite operator="in" in="FLOOD" in2="DILATE" />
							<feTurbulence 
									in="SourceGRaphic"
									result="noise"
									type="fractalNoise" 
									baseFrequency="0.05 0.5"
									numOctaves="2"
									stitchTiles="noStitch" 
									seed="0" >
							</feTurbulence>
							<feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="B" yChannelSelector="G"></feDisplacementMap>
							
							{
							 // <feOffset in="SourceAlpha" dx="10" dy="10"></feOffset>
							// <feBlend in="SourceGraphic" in2="BLUR" mode="multiply" result="BLEND"></feBlend>
			
							// <feDiffuseLighting in="SourceGraphic" lighting-color="#ffffff" 
							//    diffuseConstant="5">
							//       <feSpotLight x="680" y="20" z="30" 
							//                 limitingConeAngle="60" 
							//                 pointsAtX="10" pointsAtY="10"
							//                 pointsAtZ="0" />
							//   </feDiffuseLighting>
							// 	<feComposite in="SourceGraphic" operator="arithmetic" k1="1" k2="0"  k3="0" k4="0" />
								// <feSpecularLighting specularExponent="5" lighting-color="#00c2cb"
							 //          surfaceScale="1" in="SourceGraphic" specularConstant="1.5">
							 //          <fePointLight x="570" y="100" z="200" />
							 //        </feSpecularLighting>
							 //  <feComposite in="SourceGraphic" operator="arithmetic" k1="1" k2="0"
							 //          k3="0" k4="0" />
												
							}
						</filter>	
							</defs>
							<defs>
						<filter id='noise'>
						  <feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed="10" stitchTiles='stitch' />
						 <feDisplacementMap  in="SourceGraphic" scale="80" />
						<feGaussianBlur in="grind" stdDeviation=".8"/>
				
						</filter>
						</defs>

						<div className="btn-cloud" filter="url(#noise)" >	</div>
			
				</svg>
				
					<div className="svg-light"></div>
				
						<div className="btn-cloud glass-by-filter" >	</div>

					<div className="btn-sun" onClick={()=>{alert('1')}}></div>
      </header>
    </div>
  );
}

// <DndContext
// 		        onDragEnd={(oldIndex, newIndex) => {
// 		          setData(arrayMove(data, oldIndex, newIndex));
// 		        }}
// 		        onDragOver={() => {}}
// 		      >
// 		        <Drop>
// 		          {data.map((i, index) => (
// 		            <Drag key={i.id} id={i.id} index={index}>
// 		              <div className="item">{i.text}</div>
// 		            </Drag>
// 		          ))}
// 		        </Drop>
// 		      </DndContext>
  // <img src={logo} className="App-logo" alt="logo" />
  //       <p><CanvasDrag></CanvasDrag> <MousePoint></MousePoint>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
export default App;
