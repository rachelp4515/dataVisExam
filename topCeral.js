function topDraw(svgName) {
  const data = [
    { name: "protein", value: 4 },
    { name: "fiber", value: 14 },
    { name: "fat", value: 0 },
    { name: "carbo", value: 8 },
    { name: "sugars", value: 0 },
  ];

  const margin = { top: 10, right: 30, bottom: 120, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
  const colors = ["#03f8fc", "#0384fc", "#554eb5", "#0339fc", "#57abc9"];

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
    .padding(0.2);

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
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => {return height - y(d.value)})
    .attr("fill", (d, i) => colors[i]);
}
