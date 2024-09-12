import {useState, useMemo, useEffect, useRef} from 'react';

const Shape = ({data}) => {
	const boxList = useMemo(() => data.flat(Infinity), [data]);
	const columnCount = data[0].length;
	const [selected, setSelected] = useState(new Set());
  
	const [deselecting, setDeselecting] = useState(false);
  
	const timerRef = useRef(null);
  
	const visibleBoxCount = useMemo(() => 
	boxList.reduce((acc, currentVal) => acc + currentVal, 0), [boxList]);
	
	const deselect = () => {
	  const keys = Array.from(selected.keys());
  
	  setDeselecting(true);
	  
	  const removeKeys = () => {
		if(keys.length) {
		  const currentKey = keys.shift();
  
		  setSelected((prev) => {
			const updatedKeys = new Set(prev);
			updatedKeys.delete(currentKey);
			return updatedKeys;
		  })
  
		  timerRef.current = setTimeout(removeKeys, 500)
		} else {
		  setDeselecting(false);
		  clearTimeout(timerRef);
		  timerRef.current = null;
		}
	  }
  
	  timerRef.current = setTimeout(removeKeys, 100);
	}
	useEffect(() => {
	  if(selected.size >= visibleBoxCount) {
		//all boxes are selected
		deselect();
	  }
	}, [selected])
  
	const handleClick = (e) => {
	  const target = e.target;
	  const boxIndex = target.getAttribute('data-index');
	  const boxVisibility = target.getAttribute('data-visibility');
  
	  if(boxIndex === null || !boxVisibility || deselecting || selected.has(Number(boxIndex))) {
		return;
	  }
  
	  console.log('selected')
  
	  setSelected(prev => {
		return(new Set(prev.add(Number(boxIndex))));
	  })
	}
  
	return (
	  <div className="container" 
		style={{"--column-count": columnCount}}
		onClick={handleClick}
	  >
	  {boxList.map((box, index) => {
		const isVisible = box === 1;
		const isSelected = selected.has(index);
		return (
		  <div key={`BOX-${index}`}
			className={`box ${isVisible ? 'visible' : 'hidden'} 
			  ${isSelected && 'selected'} 
			  ${deselecting && 'deselecting'}`} 
			data-index={index}
			data-visibility={isVisible}
		  ></div>
		  
	)})}
	  </div>
	)
  }

export default Shape
  