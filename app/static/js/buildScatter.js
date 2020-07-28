d3.json("/members").then(function (memberData) {
    // console.log(memberData);

    //grab parts of date of birth string, change data type, and pass to calculate age function
    memberData.forEach(function (d) {
        d.seniority = +d.seniority
        d.dob_year = d.date_of_birth.substring(0, 4)
        d.dob_month = d.date_of_birth.substring(5, 7)
        d.dob_day = d.date_of_birth.substring(8, 10)
        d.age = calculate_age(new Date(d.dob_year, d.dob_month, d.dob_day))
    });

    //scale initial axes
    var xLinearScale = xScale(memberData, chosenX);
    var yLinearScale = yScale(memberData, chosenY);

    //create axes with scale
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    //place axes on the page
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    //create circles for scatter chart
    var scatterPoints = chartGroup.append("g").selectAll("circle")
        .data(memberData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenX]))
        .attr("cy", d => yLinearScale(d[chosenY]))
        .attr("r", 5) //size of points
        .attr("fill", "#ff0000") //color of points
        .attr("opacity", ".75") //transperancy of points
        //tool tips
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave);

    //create container for x axis labels
    var labelsGroupX = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`); //axis position
    //first x axis label
    var votesagainstpartypctLabel = labelsGroupX.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "votes_against_party_pct") //for event listener
        .classed("active-axis", true) //for styling
        .text("Votes Against Party (%)"); //axis title
    //second x axis label
    var missed_votes_pctLabel = labelsGroupX.append("text")
        .attr("x", 0)
        .attr("y", 45)
        .attr("value", "missed_votes_pct") //for event listener
        .classed("inactive-axis", true) //for styling
        .text("Missed Votes (%)"); //axis title

    //create container for y axis labels
    var labelsGroupY = chartGroup.append("g")
        .attr("transform", "rotate(-90)");
    //first y axis label
    var senioritylabel = labelsGroupY.append("text")
        .attr("x", -(chartHeight / 2))
        .attr("y", -(chartMargin.left / 2) + 20)
        .attr("value", "seniority") //for event listener
        .classed("active-axis", true) //for styling
        .text("Seniority"); //axis title
    //second y axis label
    var ageLabel = labelsGroupY.append("text")
        .attr("x", -(chartHeight / 2))
        .attr("y", -(chartMargin.left / 2 + 5))
        .attr("value", "age") //for event listener
        .classed("inactive-axis", true) //for event listener
        .text("Age"); //axis title

    //update variables based on label clicked on
    labelsGroupX.selectAll("text")
        .on("click", function () {
            var value = d3.select(this).attr("value");
            console.log(value); //check event listener works
            if (value !== chosenX) { //if different than option already displayed

                chosenX = value; //set value variable to new value
                console.log(chosenX); //check value

                xLinearScale = xScale(memberData, chosenX); //scale new data
                xAxis = renderXAxis(xLinearScale, xAxis); //create new axis

                scatterPoints = renderPointsX(scatterPoints, xLinearScale, chosenX); //create new points

                //restyle axis labels
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
            //update plot title
            title_creator()
        
        });
    //same as above for y axis/values
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