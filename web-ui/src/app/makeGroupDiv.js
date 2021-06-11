function makeShowGrpDiv(grpInfo, userInfo) {

    if (grpInfo != null) {
        console.log(grpInfo)
            //resets body
        d3.select("#rightSideDiv")
            .selectAll("*")
            .remove();

        d3.select("#rightSideDiv")
            .append("div")
            .attr("id", "insideRightSideDiv")
            .attr("class", "insideRightSideStyle");

        d3.select("#insideRightSideDiv").append("div").attr("id", "insideRightSideStyle_leftSide").attr("class", "leftSideShowGroupDiv");
        d3.select("#insideRightSideDiv").append("div").attr("id", "insideRightSideStyle_rightSide").attr("class", "rightSideShowGroupDiv");

        d3.select("#insideRightSideStyle_leftSide").append("div").attr("id", "grpIdDiv").attr("class", "groupId");
        d3.select("#insideRightSideStyle_leftSide").append("div").attr("id", "userListDiv").attr("class", "userInGrpList");

        populateGroupIdDiv(grpInfo, userInfo, "grpIdDiv");

        loadAllMembers(grpInfo)
            .then((allUsersInfo) => {
                populateUserListDiv(allUsersInfo, "userListDiv");
            });

        if (grpInfo.name == "1") {
            looking(grpInfo, userInfo, "insideRightSideStyle_rightSide", "voting");
        } else if (grpInfo.name == "2") {
            looking(grpInfo, userInfo, "insideRightSideStyle_rightSide", "results");
        } else {
            looking(grpInfo, userInfo, "insideRightSideStyle_rightSide", "waiting");
        }

    } else {
        d3.select("#rightSideDiv")
            .selectAll("*")
            .remove();
    }


}

function populateGroupIdDiv(grpInfo, userInfo, id) {
    var hostInfo = userInfo.host;

    d3.select("#" + id)
        .selectAll("*")
        .remove();

    d3.select("#" + id).append("p").attr("id", "reloadGrpDivP");
    d3.select("#" + id).append("p").attr("id", "showGroupIdP");
    d3.select("#" + id).append("p").attr("id", "lauchSearchP");

    d3.select("#reloadGrpDivP")
        .append("input")
        .attr("type", "button")
        .attr("value", "⟳ Reload")
        .attr("class", "buttonReload")
        .on("click", function() {
            getJson("group", userInfo.group1).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
        });

    d3.select("#reloadGrpDivP")
        .append("input")
        .attr("type", "button")
        .attr("value", "Quitter")
        .attr("class", "button")
        .style("width", "45%")
        .on("click", function() {
            resetGroupInfo(userInfo);
            makeShowGrpDiv(null, userInfo);
        });

    d3.select("#showGroupIdP")
        .append("text")
        .text("ID du groupe : " + grpInfo.id);

    if (grpInfo.name == "") {
        if (hostInfo == -1) {
            d3.select("#lauchSearchP")
                .append("input")
                .attr("type", "button")
                .attr("value", "Lancer la recherche")
                .attr("class", "button")
                .on("click", function() {
                    loadAllMembers(grpInfo)
                        .then((allUsersInfo) => {
                            computeResultId(grpInfo, allUsersInfo)
                                .then((result) => {
                                    makeShowGrpDiv(result, userInfo);
                                });
                        });
                });
        } else {
            d3.select("#lauchSearchP")
                .append("text")
                .text("Seul le host peut lancer la recherche !");
        }
    } else if (grpInfo.name == "1") {
        if (hostInfo == -1) {
            d3.select("#lauchSearchP")
                .append("input")
                .attr("type", "button")
                .attr("value", "Compter les votes")
                .attr("class", "button")
                .on("click", function() {
                    loadAllMembers(grpInfo)
                        .then((allUsersInfo) => {
                            getJson('group', grpInfo.id)
                                .then((grp) => {
                                    var indexMax = countVotes(allUsersInfo);
                                    grp.result = grp.result.split(",")[indexMax];
                                    grp.name = "2";
                                    patchJson('group', grp);
                                    makeShowGrpDiv(grp, userInfo);
                                })
                        });
                });
        } else {
            d3.select("#lauchSearchP")
                .append("text")
                .text("Seul le host peut finir la votation !");
        }

    }

}

function populateUserListDiv(usersInGrpInfo, id) {

    d3.select("#" + id)
        .selectAll("*")
        .remove();

    var parentWidth = Math.floor(d3.select("#" + id).style('width').slice(0, -2));
    var parentHeight = Math.floor(d3.select("#" + id).style('height').slice(0, -2));
    var eachMemberHeight = Math.floor(parentHeight / 6);

    for (var i = 0; i < usersInGrpInfo.length; i++) {

        if (i == 0) {
            d3.select("#" + id)
                .append("div")
                .attr("id", "groupUserInfo" + i.toString())
                .style("width", parentWidth.toString() + "px")
                .style("height", eachMemberHeight.toString() + "px")
                .attr("class", "hostUserDivClass");

        } else {
            d3.select("#" + id)
                .append("div")
                .attr("id", "groupUserInfo" + i.toString())
                .style("width", parentWidth.toString() + "px")
                .style("height", eachMemberHeight.toString() + "px")
                .attr("class", "smallUserDivClass");

        }


        d3.select("#" + "groupUserInfo" + i.toString())
            .append("div")
            .attr("id", "groupUserInfo" + i.toString() + "Top")
            .attr("class", "txtMembre")
            .style("width", Math.floor((parentWidth / 100) * 90).toString() + "px")
            .style("height", Math.floor(eachMemberHeight / 2).toString() + "px")
            .style("left", Math.floor((parentWidth / 100) * 5).toString() + "px")
            .style("top", "0px");

        d3.select("#" + "groupUserInfo" + i.toString())
            .append("div")
            .attr("id", "groupUserInfo" + i.toString() + "Bottom")
            .attr("class", "txtMembre")
            .style("width", Math.floor((parentWidth / 100) * 90).toString() + "px")
            .style("height", Math.floor(eachMemberHeight / 2).toString() + "px")
            .style("left", Math.floor((parentWidth / 100) * 5).toString() + "px")
            .style("top", Math.floor(eachMemberHeight / 2).toString() + "px");

        d3.select("#" + "groupUserInfo" + i.toString() + "Top").append("text").text("ID : ").style("font-weight", "bold");
        d3.select("#" + "groupUserInfo" + i.toString() + "Top").append("text").text(usersInGrpInfo[i].id); /*.attr("class", "txtMembre");*/
        d3.select("#" + "groupUserInfo" + i.toString() + "Top").append("text").text(" name : ").style("font-weight", "bold");
        d3.select("#" + "groupUserInfo" + i.toString() + "Top").append("text").text(usersInGrpInfo[i].name);


        d3.select("#" + "groupUserInfo" + i.toString() + "Bottom").append("text").text("Goûts : ").style("font-weight", "bold");
        d3.select("#" + "groupUserInfo" + i.toString() + "Bottom").append("text").text(dataFr[dataEn.indexOf(usersInGrpInfo[i].genre1)] + " " + dataFr[dataEn.indexOf(usersInGrpInfo[i].genre2)] + " " + dataFr[dataEn.indexOf(usersInGrpInfo[i].genre3)]);
    }
}



function looking(grpInfo, userInfo, id, status) {
    /*
    STATUS OPTIONS :
        "voting"
        "results"
        "waiting"
    */

    d3.select("#" + id)
        .selectAll("*")
        .remove();

    d3.select("#" + id).append("div").attr("id", "votingInfo").attr("class", "votingInfo");

    if (status == 'waiting') {
        d3.select("#votingInfo")
            .append('text')
            .text("En attente de lancement !").style("font-weight", "bold");
    } else {
        userInfo.vote = "";
        d3.select("#" + id).append("div").attr("id", "filmDisplay").attr("class", "filmDisplay");
        d3.select("#" + id).append("div").attr("id", "vote").attr("class", "vote");

        // TEST MODE
        //grpInfo.result = "tt9620292,tt1375666,tt1386697,tt10272386,tt1677720,tt0091203,tt0407887,tt0409459,tt7286456,tt0993846";
        //console.log(grpInfo.result.split(","));
        showMovie(grpInfo, userInfo, status, 0, grpInfo.result.split(","));
    }
}

function showMovie(grpInfo, userInfo, type, i, idsList) {

    d3.select("#votingInfo")
        .selectAll("*")
        .remove();

    d3.select("#filmDisplay")
        .selectAll("*")
        .remove();

    d3.select("#vote")
        .selectAll("*")
        .remove();

    if (type == 'voting') {
        if (i < idsList.length) {
            var t = i + 1;
            var top = "Vote : " + t.toString() + "/" + idsList.length.toString();

            d3.select("#vote")
                .append('text')
                .attr("class", "titresMain")
                .text(top);

            getMovieInfo(idsList[i]).then((movieInfo) => {
                makeShowFilmScreen(movieInfo, "filmDisplay", "votingInfo");
            });


            d3.select("#vote")
                .append('div')
                .attr('id', 'voteYes')
                .attr('class', 'divsVoting')
                .style('left', '40%');

            d3.select("#vote")
                .append('div')
                .attr('id', 'voteNo')
                .attr('class', 'divsVoting')
                .style('left', '60%');

            d3.select("#voteYes")
                .append("input")
                .attr("type", "button")
                .attr("value", "yes")
                .attr("class", "buttonVote")
                .style('background-color', '#38a01e')
                .on("click", function() {
                    voteAction(this, grpInfo, userInfo, type, i + 1, idsList);
                });

            d3.select("#voteNo")
                .append("input")
                .attr("type", "button")
                .attr("value", "no")
                .attr("class", "buttonVote")
                .style('background-color', '#cf1616')
                .on("click", function() {
                    voteAction(this, grpInfo, userInfo, type, i + 1, idsList);
                });
        } else {
            patchJson('user', userInfo);
        }
    } else if (type == 'results') {

        d3.select("#votingInfo")
            .append('text')
            .text("Votation terminé !");

        getMovieInfo(idsList[i]).then((movieInfo) => {
            makeShowFilmScreen(movieInfo, "filmDisplay", "votingInfo");
        });

        d3.select("#vote")
            .append('text')
            .text('Bon visionnage !');
    }
}

function voteAction(buttonClicked, grpInfo, userInfo, type, i, idsList) {
    if (buttonClicked.value == 'yes') {
        userInfo.vote = userInfo.vote + "1";
        showMovie(grpInfo, userInfo, type, i, idsList);
    } else if (buttonClicked.value == 'no') {
        userInfo.vote = userInfo.vote + "0";
        showMovie(grpInfo, userInfo, type, i, idsList);
    }
}

function countVotes(allUsersInfo) {

    var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (user in allUsersInfo) {
        voteU = allUsersInfo[user].vote;
        if (voteU != null) {
            for (var i = 0; i < voteU.length; i++) {
                if (voteU[i] == "1") {
                    res[i] = res[i] + 1;
                }
            }
        }
    }

    var indexOfMax = findMax(res);
    return indexOfMax;
}

function findMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}