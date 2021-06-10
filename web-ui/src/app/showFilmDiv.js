function makeShowFilmScreen(movie, mainId, titleId) {
    //resets body
    d3.select("#" + mainId)
        .selectAll("*")
        .remove();

    const ratingDivName = "titleRatingDiv";
    const imageDivName = "imageDiv";
    const lowInfoDivName = "lowInfoDiv";

    d3.select("#" + mainId).append("div").attr("id", "generalInfoDiv").attr("class", "movieGeneralInfoStyle");
    d3.select("#" + mainId).append("div").attr("id", "imageDiv").attr("class", "movieImageStyle");

    //d3.select("#generalInfoDiv").append("div").attr("id", ratingDivName);
    d3.select("#imageDiv").append("div").attr("id", imageDivName);
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_rat").attr("class", "movieGeneralInfoStyle_sub_10").style("top", "0%");
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_gen").attr("class", "movieGeneralInfoStyle_sub_10").style("top", "10%");
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_ann").attr("class", "movieGeneralInfoStyle_sub_10").style("top", "20%");
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_syn").attr("class", "movieGeneralInfoStyle_sub_30").style("top", "30%");
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_act").attr("class", "movieGeneralInfoStyle_sub_10").style("top", "70%");
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_age").attr("class", "movieGeneralInfoStyle_sub_10").style("top", "80%");
    d3.select("#generalInfoDiv").append("div").attr("id", "generalInfoDiv_dur").attr("class", "movieGeneralInfoStyle_sub_10").style("top", "90%");
    //d3.select("#generalInfoDiv").append("div").attr("id", lowInfoDivName);
    //d3.select("#insideRightSideDiv").append("div").attr("id", buttonsDivName);
    titleDiv(titleId, movie);
    
    /*
    titleDiv(titleId, movie);*/
    topDivInfoFill(ratingDivName, movie);
    imageFill(imageDivName, movie);
    lowerDivInfoFill(lowInfoDivName, movie);


}

function titleDiv(divName, movieInfo) {
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    // titre
    d3.select("#" + divName).append("text").text(movieInfo.title).attr("class", "titresMain_");
}

function topDivInfoFill(divName, movieInfo) {
    /*
    d3.select("#" + divName)
        .selectAll("*")
        .remove();
*/
    // Rating
    //d3.select("#" + divName).append("p").attr("id", "paraRating");
    d3.select("#generalInfoDiv_rat").append("text").text("Rating : ").attr("class", "textC");
    d3.select("#generalInfoDiv_rat").append("text").text(movieInfo.imDbRating + "/10").attr("class", "textInfo");

    // Genre
    //d3.select("#" + divName).append("p").attr("id", "paraGenres");
    d3.select("#generalInfoDiv_gen").append("text").text("Genres : ").attr("class", "textC");
    d3.select("#generalInfoDiv_gen").append("text").text(movieInfo.genres).attr("class", "textInfo");

    // Annee
    //d3.select("#" + divName).append("p").attr("id", "paraAnnee");
    d3.select("#generalInfoDiv_ann").append("text").text("Année : ").attr("class", "textC");
    d3.select("#generalInfoDiv_ann").append("text").text(movieInfo.year).attr("class", "textInfo");

}

function imageFill(divName, movieInfo) {
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    d3.select("#" + divName)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("id", "svgImageFilm");

    d3.select("#svgImageFilm")
        .append('image')
        .attr("width", "100%")
        .attr("height", "100%")
        .attr('xlink:href', movieInfo.image);
}

function clickActionShowFilmScreen(buttonClicked) {
    switch (buttonClicked.value) {
        case "Ajouter à 'déjà vu'":
            console.log("ajouté à 'déjà vu'");
            break;
        case "Ajouter à 'à voir'":
            console.log("ajouté à 'à voir'");
            break;
        default:
            console.log("error in clickAction");
    }

}

function lowerDivInfoFill(divName, movie) {
    /*
    d3.select("#" + divName)
        .selectAll("*")
        .remove();
*/
    // Plot
    //d3.select("#" + divName).append("p").attr("id", "paraPlot");
    d3.select("#generalInfoDiv_syn").append("text").text("Synopsis : ").attr("class", "textC");
    d3.select("#generalInfoDiv_syn").append("text").text(movie.plot).attr("class", "textInfo");

    // Cast
    //d3.select("#" + divName).append("p").attr("id", "paraCast");
    d3.select("#generalInfoDiv_act").append("text").text("Acteurs : ").attr("class", "textC");
    d3.select("#generalInfoDiv_act").append("text").text(movie.stars).attr("class", "textInfo");

    // Lim age
    //d3.select("#" + divName).append("p").attr("id", "paraMinAge");
    d3.select("#generalInfoDiv_age").append("text").text("Âge Legale : ").attr("class", "textC");
    d3.select("#generalInfoDiv_age").append("text").text(movie.contentRating).attr("class", "textInfo");

    // Duree
    //d3.select("#" + divName).append("p").attr("id", "paraDuree");
    d3.select("#generalInfoDiv_dur").append("text").text("Durée du film : ").attr("class", "textC");
    d3.select("#generalInfoDiv_dur").append("text").text(movie.runtimeStr).attr("class", "textInfo");


}