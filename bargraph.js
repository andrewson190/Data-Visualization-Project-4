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

        const lineData = [
            { x: width/2 + 110, y: height/2 + -7 },
            { x: 250, y: 200 } 
        ];

        const lineData2 = [
            { x: width/2 + 93, y: height/2 + 19 },
            { x: 220, y: 300 }  
        ];

        const lineData3 = [
            { x: width/2 + 93, y: height/2 + 50 }, 
            { x: 200, y: 350 }  
        ];

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y);
            
        const line2 = d3.line()
            .x(d => d.x)
            .y(d => d.y);

        const line3 = d3.line()
            .x(d => d.x)
            .y(d => d.y);

        svg.append("path")
            .attr("id", "line1")
            .datum(lineData)
            .attr("class", "line-segment")
            .attr("d", line)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .style("display", "none");

        svg.append("path")
            .attr("id", "line2")
            .datum(lineData2)
            .attr("class", "line-segment")
            .attr("d", line2)
            .attr("stroke", "black") 
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .style("display", "none");

        svg.append("path")
            .attr("id", "line3")
            .datum(lineData3)
            .attr("class", "line-segment")
            .attr("d", line3)
            .attr("stroke", "black") 
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .style("display", "none");
    
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
    
        function handleMouseOver(d) {

            if (d === "ULMUS AMERICANA") {
                svg.select("#line1").style("display", "initial"); // Show line for ULMUS AMERICANA
            } else if (d === "GLEDITSIA TRIACANTHOS") {
                svg.select("#line2").style("display", "initial"); // Show line for GLEDITSIA TRIACANTHOS
            } else if (d === "PLATANUS ACERIFOLIA") {
                svg.select("#line3").style("display", "initial"); // Show line for PLATANUS ACERIFOLIA
            }

            g.selectAll(".bar")
                .filter(bar => bar.UNIQUE === d) 
                .style("fill", "red"); 
        }
  
        function handleMouseOut() {
            svg.select("#line1").style("display", "none");
            svg.select("#line2").style("display", "none");
            svg.select("#line3").style("display", "none");
        
           
            g.selectAll(".bar")
                .style("fill", "#2A7E19"); 
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

