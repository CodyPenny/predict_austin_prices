import * as d3 from 'd3';

/**
 * Customizes the second graph
 */
class D3Chart2 {
  constructor(element, data, mobile, tablet, desktop) {
    
    const MARGIN =  mobile ? { TOP: 20, BOTTOM: 80, LEFT: 70, RIGHT: 0 } 
    : tablet ? { TOP: 20, BOTTOM: 80, LEFT: 80, RIGHT: 20 } 
    : { TOP: 20, BOTTOM: 80, LEFT: 80, RIGHT: 20 }
    const UPPER = mobile ? 300 : tablet ? 600 : 700
    const LOWER = mobile ? 300 : tablet ? 300 : 300
    
    const WIDTH = UPPER - MARGIN.LEFT - MARGIN.RIGHT;
    const HEIGHT = LOWER - MARGIN.TOP - MARGIN.BOTTOM;
    const SIDEFONT = mobile ? 14 : tablet ? 16 : 18
    const SIDETEXT = mobile ? -60 : tablet ? -60 : -60

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
      .attr('x', WIDTH / 3)
      .attr('y', HEIGHT + 50)
      .attr('font-size', 18)
      .attr('text-anchor', 'middle')
      .text('Year built')

    // y axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', SIDETEXT)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', SIDEFONT)
      .attr('text-anchor', 'middle')
      .text('Property Prices');

  }

  update(data) {
    let vis = this;
    vis.data = data.data;
    // scale the domain
    vis.x.domain([
      d3.min(vis.data, (d) => d[0] - 1),
      d3.max(vis.data, (d) => d[0]),
    ]);
    vis.y.domain([
      d3.min(vis.data, (d) => Math.ceil(d[1]) - 10000),
      d3.max(vis.data, (d) => Math.ceil(d[1]) + 20000),
    ]);

    // horizontal axis with label below axis and remove comma delimiter
    const xAxis = d3.axisBottom(vis.x).tickFormat(d3.format('d'));
    // vertical axis with label on left
    const yAxis = d3.axisLeft(vis.y);

    // group, call x and y Axis on the selected g
    vis.xAxisGroup.call(xAxis);
    vis.yAxisGroup.call(yAxis);

    // Scatterplot
    const circles = vis.svg.selectAll('dot').data(vis.data, (d) => d);

    circles
      .enter()
      .append('circle')
      .attr('cx', (d) => vis.x(d[0]))
      .attr('cy', (d) => vis.y(Math.ceil(d[1])))
      .attr('r', 3)
      .style('fill', 'steelblue');
  }
}

export default D3Chart2;
