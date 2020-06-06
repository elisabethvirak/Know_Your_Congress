// function init() {
    d3.json("/members").then(memberData => {
        // sanity check
        // console.log(memberData[0].short_title);

        memberData.forEach(i => {
            // sanity check
            // console.log(i);
            // console.log(i.short_title);

            // create repNamesList to push names to
            repNameList = []
            // save short title, first and last names to concatenate
            var shortTitle = i.short_title;
            // console.log(shortTitle);
            var firstName = i.first_name;
            // console.log(firstName);
            var lastName = i.last_name;
            // console.log(lastName);

            // create string of representatives' entire name
            var repName = shortTitle + ` ` + firstName + ` ` + lastName;
            // add to repNameList to iterate through later
            repNameList.push(repName)
            console.log(repNameList);

            // select dropdown menu
            var dropdownMenu = d3.select('#congressPerson');
            //iterate through representative names list to add choices to the dropdown menu
            repNameList.forEach(name => {
                // console.log(i);
                var menuOption = dropdownMenu.append('option');
                // menuOption.attr('value', name);
                menuOption.text(name);
            });
        })
    })
// }
// init();