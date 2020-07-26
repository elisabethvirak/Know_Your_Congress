function init() {
    //create state dropdown menu option
    var dropdownMenu2 = d3.select('#state');
    // create state list
    var stateList = [
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ]
    // console.log(stateList[0].name);

    // ---------------------------------------------------------------------
    stateList.forEach(state => {
        // console.log(state);
        var stateOption = dropdownMenu2.append('option');
        stateOption.attr('value',state.abbreviation);
        stateOption.text(state.name);
    })
    // ---------------------------------------------------------------------
    // ---------------------------------------------------------------------

    // create member selection dropdown option
    d3.json("/members").then(memberData => {
        // sanity check
        // console.log(memberData);

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
            repNameList.push([repID, 
                repName, 
                i.state,
                i.district,])
            // console.log(repNameList);

            // select dropdown menu
            var dropdownMenu1 = d3.select('#congressPerson');
            //iterate through representative names list to add choices to the dropdown menu
            repNameList.forEach(name => {
                // console.log(name[0]);
                var repOption = dropdownMenu1.append('option');
                repOption.attr('value', name[0]);
                repOption.text(name[2] + `, District: ` + name[3] + ` | ` + name[1]);
            });
        })
        buildRepCard(memberData[0].id);
        addPicture(memberData[0].id);
    })
}

function buildRepCard(selection) {
    d3.json("/members").then(memberData => {
        // sanity check
        // console.log(memberData[0].short_title);  
        var repPicture = d3.select('#rep-pic');         
        var repCard = d3.select('#rep-info');
        repCard.html("");
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
                    repPicture.append('h4').text(`${value[1]}`).append('hr');
                    repPicture.append('h5').text(`Contact:`);
                    repPicture.append('p').text(`Office: ${value[13]}`)
                        .append('h6').text(`Phone Number: ${value[14]}`)
                        .append('hr');
    
                    // add general information
                    repCard.append('h5').text(`General:`);
                    repCard.append('p').text(`Date of Birth: ${value[2]}`)
                        .append('p').text(`Party: ${value[3]}`)
                        .append('p').text(`State: ${value[4]}`)
                        .append('p').text(`District: ${value[5]}`)
                        .append('p').text(`Seniority: ${value[6]}`)
                        .append('p').text(`Next Election Year: ${value[7]}`)
                        .append('hr');
    
                    // add voting history
                    repCard.append('h5').text(`Voting History:`);
                    repCard.append('p').text(`Total Votes: ${value[8]}`)
                        .append('p').text(`Missed Votes: ${value[9]}`)
                        .append('p').text(`Percentage of Missed Votes: ${value[10]}%`)
                        .append('p').text(`Votes With Party: ${value[11]}%`)
                        .append('p').text(`Votes Against Party: ${value[12]}%`)
                        .append('hr');
    
                    // add contact information
                    repCard.append('h5').text(`Social:`);
                    repCard.append('p').text(`Office: ${value[13]}`)
                        .append('p').text(`Phone Number: ${value[14]}`);
                        if (value[15] !== 'Website: Not Reported') {
                            repCard.append('p').text(`Website: `)
                                .append('a').attr('href',`${value[15]}`).attr('target','_blank').text(`${value[15]}`);
                        }
                        else {
                            repCard.append('p').text(`${value[15]}`)
                        };
                        if (facebookAccount !== 'Facebook: Not Reported') {
                            repCard.append('p').text(`Facebook: `)
                                .append('a').attr('href',`${value[16]}`).attr('target','_blank').text(`${value[16]}`);
                        }
                        else {
                            repCard.append('p').text(`${value[16]}`)
                        };
                        if (value[17] !== 'Twitter: Not Reported') {
                            repCard.append('p').text(`Twitter: `)
                                .append('a').attr('href',`${value[17]}`).attr('target','_blank').text(`${value[17]}`);
                        }
                        else {
                            repCard.append('p').text(`${value[17]}`)
                        };
                        if (value[18] !== 'YouTube: Not Reported') {
                            repCard.append('p').text(`YouTube: `)
                                .append('a').attr('href',`${value[18]}`).attr('target','_blank').text(`${value[18]}`);
                        }
                        else {
                            repCard.append('p').text(`${value[18]}`)
                        };
                });
            };
        });
    });
}

function addPicture(rep) {
    var repPicture = d3.select('#rep-pic');      
    repPicture.html('');
    // append pictures
    if (`https://github.com/unitedstates/images/blob/gh-pages/congress/450x550/${rep}.jpg?raw=true/`) {
        repPicture.append('img').attr('src',`https://github.com/unitedstates/images/blob/gh-pages/congress/450x550/${rep}.jpg?raw=true/`);
    }
    else {
        repPicture.append('h3').text('Image Not Found');
    }
}

function repOptionChanged(id) {
    buildRepCard(id);
    addPicture(id);
}

init();