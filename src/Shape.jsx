import { useCallback, useEffect, useRef, useState } from "react";
import Queue from "./Queue";

const delay = ms => new Promise(res => setTimeout(res, ms));

export const Shape = ({ data }) => {
  // 	let htmlStyles = window.getComputedStyle(document.querySelector("html"));
  // let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
  // document.documentElement.style.setProperty("--rowNum", 6);
  
  const rowCount = data.length;
  const columnCount = data[0].length;

  const validCellCount = data.flat().filter(item => item !== 0).length

  const [colorArray, setColorArray] = useState(Array(rowCount).fill().map(() => Array(columnCount).fill('transparent')))
  const selectionOrderQueueRef = useRef(new Queue())
  const selectionOrderQueue = selectionOrderQueueRef.current;

  const [deselecting, setDeselecting] = useState(false)

  const selectCell = useCallback((rowIndex, colIndex) => {
	selectionOrderQueue.enqueue([rowIndex, colIndex])
  }, [selectionOrderQueue])

  const deselectCells = useCallback(async () => {
	
	// Approach1: With this approach, it will wait for 5 seconds and then deselect all cells at the same time.
	// for(let i = selectionOrderQueue.headIndex; i < selectionOrderQueue.tailIndex; i++ ) {
	// 	const removedPosition = selectionOrderQueue.dequeue();
	// 	const updatedcolorArray = [...colorArray];
	// 	updatedcolorArray[removedPosition[0]][removedPosition[1]] = 'transparent';
	// 	setTimeout(() => {
	// 		setColorArray(updatedcolorArray);
	// 	}, 5000)
	// }

	// Approach2: DOUBT
	// for(let i = selectionOrderQueue.headIndex; i < selectionOrderQueue.tailIndex; i++ ) {
	// 	const removedPosition = selectionOrderQueue.dequeue();
	// 	const updatedcolorArray = [...colorArray];
	// 	updatedcolorArray[removedPosition[0]][removedPosition[1]] = 'transparent';
	// 	setTimeout(() => {
	// 		setColorArray(updatedcolorArray);
	// 	}, i * 5000)	
	// }

	// Approach3: DOUBT
	for(let i = selectionOrderQueue.headIndex; i < selectionOrderQueue.tailIndex; i++ ) {
		const removedPosition = selectionOrderQueue.dequeue();
		const updatedcolorArray = [...colorArray];
		updatedcolorArray[removedPosition[0]][removedPosition[1]] = 'transparent';
		setColorArray(updatedcolorArray);
		await delay(1000);
	}
	setDeselecting(false)
  }, [selectionOrderQueue, colorArray])

  useEffect(() => {
	if(selectionOrderQueue.size() === validCellCount && !deselecting) {
		setDeselecting(true)
		deselectCells()
	}
  }, [selectionOrderQueue, deselectCells, deselecting])

  const onClick = useCallback((rowIndex, colIndex) => {
	if(deselecting) {
		return
	}
	selectCell(rowIndex, colIndex)
	const updatedcolorArray = [...colorArray];
	updatedcolorArray[rowIndex][colIndex] = 'green';
	setColorArray(updatedcolorArray);
  }, [colorArray, selectCell, deselecting])

  return (
    <div
      className="container"
      style={{
        "--column-count": columnCount
      }}
    >
      {data.map((row, rowIndex) => 
        row.map((item, colIndex) => (
          <div
            key={`key-${rowIndex}-${colIndex}`}
            className={`item item-${colIndex}`}
			style={item ? {
				"--item-opacity": 1,
				"--item-color": colorArray[rowIndex][colIndex]
			} : {}}
			onClick={() => onClick(rowIndex, colIndex)}
          ></div>
        ))
      )}
    </div>
  );
};
