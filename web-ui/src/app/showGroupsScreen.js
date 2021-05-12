var user = localStorage['user'];

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
}