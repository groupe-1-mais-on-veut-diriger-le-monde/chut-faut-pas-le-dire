function makeFirstLogInScreen(userDetails) {
    //console.log(userDetails);
    d3.select("body")
        .selectAll("*")
        .remove();

    const textBoxesId = ["userName", "age"];

    const differentGenres = [
        ["comedy", "Horror", "romance", "action"],
        ["thriller", "drama", "mystery", "crime"],
        ["animation", "adventure", "fantasy", "comdedy_Romance"],
        ["action_comedy", "superhero"]
    ];
    const differentGenresIds = [
        ["genreId1", "genreId2", "genreId3", "genreId4"],
        ["genreId5", "genreId6", "genreId7", "genreId8"],
        ["genreId9", "genreId10", "genreId11", "genreId12"],
        ["genreId13", "genreId14"]
    ];

    const idDivUserInputBoxes = "userInput";
    const idDivCheckBox = "movieGenreCheckBox";
    const idDivButtonValidate = "buttonValidate";

    //header creator
    d3.select("body").append("div").attr("id", "header").attr("class", "header");
    d3.select("#header").append("svg").attr("id", "svgImage").attr("width", 600).attr("height", 150);
    d3.select("#svgImage").append('image').attr("width", 600).attr("height", 150).attr('xlink:href', "img/header.png");

    d3.select("body").append("div").attr("id", "login").attr("class", "login");

    d3.select("#login").append("div").attr("id", "titreDiv").attr("class", "titreLogin");
    d3.select("#login").append("div").attr("id", "introDiv").attr("class", "text1Log");
    d3.select("#login").append("div").attr("id", idDivUserInputBoxes).attr("class", "champsLog");
    d3.select("#login").append("div").attr("id", idDivCheckBox).attr("class", "genresLog");
    d3.select("#login").append("div").attr("id", idDivButtonValidate).attr("class", "bouttonValidLog");

    //adds
    d3.select("#titreDiv")
        .append("p")
        .attr("id", "titre")
        .append("text")
        .text("Sign up").attr("class", "titresMain");

    d3.select("#introDiv")
        .append("p")
        .attr("id", "introPwithId")
        .append("text")
        .text("Votre ID d'utilisateur est unique est inchangeable : " + userDetails.id).attr("class", "textInfo");

    //random text on top, can be replaced by a function if we decide to add more text
    d3.select("#introDiv")
        .append("p")
        .attr("id", "introP")
        .append("text")
        .text("Tous les champs sont obligatoires : ").attr("class", "textInfo");

    addTextBoxes(textBoxesId, idDivUserInputBoxes);
    addCheckBox(differentGenres, differentGenresIds, idDivCheckBox);
    addValidateButton(textBoxesId, differentGenresIds, idDivButtonValidate, differentGenres, userDetails);

}

//
function addTextBoxes(textBoxesId, divName) {
    //console.log(userDetails);
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    const paragraphsId = ["pUserName", "pAge"];
    const textBoxesPlaceholders = ["Veuillez choisir votre nom d'utilisateur", "Veuillez insérer votre âge"];


    var wholeDiv = d3.select("#" + divName);

    wholeDiv.selectAll("p")
        .data(paragraphsId)
        .enter()
        .append("p")
        .attr("id", function(d) {
            return d;
        });

    for (val in paragraphsId) {
        var p = d3.select("#" + paragraphsId[val]);
        p.append("input")
            .attr("type", "text")
            .attr("id", textBoxesId[val])
            .attr("placeholder", textBoxesPlaceholders[val]).attr("class", "champs");
    }
}

//
function addCheckBox(checkboxLables, checkboxLablesIds, divName) {
    //console.log(userDetails);
    d3.select("#" + divName)
        .selectAll("*")
        .remove();

    //adds text
    d3.select("#" + divName)
        .append("p")
        .append("text")
        .text("Veuillez choisir les genres de filmes qui vous plaisent : ").attr("class", "textInfo");

    //
    for (sousList in checkboxLables) {
        d3.select("#" + divName)
            .append("p")
            .selectAll("input")
            .data(checkboxLables[sousList])
            .enter()
            .append('label')
            .attr('for', function(d, i) { return checkboxLablesIds[sousList][i]; })
            .text(function(d) { return d; })
            .attr("class", "textInfo")
            .append("input")
            .attr("type", "checkbox")
            .attr("unchecked", false)
            .attr("id", function(d, i) { return checkboxLablesIds[sousList][i]; });
    }
    /*
    d3.select("#" + divName).selectAll("input")
        .data(checkboxLables)
        .enter()
        .append('label')
        .attr('for', function(d, i) { return checkboxLablesIds[i]; })
        .text(function(d) { return d; })
        .append("input")
        .attr("unchecked", false)
        .attr("type", "checkbox")
        .attr("id", function(d, i) { return checkboxLablesIds[i]; });*/
}

//
function addValidateButton(textBoxesId, differentGenresIds, divName, differentGenres, userDe) {
    d3.select("#" + divName)
        .append("input")
        .attr("type", "button")
        .attr("class", "button")
        .attr("value", "VALIDER")
        .on("click", function() {
            clickValidateButton(textBoxesId, differentGenresIds, differentGenres, userDe);
        });
    d3.select("#" + divName)
        .append("p")
        .attr("id", "wrongInput");
}

//genre de films isnt working
function clickValidateButton(textBoxesId, differentGenresIds, differentGenres, userD) {
    console.log("Vous avez clique sur VALIDER : ");
    var userName = document.getElementById(textBoxesId[0]).value;
    var age = document.getElementById(textBoxesId[1]).value;
    console.log("Username : " + userName);
    console.log("Age : " + age);

    var checkedGenres = [];
    for (sousList in differentGenresIds) {
        for (val in differentGenresIds[sousList]) {
            if (d3.select("#" + differentGenresIds[sousList][val]).property("checked")) {
                checkedGenres.push(differentGenres[sousList][val]);
            }
        }
    }
    console.log("la liste des genres de films que vous aimez : ")
    console.log(checkedGenres);

    if (userName == "" || age == "" || Number.isNaN(Number(age)) || Number(age) < 0) {
        d3.select("#wrongInput")
            .selectAll("*")
            .remove();

        d3.select("#wrongInput")
            .append("text")
            .text("Les champs 'username' et 'age' sont obligatoires");
    } else {
        d3.select("#wrongInput")
            .selectAll("*")
            .remove();

        //le user en forme finale
        userD.name = userName;
        userD.age = age;
        userD.genresFilmes = checkedGenres;

        console.log(userD);
        console.log("legal user");
    }
}