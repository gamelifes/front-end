import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './public-path';
	
let root

function render(props) {
  const { container } = props;
 //  root = ReactDOM.createRoot()
   ReactDOM.render(
	 <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/myreact-app' : '/'}>
	   <React.StrictMode>
	     <App />
	   </React.StrictMode>
	 </BrowserRouter>,container
     ? container.querySelector('#root')
     : document.querySelector('#root')
   )
 
}
// function render(props) {
//   const { container } = props;
//   ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
// }
function storeTest(props) {
  props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  });
}


//独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}


export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
	setTimeout(()=>{
	 props.setLoading(false);
	},1000)
	storeTest(props);
  render(props);
	
}

export async function unmount(props) {
  const { container } = props;
	//root.unmount();
	//! [react18]
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
export async function update(props) {
  console.log('update props', props);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
