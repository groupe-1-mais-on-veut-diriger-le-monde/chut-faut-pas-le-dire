var user = localStorage['user'];
const userDetailsName = ["pId", "pAge"];
const userDetailsDescribe = ["ID :   ", "Âge :   "];

makeGroupesScreen(user);

function makeGroupesScreen(user) {
    //resets body
    d3.select("body")
        .selectAll("*")
        .remove();

    //header creator
    d3.select("body").append("div").attr("id", "header").attr("class", "header");
    d3.select("#header").append("svg").attr("id", "svgImage").attr("width", 600).attr("height", 150);
    d3.select("#svgImage").append('image').attr("width", 600).attr("height", 150).attr('xlink:href', "img/header.png");

    console.log("new screen - Groups - function called by user :");
    console.log(user);

    //splits rest of body in 2 sides -> 30% and 70% for now
    d3.select("body").append("div").attr("id", "leftSideDiv").attr("class", "leftSideDivStyle");
    d3.select("body").append("div").attr("id", "rightSideDiv").attr("class", "rightSideDivStyle");


    d3.select("#leftSideDiv").append("div").attr("id", "userDetailsWithStyle").attr("onclick", "location.href='mainScreen.html'").attr("class", "userDetails");

    makeUserIDDiv();
}

function makeUserDetailsDiv() {

}