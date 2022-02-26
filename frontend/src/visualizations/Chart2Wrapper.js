import React, { useRef, useState, useEffect } from 'react';
import D3Chart2 from './D3Chart2';
 
/**
 * Renders the second graph that compares with other properties of similar year
 * @param {*} param graph data and media breakpoints
 * @returns graph data
 */
const Chart2Wrapper = ({data, mobile, tablet, desktop}) => {
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
 
  useEffect(() => {
    let isActive = true;
    if (!chart) {
      setChart(new D3Chart2(chartArea.current, data, mobile, tablet, desktop))
    }
    else {
      if(data){
        chart.update({data})
      }
    }
    return () => { isActive = false };
  }, [chart, data])
 
  return (
    <div ref={chartArea}> 
    </div>
  )
}
 
export default Chart2Wrapper
