/*
<div id="tp" data-dojo-type="dijit/TitlePane" data-dojo-props="title: 'I\'m a TitlePane Too'">
    Click arrow to close me.
</div>
*/

d3.json("/votes").then(function (votesData){
    votesData.forEach(function(d){

        var billID = d.bill.bill_id
        console.log(billID)
        var description = d.description
        console.log(description)

        require(["dijit/TitlePane", "dojo/dom", "dojo/domReady!"], function(TitlePane, dom){
            var tp = new TitlePane({title: billID, content: description});
            dom.byId("tp").appendChild(tp.domNode)
        });
    })
})

/*
d3.json("/votes").then(function (votesData){
    votesData.forEach(function(d){

        var billID = d.bill.bill_id
        console.log(billID)
        var description = d.description

        titlePane = d3.select("#tp")

        var panes = titlePane.append("div")
            .attr ("data-dojo-type", "dijit/TitlePane")
            .attr ("data-dojo-props", "title: " + `'${billID}'`)
            .text(description)

    })
 
})
*/
