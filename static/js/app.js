// function init() {
    d3.json("/members").then(memberData => {
        // sanity check
        // console.log(memberData[0].short_title);

        memberData.forEach(i => {
            // sanity check
            // console.log(i);
            // console.log(i.short_title);

            // save short title, first and last names to concatenate
            var shortTitle = i.short_title;
            // console.log(shortTitle);
            var firstName = i.first_name;
            // console.log(firstName);
            var lastName = i.last_name;
            // console.log(lastName);

            var repName = shortTitle + ` ` + firstName + ` ` + lastName;
            // console.log(repName);

            // convert repName array to an object
            const convertArrayToObject = (array, key) => {
                const initialValue = {};
                return array.reduce((obj, item) => {
                  return {
                    ...obj,
                    [item[key]]: item,
                  };
                }, initialValue);
              };
            console.log(convertArrayToObject(repName, 'id')); 
            // repNameObj = JSON.parse(repNameJSON);
            // console.log(repNameObj); 

            // select dropdown menu
            // var dropdownMenu = d3.select('#congressPerson');
            // //iterate through representative names list to add choices to the dropdown menu
            // repName.forEach(i => {
            //     // console.log(i);
            //     var menuOption = dropdownMenu.append('option');
            //     menuOption.text(i).property('value');
            // });
        // buildPlot(subjectIDs[0]);
        })
        // save subject ids as variable

        
        // // select dropdown menu
        // var dropdownMenu = d3.select('#congressPerson');
        // //iterate through subject id list to add choices to the dropdown menu
        // subjectIDs.forEach(i => {
        //     // console.log(i);
        //     var menuOption = dropdownMenu.append('option');
        //     menuOption.text(i).property('value');
        // });    

    })
// }
// init();