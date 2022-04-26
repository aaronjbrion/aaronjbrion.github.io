function main(){
    var canvasWidth = 600;
    var canvasHeight = 600;
    var margin = 200;

    var svg1 = d3.select("#black").append("svg")
        .attr("width",  canvasWidth)
        .attr("height", canvasHeight)

    var width = svg1.attr("width") - margin;
    var height = svg1.attr("height") - margin;

    svg1.append("text")
        .attr("transform", "translate(100, 0)")
        .attr("x", 85)
        .attr("y", 50)
        .attr("font-size", "24px")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4); //scaleband dividing to categories. work with bar chart because put things in category. no numbers but categories (string/years)
    var yScale = d3.scaleLinear().range([height, 0]); // scale linear working with two quantitative variables numbers. working with ticks
    var color = d3.scaleOrdinal().range(["#FF0000", "#00FF00", "#0000FF"])

    var container_g1 = svg1.append("g")
        .attr("transform",
            "translate(" + 100 + ", " + 100 + ")");

    d3.csv("finalgame.csv").then(data => {

        xScale.domain(data.map(function(d){
            return d.Date;

        }));
        // yScale.domain([0, d3.max(data, function(d)
        yScale.domain([0, 25]);

        // Draw bars!

        container_g1.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {return xScale(d.Date); })
            .attr("y", function(d) {return yScale(d.Players); })
            .attr("width", xScale.bandwidth())
            .attr("fill", function(d) {return color(d.Players)})
            .attr("height", function(d) {return height - yScale(d.Players); });


        container_g1.selectAll("text")
            .data(data)
            .enter().append("text")
            // .text(function(d) {return d.Price})
            .attr("x", function(d) {return xScale(d.Date); })
            .attr("y", function(d) {return yScale(d.Players); })

        // Display the X-axis
        container_g1.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height-340)
            .attr("x", width-300)
            .attr("stroke", "black")

        // Display the Y-axis
        container_g1.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
                return d;
            }).ticks(5))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -5)
            .attr("x", -100)
            .attr("dy", "-5.1em")
            .attr("stroke", "black")
    })
}

main()


