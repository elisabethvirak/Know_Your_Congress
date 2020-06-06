
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
        .domain([d3.min(memberData, d => d[chosenY]) * 1, d3.max(memberData, d => d[chosenY]) * 1])
        .range([chartHeight, 0]);
    return yLinearScale;
}

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

//change abbreviated state labels inside of circles based on event listeners
function renderTextX(circleText, newXScale, chosenX) {
    circleText.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenX])); //change x axis data & scale
    return circleText;
}
function renderTextY(circleText, newYScale, chosenY) {
    circleText.transition()
        .duration(1000)
        .attr("y", d => newYScale(d[chosenY])); //change y axis data & scale
    return circleText;
}

//change the tool tips to the correct data
function updateToolTip(chosenX, chosenY, circleText) {
    var xLabel;
    var yLabel;

    if (chosenX === "votes_against_party_pct") { //value for event listener
        xLabel = "%Votes Against Party"; //value inside of tooltip
        plotTitle1 = "%Votes Against Party vs." //plot tile
    }
    else if (chosenX === "missed_votes_pct") {
        xLabel = "% Missed Votes";
        plotTitle1 = "% Missed Votes vs.";
    }
    else {
        xLabel = "Office Spending"
        plotTitle1 = "Office Spending vs."
    }

    if (chosenY === "Seniority") {
        yLabel = "Seniority (years?)";
        plotTitle2 = "Seniority";
    }
    else if (chosenY === "officeTotals") {
        yLabel = "Office Expenditure";
        plotTitle2 = "Office Expenditure";
    }
    else {
        yLabel = "$ Spent on Private Travel";
        plotTitle2 = "Private Travel Expenditure"
    }

    d3.selectAll(".plotTitle")
        .html(`${plotTitle1} ${plotTitle2}`);

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([75, 45])
        .html(function (d) {
            return (`${d.state} <br> ${xLabel}: ${d[chosenX]}% <br> ${yLabel}: ${d[chosenY]}`)
        });

    circleText.call(toolTip)

    circleText
        .on("mouseover", function (d) {
            toolTip.show(d);
        })
        .on("mouseout", function (d) {
            toolTip.hide(d);
        });

    return circleText;
}

d3.json("/members").then(function (memberData) {
    console.log(memberData)

    //transform data types
    memberData.forEach(function (d) {
        d.missed_votes_pct = +d.missed_votes_pct
        d.seniority = +d.seniority
        d.votes_against_party_pct = +d.votes_against_party_pct

        console.log(memberData)


        var xLinearScale = xScale(memberData, chosenX);
        var yLinearScale = yScale(memberData, chosenY);
        console.log(xLinearScale)
        console.log(yLinearScale)

        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);
        console.log(bottomAxis)
        console.log(leftAxis)

        var xAxis = chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);
        console.log(xAxis)
        var yAxis = chartGroup.append("g")
            .classed("y-axis", true)
            .call(leftAxis);
        console.log(yAxis)

        var scatterPoints = chartGroup.append("g").selectAll("circle")
            .data(memberData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d[chosenX]))
            .attr("cy", d => yLinearScale(d[chosenY]))
            .attr("r", 12) //size of points
            .attr("fill", "#b3e6b3") //color of points
            .attr("opacity", ".75");

        var circleText = chartGroup.append("g").selectAll("text")
            .data(memberData)
            .enter()
            .append("text")
            .attr("x", d => xLinearScale(d[chosenX]))
            .attr("y", d => yLinearScale(d[chosenY]))
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("stroke", "black")
            .attr("stroke-width", .5)
            .text(d => d.abbr)
            .classed("scatterpoint-text", true)

        //create group for event listener value options
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

        var officetotalslabel = labelsGroupX.append("text")
            .attr("x", 0)
            .attr("y", 70)
            .attr("value", "officeTotals")
            .classed("inactive-axis", true)
            .text("Total Office Expenditure")

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

        var privatetravelLabel = labelsGroupY.append("text")
            .attr("x", -(chartHeight / 2))
            .attr("y", -(chartMargin.left / 2 + 30))
            .attr("value", "privatetravel")
            .classed("inactive-axis", true)
            .text("Spent on Private Travel")

        var circleText = updateToolTip(chosenX, chosenY, circleText);

        labelsGroupX.selectAll("text")
            .on("click", function () {
                var value = d3.select(this).attr("value");
                if (value !== chosenX) {

                    chosenX = value;
                    console.log(chosenX);

                    xLinearScale = xScale(memberData, chosenX);
                    xAxis = renderXAxis(xLinearScale, xAxis);

                    scatterPoints = renderPointsX(scatterPoints, xLinearScale, chosenX);
                    circleText = updateToolTip(chosenX, chosenY, circleText);
                    circleText = renderTextX(circleText, xLinearScale, chosenX);

                    if (chosenX === "votes_against_party_pct") {
                        votesagainstpartypctLabel
                            .classed("active-axis", true)
                            .classed("inactive-axis", false);
                        missed_votes_pctLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false)
                        officetotalslabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false)
                    }
                    else if (chosenX === "missed_votes_pct") {
                        votesagainstpartypctLabel
                            .classed("active-axis", false)
                            .classed("inactive-axis", true);
                        missed_votes_pctLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", true)
                        officetotalslabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false)
                    }
                    else {
                        votesagainstpartypctLabel
                            .classed("active-axis", false)
                            .classed("inactive-axis", true);
                        missed_votes_pctLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false)
                        officetotalslabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", true)
                    }
                }
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
                    circleText = updateToolTip(chosenX, chosenY, circleText);
                    circleText = renderTextY(circleText, yLinearScale, chosenY)

                    if (chosenY === "seniority") {
                        senioritylabel
                            .classed("active-axis", true)
                            .classed("inactive-axis", false);
                        ageLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false);
                        privatetravelLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false);
                    }
                    else if (chosenY === "age") {
                        senioritylabel
                            .classed("active-axis", false)
                            .classed("inactive-axis", true);
                        ageLabel
                            .classed("inactive-axis", false)
                            .classed("active-axis", true);
                        privatetravelLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false);
                    }
                    else {
                        senioritylabel
                            .classed("active-axis", false)
                            .classed("inactive-axis", true);
                        ageLabel
                            .classed("inactive-axis", true)
                            .classed("active-axis", false);
                        privatetravelLabel
                            .classed("inactive-axis", false)
                            .classed("active-axis", true);

                    }
                }
            });
    });
});