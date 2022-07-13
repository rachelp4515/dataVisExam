function draw(data, svgName) {
  const margin = { top: 10, right: 30, bottom: 120, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    const colors = ["#a957c9", "#8245bf", "#554eb5", "#5790c9", "#57abc9"];

  const svg = d3
    .select(svgName)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .padding(.2);

  const y = d3.scaleLinear().domain([0, 20]).range([height, margin.bottom]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g").call(d3.axisLeft(y));

  svg
  .selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => x(d.name))
  .attr("y", (d) => y(parseInt(d.carbo)))
  .attr("width", x.bandwidth())
  .attr("height", (d) => {return height - y(parseInt(d.carbo))})
  .attr("fill", (d, i) => colors[i]);
}
