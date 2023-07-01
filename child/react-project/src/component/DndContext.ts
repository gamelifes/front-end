import { createContext, FC } from 'react'


//Context 提供了一种在组件之间共享此类值的方式，得益于useContexthook,不必显式地通过组件树的逐层传递 props。
export interface TContext {
	onDragOver: () => void;
	onDragEnd: (index: number, newIndex: number) => void;
}

const DContext = createContext<TContext>({} as TContext);

const DndContext: FC<TContext> = (props) => {
	const DragEnd = (index, newIndex) => { props.onDragEnd(index, newIndex); }
	const DragOve = () => { props.onDragOver(); }
	return (
		<DContext.Provider
		value= {{ onDragEnd: DragEnd(index, newIndex), onDragOver: DragOve() }}>{ props.children } < /DContext.Provider>
	);

};

export { DContext }

export default DndContext