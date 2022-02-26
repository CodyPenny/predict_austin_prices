import * as d3 from 'd3';

/**
 * Customizes the first graph
 */
class D3Chart {
  constructor(element, data, mobile, tablet, desktop) {

    const MARGIN =  mobile ? { TOP: 20, BOTTOM: 80, LEFT: 50, RIGHT: 20 } 
                    : tablet ? { TOP: 20, BOTTOM: 80, LEFT: 70, RIGHT: 20 } 
                    : { TOP: 20, BOTTOM: 80, LEFT: 70, RIGHT: 20 }
    const UPPER = mobile ? 300 : tablet ? 400 : 600
    const LOWER = mobile ? 300 : tablet ? 300 : 300

    const WIDTH = UPPER - MARGIN.LEFT - MARGIN.RIGHT;
    const HEIGHT = LOWER - MARGIN.TOP - MARGIN.BOTTOM;
    const SIDEFONT = mobile ? 14 : tablet ? 16 : 18
    const SIDETEXT = mobile ? -35 : tablet ? -40 : -50
    // visualatization
    let vis = this;

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g') // groups and moves x pxs to the right and y px to the bottom
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.x = d3.scaleLinear().range([0, WIDTH]); // svg width
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    // moves it right 0 px and down height px
    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.svg.append('g');

    // x axis label
    vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .text('Year built');

    // y axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', SIDETEXT)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', SIDEFONT)
      .attr('text-anchor', 'middle')
      .text('Number of Homes');

  }

  update(data) {
    let vis = this;
    vis.data = data.data;
    // scale the domain
    vis.x.domain([d3.min(vis.data, (d) => d[0]), d3.max(vis.data, (d) => d[0])]);
    vis.y.domain([d3.min(vis.data, (d) => d[1]), d3.max(vis.data, (d) => d[1])]);

    // horizontal axis with label below axis and remove comma delimiter
    const xAxis = d3.axisBottom(vis.x).tickFormat(d3.format("d"))
    // vertical axis with label on left
		const yAxis = d3.axisLeft(vis.y)

    // group, call x and y Axis on the selected g
		vis.xAxisGroup.call(xAxis)
		vis.yAxisGroup.call(yAxis)

    // Line
    vis.line = d3.line().x(d => vis.x(d[0])).y(d => vis.y(d[1]))
    // Scale the line path
    vis.svg.append("path").attr("d", vis.line(vis.data)).style("stroke", "deeppink").style("fill", "none")

  }
}

export default D3Chart;
