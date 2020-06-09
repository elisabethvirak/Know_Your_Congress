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

            // create string of representatives' entire name
            var repName = shortTitle + ` ` + firstName + ` ` + lastName;
            // add to repNameList to iterate through later
            repNameList.push([repID, repName])
            // console.log(repNameList);

            //info for repDataList
            // general
            var repTableName = `Representative: ` + firstName + ` ` + lastName;
            // console.log(repTableName);
            var birthDate = `Date of Birth: ` + i.date_of_birth;
            // console.log(birthDate);
            var party = `Party: ` + i.party;
            // console.log(party);
            var state = `State: ` + i.state;
            // console.log(state);
            var district = `District: ` + i.district;
            // console.log(district);
            var seniority = `Seniority: ` + i.seniority;
            // console.log(seniority);
            var nextElection = `Next Election Year: ` + i.next_election;
            // console.log(nextElection);

            // votes
            var totalVotes = `Total Votes: ` + i.total_votes;
            // console.log(totalVotes);
            var missedVotes = `Missed Votes: ` + i.missed_votes;
            // console.log(missedVotes);
            var missedVotesPCT = `Percentage of Missed Votes: ` + i.missed_votes_pct + `%`;
            // console.log(missedVotesPCT);
            var votesWith = `Votes With Party: ` + i.votes_with_party_pct + `%`;
            // console.log(votesWith);
            var votesAgainst = `Votes Against Party: ` + i.votes_against_party_pct + `%`;
            // console.log(votesAgainst);

            // contact
            var office = `Office: ` + i.office;
            // console.log(office);
            var phoneNumber = `Phone Number: ` + i.phone;
            // console.log(phoneNumber);
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
                birthDate,
                party,
                state,
                district,
                seniority,
                nextElection,
                totalVotes,
                missedVotes,
                missedVotesPCT,
                votesWith,
                votesAgainst,
                office,
                phoneNumber,
                url,
                facebookAccount,
                twitter,
                youTube
            ]);
            // console.log(repDataList);

            // select dropdown menu
            var dropdownMenu = d3.select('#congressPerson');
            //iterate through representative names list to add choices to the dropdown menu
            repNameList.forEach(name => {
                // console.log(name[1]);
                var menuOption = dropdownMenu.append('option');
                menuOption.attr('value', name);
                menuOption.text(name[1]);
            });

            var repCard = d3.select('#rep-info');
            repCard.html("")
            Object.entries(repDataList).forEach(([key,value]) => {
                repCard.append('th').text(`${value[1]}`);

                // add general information
                repCard.append('tr')
                    .append('th').text(`General:`);
                repCard.append('tr').text(`${value[2]}`)
                .append('tr')
                    .append('td').text(`${value[3]}`)
                    .append('td').text(`${value[4]}`)
                    .append('td').text(`${value[5]}`)
                .append('tr')
                    .append('td').text(`${value[6]}`)
                    .append('td').text(`${value[7]}`);

                // add voting history
                repCard.append('tr')
                    .append('th').text(`Voting History:`);
                repCard.append('tr')
                    .append('td').text(`${value[8]}`)
                    .append('td').text(`${value[9]}`)
                .append('tr')
                    .append('td').text(`${value[11]}`)
                    .append('td').text(`${value[12]}`);

                // add contact information
                repCard.append('tr')
                    .append('th').text(`Contact:`);
                repCard.append('tr').text(`${value[13]}`)
                .append('tr').text(`${value[14]}`);
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
        })
    })
// }
// init();