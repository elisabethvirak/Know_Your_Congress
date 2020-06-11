//Import data
function buildPlot() {
    d3.json("/votes"). then(function (votesData) {
        console.log(votesData);

        var bill = []
        var democraticYes = []
        var democraticNo = []
        var independentYes = []
        var independentNo = []
        var republicanYes = []
        var republicanNo = []
        //var billTitle = []

    // Parse Data/Cast as numbers
        votesData.forEach(function(data) {
            bill.push(data.bill.bill_id);            
            democraticYes.push(data.democratic.yes);            
            democraticNo.push(data.democratic.no);            
            independentYes.push(data.independent.yes);                
            independentNo.push(data.independent.no);                
            republicanYes.push(data.republican.yes);                
            republicanNo.push(data.republican.no);
            //billTitle.push(data.bill.title)
            
        });

        console.log(bill);
        console.log(democraticYes);
        console.log(democraticNo);
        console.log(independentYes);
        console.log(republicanYes);
        console.log(republicanNo);
        //console.log(billTitle);

            var trace1= {
                x: bill,
                y: democraticYes,
                //orientation: "h",
                name: "Democratic Yes",
                type: 'bar',
                width: .15,
                // marker: {
                //     opacity: .5
                // }
                }
            
  
            var trace2 = {
                x: bill,
                y: democraticNo,
                //orientation: "h",
                name: "Democratic No",
                type: 'bar',
                width: .15
                    
            };
            var trace3 = {
                x: bill,
                y: independentYes,
                //orientation: "h",
                name: "Independent Yes",
                type: 'bar',
                width: .15
                  
            };
            var trace4 = {
                x: bill,
                y: independentNo,
                //orientation: "h",
                name: "Independent No",
                type: 'bar',
                width: .15
            };
            var trace5 = {
                x: bill,
                y: republicanYes,
                //orientation: "h",
                name: "Republican Yes",
                type: 'bar',
                width: .15
            };
            var trace6 = {
                x: bill,
                y: republicanNo,
                //orientation: "h",
                name: "Republican No",
                type: 'bar',
                //text: billTitle,
                // hovertemplate: 
                // "<b>%{text}</b><br><br>" +
                // "%{name.title.text}<br>"+
                // "%{yaxis.title.text}: %{y}<br>" +
                // "%{xaxis.title.text}: %{x}<br>" +                 
                // "<extra></extra>",
                width: .15
            };
  
            var allData = [trace1, trace2, trace5, trace6, trace3, trace4];
            

            var layout = {
                title: 'Party Votes for Each Bill',
                //barmode: 'group',
                hovermode: "x unified",
                hoverlabel: { bgcolor: "#FFF" },
                
                xaxis: {
                    tickangle: -45,
                    title: "Bill ID"
                },
                yaxis: {
                    title: "Number of Votes"

                },
                width: 1000,
                height: 800
            }
  
            Plotly.newPlot("diverging-chart", allData, layout);
    
      })
    
    
}

buildPlot();