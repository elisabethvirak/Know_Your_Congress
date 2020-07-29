// Define SVG area dimensions
var svgWidth = 900;
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

//initial axes variables (matching json keys)
var chosenX = "votes_against_party_pct";
var chosenY = "seniority";

//create a scale for the axes dependent on event listener value
function xScale(memberData, chosenX) {
    var xLinearScale = d3.scaleLinear()
        //use min and max values of selected axis data points
        .domain([d3.min(memberData, d => d[chosenX]), d3.max(memberData, d => d[chosenX])])
        //set range to provided svg area
        .range([0, chartWidth]);
    return xLinearScale;
}
function yScale(memberData, chosenY) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(memberData, d => d[chosenY]), d3.max(memberData, d => d[chosenY])])
        .range([chartHeight, 0]);
    return yLinearScale;
};

//create axes on the page with a transition
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

//build circles for scatter plot based on event listener values with a transition
function renderPointsX(scatterPoints, newXScale, chosenX) {
    scatterPoints.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenX]));//change the x axis data & scale
    return scatterPoints;
}
function renderPointsY(scatterPoints, newYScale, chosenY) {
    scatterPoints.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenY])); //change the y axis data & scale
    return scatterPoints;
}

//calculate age from date of birth in data
function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

//create div tag to hold tool tips
var toolTip = d3.select("#scatter")
.append("div")
.attr("class", "tooltip")
.style("opacity", 0);

//make tool tip div visible
var mouseover = function(d) {
    toolTip
        .style("opacity", 1)
        .style("left", "900px")
        .style("top", "75px")
    //highlight circle mouse is on with a black border
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
  };

//get pixel location of mouse and create tool tip text with that tag's data
var mousemove = function(d) {
    toolTip
        .html(d.first_name + " " + d.last_name + " ("+ d.party + ") <br>"+ "Age: " + d.age + "<br> Years in Congress: " + d.seniority  + "<br>  Votes against Party: " + d.votes_against_party_pct + "%" + "<br> Missed Votes: " + d.missed_votes_pct +"%")
        .style("left", "900px")
        .style("top", "100px")
  };

//make div tag invisible upon mouse out
var mouseleave = function(d) {
    toolTip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
  };

//initial plot titles
xtitle = "Votes against Party"
ytitle = "Seniority"

//function to update plot titles
function title_creator() {
    d3.select(".plotTitle")
        .html(xtitle + " vs. " + ytitle);

}

//initialize title
title_creator()