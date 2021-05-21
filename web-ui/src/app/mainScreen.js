/* TO DO :
vraiment update ne nouveau username/age etc chez la API -> updatesUserDetails()
modifier la facon dont les langues parles sont affiches -> showUserDetails()

add beauty -> how do i do that ?

<header><img src="img/logoMMM.png" height="100px" width="100px"> Movie Match Maker</header>

*/

var user;
const userDetailsName = ["pId", "pAge"];
const userDetailsDescribe = ["ID :   ", "Âge :   "];
const buttonNames = ["Créer un groupe", "Rejoindre un groupe"];

// this function calls the first log in screen in case it is 1st log in
function choseMainScreen(user) {
    if (user.age == "") {
        makeFirstLogInScreen(user);
    } else {
        makeMainScreen(user);
    }
}

//splits body into 3 divs, and calls functions that fill divs
function makeMainScreen(userDetails) {
    d3.select("body")
        .selectAll("*")
        .remove();

    //console.log(userDetails);
    user = userDetails;

    //header creator
    d3.select("body").append("div").attr("id", "header").attr("class", "header");
    d3.select("#header").append("svg").attr("id", "svgImage").attr("width", 600).attr("height", 150);
    d3.select("#svgImage").append('image').attr("width", 600).attr("height", 150).attr('xlink:href', "img/header.png");

    //splits rest of body in 2 sides -> 30% and 70% for now
    d3.select("body").append("div").attr("id", "leftSideDiv").attr("class", "leftSideDivStyle");
    d3.select("body").append("div").attr("id", "rightSideDiv").attr("class", "rightSideDivStyle");

    // mettre les 4 grands divs dans le cote gauche
    d3.select("#leftSideDiv").append("div").attr("id", "userDetailsWithStyle").attr("class", "userDetails");
    d3.select("#leftSideDiv").append("div").attr("id", "genreFilmesDiv").attr("class", "genreFilmesStyle");
    d3.select("#leftSideDiv").append("div").attr("id", "buttons").attr("class", "boutonsMain");
    d3.select("#leftSideDiv").append("div").attr("id", "searchBar").attr("class", "searchMain").attr("class", "searchMain");

    // mets les 2 sous divs dans le div de user
    d3.select("#userDetailsWithStyle").append("div").attr("id", "pName").attr("class", "titresMain");
    d3.select("#userDetailsWithStyle").append("div").attr("id", "userDetails").attr("class", "profilMain");

    makeUserDetailsDiv();
    makeChoiceGenreDiv();
    makeButtonsDiv();
    makeSearchBarDiv();
    showUserDetails();

    if(user.groupe != null){
        getJson("group", user.groupe).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
    }
    //console.log(d3.select("#userDetails"));
}

//creats paragraphs for userDetails div
function makeUserDetailsDiv() {

    //resets user details div
    d3.select("#userDetails")
        .selectAll("*")
        .remove();

    //for each value in array, creats a <p></p> with id array[i]
    d3.select("#userDetails")
        .selectAll("p")
        .data(userDetailsName).enter()
        .append("p")
        .attr("id", function(d) {
            return d;
        })
        .append("text")
        .text(function(d, i) {
            return userDetailsDescribe[i];
        }).attr("class", "textC");

    d3.select("#userDetails")
        .append("input")
        .attr("type", "button")
        .attr("value", "🖉").attr("class", "button")
        .on("click", function() {
            clickAction(this);
        });
}

// ca fait les boites de texte pour metre a jour user
function makeUserDetailsUpdateDiv() {
    //assure que si on clic plusieures fois sur modifier, on supprime les suivants

    d3.select("#renameInput").remove()
    d3.select("#newAgeInput").remove()
    d3.select("#buttonAccept").remove()
    d3.select("#buttonRefuse").remove()

    d3.select("#userDetails")
        .append("input")
        .attr("type", "text")
        .attr("id", "renameInput")
        .attr("placeholder", "nouveau username").attr("class", "textInfo");

    d3.select("#userDetails")
        .append("input")
        .attr("type", "text")
        .attr("id", "newAgeInput")
        .attr("placeholder", "nouvel age").attr("class", "textInfo");

    d3.select("#userDetails")
        .append("input")
        .attr("id", "buttonAccept")
        .attr("type", "button")
        .attr("value", "\u2705")
        .on("click", function() {
            clickAction(this);
        });

    d3.select("#userDetails")
        .append("input")
        .attr("id", "buttonRefuse")
        .attr("type", "button")
        .attr("value", "\u274c")
        .on("click", function() {
            clickAction(this);
        });


}

//met les details de user dans les <p></p>
function showUserDetails() {
    // affiche les details sur le user -> on peut utiliser a chaque fois qu on met a jouer user
    d3.select("#pName").selectAll("*").remove();

    d3.select("#pId").append("text").text(user.id).attr("class", "textInfo");
    d3.select("#pName").append("text").text(user.name);
    d3.select("#pAge").append("text").text(user.age).attr("class", "textInfo");
}

function makeChoiceGenreDiv() {
    // to do lole
    d3.select("#genreFilmesDiv").selectAll("*").remove();

    d3.select("#genreFilmesDiv").append("text").text("Genres de film qui vous plaisent : ").attr("class", "textInfo");

}

//met les buttons dans le button div
function makeButtonsDiv() {
    //resets buttons div
    d3.select("#buttons")
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
            clickAction(this);
        });
}

function makeSearchBarDiv() {
    //resets buttons div
    d3.select("#searchBar")
        .selectAll("*")
        .remove();

    d3.select("#searchBar")
        .append("input")
        .attr("type", "text")
        .attr("id", "searchInput")
        .attr("class", "searchBarStyle")
        .attr("placeholder", "ecrivez le titre d'un film");

    d3.select("#searchBar")
        .append("input")
        .attr("type", "button")
        .attr("value", "🔍").attr("class", "button")
        .on("click", function() {
            clickAction(this);
        });
}

//gets text from update fields, and reloads page with new values
function updatesUserDetails() {
    // need to actually update the user in the API
    const updatedUsername = document.getElementById("renameInput").value;
    const updatedAge = document.getElementById("newAgeInput").value;

    if (updatedUsername != "") {
        user.name = updatedUsername;
    }

    if (updatedAge != "" && !Number.isNaN(Number(updatedAge)) && Number(updatedAge) > 0) {
        user.age = updatedAge;
    }

    makeUserDetailsDiv();
    showUserDetails();
}

//fonction qui fait les actions pour chaque button
function clickAction(buttonClicked) {
    //buttonNames = ["deja vu", "a voir", "preferences", "groupes"];
    //["Créer un groupe", "Rejoindre un groupe"];
    switch (buttonClicked.value) {
        case "deja vu":
            console.log("GROS TO DO");
            break;
        case "a voir":
            console.log("GROS TO DO");
            break;
        case "groupes":
            localStorage.setItem('user', user);
            console.log("GROS TO DO");
            document.location.href = "listGroupScreen.html";
            break;
        case "🖉":
            makeUserDetailsUpdateDiv();
            break;
        case "🔍":
            //lit la valuer dans la boite de texte, et appelle le nouveau ecran avec user et le texte -> qui si texte est different de ""
            const searchBarText = document.getElementById("searchInput").value;
            if (searchBarText != "") {
                getJson("film", searchBarText).then((movie) => makeShowFilmScreen(movie));
            }
            break;
        case "\u2705":
            //accept changes click
            updatesUserDetails();
            break;
        case "\u274c":
            //reset changes click
            makeUserDetailsDiv();
            showUserDetails();
            break;
        case "Créer un groupe":
            createGroup();
            joinGroup(1);
            getJson("group", user.groupe).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
            break;
        case "Rejoindre un groupe":
            joinGroup(1);
            getJson("group", user.groupe).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
            break;
        default:
            console.log("error in clickAction");
    }
}