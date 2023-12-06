function Count() {
    d3.csv("coordinates.csv").then(data =>{
        var svg = d3.select("#graph1"),
        margin = 350,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

        var xScale = d3.scaleBand().domain(data.map(d => d.UNIQUE)).range([0,width]).padding(0.4);
        var yScale = d3.scaleLinear().domain([0, 7500]).range([height,0]);

        var g = svg.append("g").attr("transform", "translate("+100+","+100+")");
        
        const commonTrees = ["ULMUS AMERICANA", "GLEDITSIA TRIACANTHOS", "PLATANUS ACERIFOLIA"];
        
        svg.append("text")
            .attr("x", width / 2 + 200)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .selectAll("tspan")
            .data(["ULMUS AMERICANA", "GLEDITSIA TRIACANTHOS", "PLATANUS ACERIFOLIA"])
            .enter().append("tspan")
            .attr("x", width / 2 + 200)
            .attr("dy", (d, i) => (i === 0 ? 0 : 25))
            .text(d => d)
            .attr("style", "text-decoration: underline; fill: #2A7E19;")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
        
            // Function to handle mouseover event
        function handleMouseOver(d) {
            // Select the corresponding bar and apply highlight effect
            g.selectAll(".bar")
                .filter(bar => bar.UNIQUE === d) // Assuming "UNIQUE" is the property containing tree names
                .style("fill", "red"); // Change color or apply any highlight effect to the bar
        }

        // Function to handle mouseout event
        function handleMouseOut() {
            // Reset the highlighted bars
            g.selectAll(".bar")
                .style("fill", "#2A7E19"); // Reset bar color
        }

        svg.append("text")
            .attr("x", width / 2+200)
            .attr("y", height / 2 - 25)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("The most commonly planted trees:");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin / 4)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Total Trees Planted");

        g.append("g")
            .attr("class", "x-axis")
            .attr("clip-path", "url(#clip-path)")
            .attr('transform', 'translate(0, '+height+')' )
            .call(d3.axisBottom(xScale))
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-70)");
    
        g.append("g").call(d3.axisLeft(yScale));

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.UNIQUE))
            .attr("y", d => yScale(d.TOTAL))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.TOTAL))
        
        
    })
}

