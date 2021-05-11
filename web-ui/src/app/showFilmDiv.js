function makeShowFilmScreen(movie) {
    //resets body
    d3.select("#rightSideDiv")
        .selectAll("*")
        .remove();

    d3.select("#rightSideDiv")
        .append("div")
        .attr("id", "insideRightSideDiv")
        .attr("class", "insideRightSideStyle");

    const titleMovieDiv = "titleMovieDiv";
    const ratingDivName = "titleRatingDiv";
    const imageDivName = "imageDiv";
    const buttonsDivName = "buttons";
    const lowInfoDivName = "lowInfoDiv";
    const buttonNames = ["Ajouter à 'déjà vu'", "Ajouter à 'à voir'"];

    d3.select("#insideRightSideDiv").append("div").attr("id", "titleMovieDiv").attr("class", "movieTitle");
    d3.select("#insideRightSideDiv").append("div").attr("id", "generalInfoDiv").attr("class", "movieGeneralInfoStyle");
    d3.select("#insideRightSideDiv").append("div").attr("id", "imageDiv").attr("class", "movieImageStyle");

    d3.select("#titleDiv").append("div").attr("id", titleMovieDiv);
    d3.select("#generalInfoDiv").append("div").attr("id", ratingDivName);
    d3.select("#imageDiv").append("div").attr("id", imageDivName);
    d3.select("#generalInfoDiv").append("div").attr("id", lowInfoDivName);
    //d3.select("#insideRightSideDiv").append("div").attr("id", buttonsDivName);

    console.log("new screen - Show Film - function called by user :");
    console.log(user);
    console.log("the user searched the following movie :");
    console.log(movie);

    console.log(movie.title);

    titleDiv(titleMovieDiv, movie);
    topDivInfoFill(ratingDivName, movie);
    imageFill(imageDivName, movie);
    lowerDivInfoFill(lowInfoDivName, movie);
    // buttons dont work
    //makeButtonsDivShowFilmScreen(buttonsDivName, buttonNames);

}

function titleDiv(divName, movieInfo) {
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    // titre
    d3.select("#" + divName).append("p").attr("id", "paraName");
    d3.select("#paraName").append("text").text(movieInfo.title).attr("class", "titresMain");

}

function topDivInfoFill(divName, movieInfo) {
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    // Rating
    d3.select("#" + divName).append("p").attr("id", "paraRating");
    d3.select("#paraRating").append("text").text("Rating : ").attr("class", "textC");
    d3.select("#paraRating").append("text").text(movieInfo.imDbRating + "/10").attr("class", "textInfo");

    // Genre
    d3.select("#" + divName).append("p").attr("id", "paraGenres");
    d3.select("#paraGenres").append("text").text("Genres : ").attr("class", "textC");
    d3.select("#paraGenres").append("text").text(movieInfo.genres).attr("class", "textInfo");

    // Annee
    d3.select("#" + divName).append("p").attr("id", "paraAnnee");
    d3.select("#paraAnnee").append("text").text("Année : ").attr("class", "textC");
    d3.select("#paraAnnee").append("text").text(movieInfo.year).attr("class", "textInfo");

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

function makeButtonsDivShowFilmScreen(divName, buttonNames) {
    //resets buttons div
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    d3.select("#buttons")
        .selectAll("input")
        .data(buttonNames)
        .enter()
        .append("input")
        .attr("type", "button")
        .attr("class", "button")
        .attr("value", function(d) {
            return d;
        }).on("click", function() {
            clickActionShowFilmScreen(this);
        });
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
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    // Plot
    d3.select("#" + divName).append("p").attr("id", "paraPlot");
    d3.select("#paraPlot").append("text").text("Synopsis : ").attr("class", "textC");
    d3.select("#paraPlot").append("text").text(movie.plot).attr("class", "textInfo");

    // Cast
    d3.select("#" + divName).append("p").attr("id", "paraCast");
    d3.select("#paraCast").append("text").text("Acteurs : ").attr("class", "textC");
    d3.select("#paraCast").append("text").text(movie.stars).attr("class", "textInfo");

    // Lim age
    d3.select("#" + divName).append("p").attr("id", "paraMinAge");
    d3.select("#paraMinAge").append("text").text("Âge Legale : ").attr("class", "textC");
    d3.select("#paraMinAge").append("text").text(movie.contentRating).attr("class", "textInfo");

    // Duree
    d3.select("#" + divName).append("p").attr("id", "paraDuree");
    d3.select("#paraDuree").append("text").text("Durée du film : ").attr("class", "textC");
    d3.select("#paraDuree").append("text").text(movie.runtimeStr).attr("class", "textInfo");


}