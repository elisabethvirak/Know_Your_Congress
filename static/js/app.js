function init() {
    d3.json("/members").then(memberData => {
        // sanity check
        // console.log(memberData[0].short_title);
        
        memberData.forEach(i => {
            // sanity check
            // console.log(i);
            // console.log(i.short_title);

            // create repNamesList to push names to
            repNameList = []

            // info for repNameList
            // save short title, first and last names to concatenate
            var shortTitle = i.short_title;
            // console.log(shortTitle);
            var firstName = i.first_name;
            // console.log(firstName);
            var lastName = i.last_name;
            // console.log(lastName);
            var repID = i.id;
            // console.log(repID);

            // create string of representatives' entire name
            var repName = shortTitle + ` ` + firstName + ` ` + lastName;
            // add to repNameList to iterate through later
            repNameList.push([repID, repName])
            // console.log(repNameList);

            // select dropdown menu
            var dropdownMenu = d3.select('#congressPerson');
            //iterate through representative names list to add choices to the dropdown menu
            repNameList.forEach(name => {
                // console.log(name[0]);
                var menuOption = dropdownMenu.append('option');
                menuOption.attr('value', name[0]);
                menuOption.text(name[1]);
            });
        })
        buildRepCard(memberData[0].id);
    })
}

function buildRepCard(selection) {
    // var picFile = '../450x550'
    // var repPicture = d3.select('#rep-pic');

    // for (picture in picFile) {
    //     console.log(picture);
        // if (selection + '.jpg' == picture) {
        //     repPicture.append('img').attr('src', picture);
        // }
        // else {
        //     repPicture.append('h5').text(`Photo Not Available`)
        // }
    // }
    d3.json("/members").then(memberData => {
        // sanity check
        // console.log(memberData[0].short_title);
        
        var repCard = d3.select('#rep-info');
        repCard.html("")
        repDataList = []

        memberData.forEach(i => {

            if (i.id == selection) {
    
                //info for repDataList
                var repID = i.id;
                // console.log(repID);
                var repTableName = i.first_name + ` ` + i.last_name;
                // console.log(repTableName);
                if (i.party == 'R') {
                    var party = 'Republican';
                }
                else if (i.party == 'D') {
                    var party = 'Democrat';
                }
                else {
                    var party = 'Independent';
                }
                // console.log(party);
                if (i.url) {
                    var url = i.url;
                }
                else {
                    url = `Website: Not Reported`;
                }
                // console.log(url);
                if (i.facebook_account) {
                    var facebookAccount = `https://facebook.com/` + i.facebook_account;
                }
                else {
                    facebookAccount = `Facebook: Not Reported`;
                }
                // console.log(facebookAccount);
                if (i.twitter_account) {
                    var twitter = `https://twitter.com/` + i.twitter_account;
                }
                else {
                    twitter = `Twitter: Not Reported`;
                }
                // console.log(twitter);
                if (i.youtube_account) {
                    var youTube = `https://youtube.com/` + i.youtube_account;
                }
                else {
                    youTube = `YouTube: Not Reported`;
                }
                // console.log(youTube);
    
                // create repDataList
                repDataList.push([
                    repID,
                    repTableName,
                    i.date_of_birth,
                    party,
                    i.state,
                    i.district,
                    i.seniority,
                    i.next_election,
                    i.total_votes,
                    i.missed_votes,
                    i.missed_votes_pct,
                    i.votes_with_party_pct,
                    i.votes_against_party_pct,
                    i.office,
                    i.phone,
                    url,
                    facebookAccount,
                    twitter,
                    youTube
                ]);
                // console.log(repDataList);

                Object.entries(repDataList).forEach(([key,value]) => {
                    repCard.append('th').text(`Representative: ${value[1]}`);
    
                    // add general information
                    repCard.append('tr')
                        .append('th').text(`General:`);
                    repCard.append('tr').text(`Date of Birth: ${value[2]}`)
                        .append('tr').text(`Party: ${value[3]}`)
                        .append('tr').text(`State: ${value[4]}`)
                        .append('tr').text(`District: ${value[5]}`)
                        .append('tr').text(`Seniority: ${value[6]}`)
                        .append('tr').text(`Next Election Year: ${value[7]}`);
    
                    // add voting history
                    repCard.append('tr')
                        .append('th').text(`Voting History:`);
                    repCard.append('tr').text(`Total Votes: ${value[8]}`)
                        .append('tr').text(`Missed Votes: ${value[9]}`)
                        .append('tr').text(`Percentage of Missed Votes: ${value[10]}%`)
                        .append('tr').text(`Votes With Party: ${value[11]}%`)
                        .append('tr').text(`Votes Against Party: ${value[12]}%`);
    
                    // add contact information
                    repCard.append('tr')
                        .append('th').text(`Contact:`);
                    repCard.append('tr').text(`Office: ${value[13]}`)
                        .append('tr').text(`Ohone Number: ${value[14]}`);
                        if (value[15] !== 'Website: Not Reported') {
                            repCard.append('tr').text(`Website: `)
                                .append('a').attr('href',`${value[15]}`).attr('target','_blank').text(`${value[15]}`);
                        }
                        else {
                            repCard.append('tr').text(`${value[15]}`)
                        };
                        if (facebookAccount !== 'Facebook: Not Reported') {
                            repCard.append('tr').text(`Facebook: `)
                                .append('a').attr('href',`${value[16]}`).attr('target','_blank').text(`${value[16]}`);
                        }
                        else {
                            repCard.append('tr').text(`${value[16]}`)
                        };
                        if (value[17] !== 'Twitter: Not Reported') {
                            repCard.append('tr').text(`Twitter: `)
                                .append('a').attr('href',`${value[17]}`).attr('target','_blank').text(`${value[17]}`);
                        }
                        else {
                            repCard.append('tr').text(`${value[17]}`)
                        };
                        if (value[18] !== 'YouTube: Not Reported') {
                            repCard.append('tr').text(`YouTube: `)
                                .append('a').attr('href',`${value[18]}`).attr('target','_blank').text(`${value[18]}`);
                        }
                        else {
                            repCard.append('tr').text(`${value[18]}`)
                        };
                });
            };
        });
    });
}

init();