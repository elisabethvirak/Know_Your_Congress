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
            repDataList = []

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

            //info for repDataList
            // general
            var birthDate = i.date_of_birth;
            // console.log(birthDate);
            var party = i.party;
            // console.log(party);
            var state = i.state;
            // console.log(state);
            var district = i.district;
            // console.log(district);
            var seniority = i.seniority;
            // console.log(seniority);
            var nextElection = i.next_election;
            // console.log(nextElection);

            // votes
            var totalVotes = i.total_votes;
            // console.log(totalVotes);
            var missedVotes = i.missed_votes;
            // console.log(missedVotes);
            var missedVotesPCT = i.missed_votes_pct + `%`;
            // console.log(missedVotesPCT);
            var votesWith = i.votes_with_party_pct + `%`;
            // console.log(votesWith);
            var votesAgainst = i.votes_against_party_pct + `%`;
            // console.log(votesAgainst);

            // contact
            var office = i.office;
            // console.log(office);
            var phoneNumber = i.phone;
            // console.log(phoneNumber);
            var url = i.url;
            // console.log(url);
            var facebookAccount = `https://facebook.com/` + i.facebook_account;
            // console.log(facebookAccount);
            var twitter = `https://twitter.com/` + i.twitter_account;
            // console.log(twitter);
            var youTube = `https://youtube.com/` + i.youtube_account;
            // console.log(youTube);

            // create string of representatives' entire name
            var repName = shortTitle + ` ` + firstName + ` ` + lastName;
            // add to repNameList to iterate through later
            repNameList.push([repID, repName])
            // console.log(repNameList);

            // create repDataList
            repDataList.push([
                // ['About',[
                        ['Date of Birth',birthDate],
                        ['Party',party],
                        ['State',state],
                        ['District',district],
                        ['Seniority',seniority],
                        ['Next Election', nextElection]
                //     ]
                // ],
                // ['Voting History',[
                        ['Total Votes',totalVotes],
                        ['Missed Votes',missedVotes],
                        ['Percentage of Missed Votes',missedVotesPCT],
                        ['Votes With Party',votesWith],
                        ['Votes Against Party',votesAgainst]
                //     ]
                // ],
                // ['Contact Information',[
                        ['Office',office],
                        ['Phone Number',phoneNumber],
                        ['Website',url],
                        ['Facebook',facebookAccount],
                        ['Twitter',twitter],
                        ['YouTube',youTube]
                //     ]
                // ]
            ]);
            console.log(repDataList);

            // select dropdown menu
            var dropdownMenu = d3.select('#congressPerson');
            //iterate through representative names list to add choices to the dropdown menu
            repNameList.forEach(name => {
                // console.log(name[1]);
                var menuOption = dropdownMenu.append('option');
                menuOption.attr('value', name);
                menuOption.text(name[1]);
            });

            // var repCard = d3.select('#rep-info');
            // function buildRepCard(representative) {
            //     repCard.html("")
            //     // panel box with representative's info
            //     Object.entries(repDataList).forEach(([key,value]) => {
            //         repCard.append('th').text(`${key}`)
            //         .append('tr').text(`${value}`);
            //     });
            // }
            // buildRepCard();
        })
    })
// }
// init();