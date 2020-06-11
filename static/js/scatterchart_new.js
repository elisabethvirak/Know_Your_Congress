// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 100,
    left: 140
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//create g tag container for chart area
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//initial axes
var chosenX = "votes_against_party_pct";
var chosenY = "seniority";

//create a scale for the axes dependent on event listener value
function xScale(memberData, chosenX) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(memberData, d => d[chosenX]) * 1, d3.max(memberData, d => d[chosenX])* 1])
        .range([0, chartWidth]);
    return xLinearScale;
}
function yScale(memberData, chosenY) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(memberData, d=>d[chosenY]), d3.max(memberData, d=>d[chosenY])])
        .range([chartHeight, 0]);
    return yLinearScale;
};

//create function to create axes on the page with a transition
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(100)
        .call(bottomAxis);

    return xAxis;
}
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(100)
        .call(leftAxis);

    return yAxis;
}

//built circles for scatter plot based on event listener values with a transition
function renderPointsX(scatterPoints, newXScale, chosenX) {
    scatterPoints.transition()
        .duration(100)
        .attr("cx", d => newXScale(d[chosenX]));//change the x axis data & scale
    return scatterPoints;
}
function renderPointsY(scatterPoints, newYScale, chosenY) {
    scatterPoints.transition()
        .duration(100)
        .attr("cy", d => newYScale(d[chosenY])); //change the y axis data & scale
    return scatterPoints;
}




d3.json("/members").then(function (memberData) 
{
    console.log(memberData);
    // renderYAxis(newYScale, yAxis)
    memberData.forEach(function (d) {
    d.seniority = +d.seniority
});
    
    var xLinearScale = xScale(memberData, chosenX);
    var yLinearScale = yScale(memberData, chosenY);


    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);
    var scatterPoints = chartGroup.append("g").selectAll("circle")
    .data(memberData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenX]))
    .attr("cy", d => yLinearScale(d[chosenY]))
    .attr("r", 6) //size of points
    .attr("fill", "#ff0000") //color of points
    .attr("opacity", ".75");

    var labelsGroupX = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`); //axis position

    var votesagainstpartypctLabel = labelsGroupX.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "votes_against_party_pct") //for event listener
    .classed("active-axis", true) //for styling
    .text("Votes Against Party (%)"); //axis title

    var missed_votes_pctLabel = labelsGroupX.append("text")
            .attr("x", 0)
            .attr("y", 45)
            .attr("value", "missed_votes_pct") //for event listener
            .classed("inactive-axis", true)
            .text("Missed Votes (%)");

    var labelsGroupY = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

    var senioritylabel = labelsGroupY.append("text")
            .attr("x", -(chartHeight / 2))
            .attr("y", -(chartMargin.left / 2) + 20)
            .attr("value", "seniority") //for event listener
            .classed("active-axis", true)
            .text("Seniority");

    var ageLabel = labelsGroupY.append("text")
            .attr("x", -(chartHeight / 2))
            .attr("y", -(chartMargin.left / 2 + 5))
            .attr("value", "age") //for event listener
            .classed("inactive-axis", true)
            .text("Age");

    labelsGroupX.selectAll("text")
            .on("click", function () {
                var value = d3.select(this).attr("value");
                console.log(value);
                if (value !== chosenX) {

                    chosenX = value;
                    console.log(chosenX);

                    xLinearScale = xScale(memberData, chosenX);
                    xAxis = renderXAxis(xLinearScale, xAxis);

                    scatterPoints = renderPointsX(scatterPoints, xLinearScale, chosenX);
                    
                    if (chosenX === "votes_against_party_pct") {
                        votesagainstpartypctLabel
                            .classed("active-axis", true)
                            .classed("inactive-axis", false);
                        missed_votes_pctLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false)
                    }
                    else {
                        votesagainstpartypctLabel
                            .classed("active-axis", false)
                            .classed("inactive-axis", true);
                        missed_votes_pctLabel
                            .classed("inactive-axis", false)
                            .classed("active-axis", true)
                    }
                
            };
        });



    });