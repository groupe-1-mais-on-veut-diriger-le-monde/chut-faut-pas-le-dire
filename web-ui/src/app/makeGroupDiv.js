function makeShowGrpDiv(grpInfo, userInfo) {
    console.log(grpInfo);
    console.log(userInfo);

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


    populateGroupIdDiv(grpInfo, userInfo.host, "grpIdDiv");    
    populateUserListDiv(grpInfo, "userListDiv");

    console.log(grpInfo);


    //d3.select("#insideRightSideDiv").append("div").attr("id", buttonsDivName);
    // buttons dont work
    //makeButtonsDivShowFilmScreen(buttonsDivName, buttonNames);

}

function populateGroupIdDiv(grpInfo, hostInfo, id){
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
        .on("click", function() {
            getJson("group", user.groupe).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
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

function populateUserListDiv(grpInfo, id){
    d3.select("#" + id)
        .selectAll("*")
        .remove();
    
    var parentWidth = Math.floor(d3.select("#" + id).style('width').slice(0, -2));
    var parentHeight = Math.floor(d3.select("#" + id).style('height').slice(0, -2));
    var eachMemberHeight = Math.floor(parentHeight/6);
    console.log(parentWidth);
    console.log(parentHeight);
    console.log(eachMemberHeight);

    

    data = [grpInfo.Host, grpInfo.member1, grpInfo.member2, grpInfo.member3, grpInfo.member4, grpInfo.member5];
    for(var i = 0; i < 6; i++){
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
            .append("text").text("test");
        
        d3.select("#" + "groupUserInfo" + i.toString() + "Bottom")
            .append("text").text("test2");
    }
    
/*
    d3.select("#" + id)
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "userBlock_List")
    .attr("value", function(d) {
        return d;
    });

    

    
    d3.select("#"+ id)
        .append("div")
        .attr("id", "membreHost")
        .attr("class","userBlock_List");

    d3.select("#"+ id)
        .append("div")
        .attr("id", "membre1")
        .attr("class","userBlock_List");

    d3.select("#"+ id)
        .append("div")
        .attr("id", "membre2")
        .attr("class","userBlock_List");

    d3.select("#"+ id)
        .append("div")
        .attr("id", "membre3")
        .attr("class","userBlock_List");
    
    d3.select("#"+ id)
        .append("div")
        .attr("id", "membre4")
        .attr("class","userBlock_List");
    
    d3.select("#"+ id)
        .append("div")
        .attr("id", "membre5")
        .attr("class","userBlock_List");
        */
}