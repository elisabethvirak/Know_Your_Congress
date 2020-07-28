d3.json("/votes").then(function (votesData){
    votesData.forEach(function(d){
        var billID = d.bill.bill_id
        // console.log(billID)
        var description = d.description
        // console.log(description)
        require(["dijit/TitlePane", "dojo/dom", "dojo/domReady!"], function(TitlePane, dom){
            var tp = new TitlePane({title: billID, content: description});
            dom.byId("bill-card").appendChild(tp.domNode);
        });
    })
})