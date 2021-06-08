function makeShowGrpDiv(grpInfo, userInfo) {

    if(grpInfo != null){
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
        d3.select("#insideRightSideStyle_rightSide").append("div").attr("id", "selectionDiv").attr("class", "showVote");


        populateGroupIdDiv(grpInfo, userInfo, "grpIdDiv"); 

        loadAllMembers(grpInfo)
            .then((allUsersInfo) => {
                populateUserListDiv(allUsersInfo, "userListDiv");
            });
        
        if(grpInfo.name == "1"){
            looking(grpInfo, userInfo, "insideRightSideStyle_rightSide", "voting"); 
        }
        else if(grpInfo.name == "2"){
            looking(grpInfo, userInfo, "insideRightSideStyle_rightSide", "results");
        }
        else{
            looking(grpInfo, userInfo, "insideRightSideStyle_rightSide", "waiting"); 
        }

    }else{
        d3.select("#rightSideDiv")
            .selectAll("*")
            .remove();
    }


}

function populateGroupIdDiv(grpInfo, userInfo, id){
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
        .attr("value", "Clicker pour reload")
        .attr("class", "button")
        .style("width", "50%")
        .on("click", function() {
            getJson("group", user.group1).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
        });
    
    d3.select("#reloadGrpDivP")
        .append("input")
        .attr("type", "button")
        .attr("value", "Quitter")
        .attr("class", "button")
        .style("width", "50%")
        .on("click", function() {
            resetGroupInfo();
            makeShowGrpDiv(null, userInfo);
        });

    d3.select("#showGroupIdP")
        .append("text")
        .text("ID du groupe : " + grpInfo.id);
    
    if(hostInfo == -1){
        d3.select("#lauchSearchP")
            .append("input")
            .attr("type", "button")
            .attr("value", "Lancer la recherche")
            .attr("class", "button")
            .on("click", function() {
                console.log("recherche lance lole");
            });
    }else{
        d3.select("#lauchSearchP")
            .append("text")
            .text("Seul le host peut lancer la recherche");
    }
}

function populateUserListDiv(usersInGrpInfo, id){
    
    d3.select("#" + id)
        .selectAll("*")
        .remove();
    
    var parentWidth = Math.floor(d3.select("#" + id).style('width').slice(0, -2));
    var parentHeight = Math.floor(d3.select("#" + id).style('height').slice(0, -2));
    var eachMemberHeight = Math.floor(parentHeight/6);
    
    for(var i = 0; i < usersInGrpInfo.length; i++){
        d3.select("#" + id)
            .append("div")
            .attr("id", "groupUserInfo"+i.toString())
            .style("width", parentWidth.toString() + "px")
            .style("height", eachMemberHeight.toString() + "px");
        
        d3.select("#" + "groupUserInfo" + i.toString())
            .append("div")
            .attr("id", "groupUserInfo" + i.toString() + "Top")
            .style("width", Math.floor((parentWidth/100)*90).toString() + "px")
            .style("height", Math.floor(eachMemberHeight/2).toString() + "px")
            .style("left", Math.floor((parentWidth/100)*5).toString() + "px")
            .style("top", "0px");

        d3.select("#" + "groupUserInfo" + i.toString())
            .append("div")
            .attr("id", "groupUserInfo" + i.toString() + "Bottom")
            .style("width", Math.floor((parentWidth/100)*90).toString() + "px")
            .style("height", Math.floor(eachMemberHeight/2).toString() + "px")
            .style("left", Math.floor((parentWidth/100)*5).toString() + "px")
            .style("top", Math.floor(eachMemberHeight/2).toString() + "px");
        
        d3.select("#" + "groupUserInfo" + i.toString() + "Top")
            .append("text")
            .text("ID : " + usersInGrpInfo[i].id + " name : " + usersInGrpInfo[i].name);
        
        d3.select("#" + "groupUserInfo" + i.toString() + "Bottom")
            .append("text")
            .text("Goûts : " + dataFr[dataEn.indexOf(usersInGrpInfo[i].genre1)] +" " + dataFr[dataEn.indexOf(usersInGrpInfo[i].genre2)]+" "+ dataFr[dataEn.indexOf(usersInGrpInfo[i].genre3)]);
    }
}

function looking(grpInfo, userInfo, id, status){
    d3.select("#" + id)
        .selectAll("*")
        .remove();

    if(status == 'waiting'){
        d3.select("#" + id)
            .append('text')
            .text("waiting to launch");
    }
    else {
        d3.select("#" + id).append("div").attr("id", "votingInfo").attr("class", "votingInfo");
        d3.select("#" + id).append("div").attr("id", "filmDisplay").attr("class", "filmDisplay");
        d3.select("#" + id).append("div").attr("id", "vote").attr("class", "vote");
        
        

        
    }

}