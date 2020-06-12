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
        .domain([d3.min(memberData, d => d[chosenX]) * 1, d3.max(memberData, d => d[chosenX]) * 1])
        .range([0, chartWidth]);
    return xLinearScale;
}
function yScale(memberData, chosenY) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(memberData, d => d[chosenY]), d3.max(memberData, d => d[chosenY])])
        .range([chartHeight, 0]);
    return yLinearScale;
};

//create function to create axes on the page with a transition
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

//built circles for scatter plot based on event listener values with a transition
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

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
xtitle = "Votes against Party"
ytitle = "Seniority"

function title_creator() {
    d3.select(".plotTitle")
        .html(xtitle + " vs. " + ytitle);

}
title_creator()

d3.json("/members").then(function (memberData) {
    console.log(memberData);
    // renderYAxis(newYScale, yAxis)
    memberData.forEach(function (d) {
        d.seniority = +d.seniority
        d.dob_year = d.date_of_birth.substring(0, 4)
        d.dob_month = d.date_of_birth.substring(5, 7)
        d.dob_day = d.date_of_birth.substring(8, 10)
        d.age = calculate_age(new Date(d.dob_year, d.dob_month, d.dob_day))
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
        .attr("opacity", ".75")
        .on("mouseover", function (d){
            console.log(d);
            toolTip.show(d);
        })
        .on("mouseout", function (d) {
            toolTip.hide(d);
        });
    
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([75, 45])
        .html(function (d) {
            return (d.first_name + " " + d.last_name + " ("+ d.party + ") <br>"+ "Age: " + d.age + "<br> Years in Congress: " + d.seniority  + "<br>  Votes against Party: " + d.votes_against_party_pct + "%" + "<br> Missed Votes: " + d.missed_votes_pct +"%" )
        });
    scatterPoints.call(toolTip);

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
            }
    if (chosenX === "votes_against_party_pct") { //value for event listener
        xLabel = "%Votes Against Party"; //value inside of tooltip
        xtitle = "%Votes Against Party " //plot tile
    }
    else {
        
        xtitle = "% Missed Votes";
    }
    title_creator()
        
        });
            labelsGroupY.selectAll("text")
                .on("click", function () {
                    var value = d3.select(this).attr("value");
                    if (value !== chosenY) {

                        chosenY = value;
                        console.log(chosenY);

                        yLinearScale = yScale(memberData, chosenY);
                        yAxis = renderYAxis(yLinearScale, yAxis);

                        scatterPoints = renderPointsY(scatterPoints, yLinearScale, chosenY);

                        if (chosenY === "seniority") {
                            senioritylabel
                                .classed("active-axis", true)
                                .classed("inactive-axis", false);
                            ageLabel
                                .classed("inactive-axis", true)
                                .classed("active-axis", false);
                        }
                        else {
                            senioritylabel
                                .classed("active-axis", false)
                                .classed("inactive-axis", true);
                            ageLabel
                                .classed("inactive-axis", false)
                                .classed("active-axis", true);
                        }

                    };
                    if (chosenY === "seniority") {
                        
                        ytitle = "Seniority";
                    }
                    else {
                        
                        ytitle = "Age";
                    }
                title_creator()
                });



        });