function main(){
  var canvasWidth = 600;
    var canvasHeight = 600;
    var margin = 200;

    var svg = d3.select("#white").append("svg")
        .attr("width",  canvasWidth)
        .attr("height", canvasHeight)

    var width = svg.attr("width") - margin;
    var height = svg.attr("height") - margin;

    svg.append("text")
        .attr("transform", "translate(100, 0)")
        .attr("x", 85)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Esports Club Members by Year")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4); //scaleband dividing to categories. work with bar chart because put things in category. no numbers but categories (string/years)
    var yScale = d3.scaleLinear().range([height, 0]); // scale linear working with two quantitative variables numbers. working with ticks

    var container_g = svg.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 100 + ")");

    d3.csv("finalgame.csv").then(data => {

        xScale.domain(data.map(function(d){
            return d.Date;

        }));
        // yScale.domain([0, d3.max(data, function(d)
        yScale.domain([0, 25]);

        // Draw bars!

        container_g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {return xScale(d.Date); })
            .attr("y", function(d) {return yScale(d.Players); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {return height - yScale(d.Players); });


        container_g.selectAll("text")
            .data(data)
            .enter().append("text")
            .text(function(d) {return d.Players})
            .attr("x", function(d) {return xScale(d.Date); })
            .attr("y", function(d) {return yScale(d.Players); })

        // Display the X-axis
        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height-340)
            .attr("x", width-270)
            .attr("stroke", "black")
            .text("Year")

        // Display the Y-axis
        container_g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
                return d;
            }).ticks(6))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -5)
            .attr("x", -100)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
            .text("Player Count")
    })
}

main()
