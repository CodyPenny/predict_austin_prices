import React, { useRef, useState, useEffect } from 'react';
import D3Chart from './D3Chart';
 
/**
 * Renders the first graph
 * @param {*} data and media breakpoints
 * @returns graph data
 */
const ChartWrapper = ({data, mobile, tablet, desktop}) => {
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
 
  useEffect(() => {
    let isActive = true;
    if (!chart) {
      setChart(new D3Chart(chartArea.current, data, mobile, tablet, desktop))
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
 
export default ChartWrapper
