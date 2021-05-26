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

const dataFr = ["Comédie", "Horreur", "Romance", "Action", "Suspense", "Drame", "Mystère", "Crime", "Animation", "Aventure", "Fantastique", "Comédie romantique", "Comédie d'action", "Super-héros"];

const dataEn = ["comedy", "horror", "romance", "action","thriller", "drama", "mystery", "crime","animation", "adventure", "fantasy", "comdedy Romance", "action comedy", "superhero"]

// this function calls the first log in screen in case it is 1st log in
function choseMainScreen(userId) {
    getJson('user', userId)
        .then((user) => makeMainScreen(user));
}

//splits body into 3 divs, and calls functions that fill divs
function makeMainScreen(userDetails) {
    
    d3.select("body")
        .selectAll("*")
        .remove();

    //console.log(userDetails);
    user = userDetails;
    console.log(user);

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
    

    d3.select("#genreFilmesDiv").selectAll("*").remove();
    d3.select("#genreFilmesDiv").append("div").attr("id","infoP").attr("class", "textDivClass");
    d3.select("#genreFilmesDiv").append("div").attr("id","dropDownDiv").attr("class", "dropDownDivStyle");
    d3.select("#genreFilmesDiv").append("div").attr("id","acceptChangesDiv").attr("class", "acceptChangesDivStyle");

    d3.select("#infoP").append("text").text("Veuillez choisir 3 genres de film : ");

    d3.select("#dropDownDiv").append("p").attr("id", "paragraphDropDown1");
    d3.select("#paragraphDropDown1").append("text").text("Choix genre 1 : ");

    d3.select("#dropDownDiv").append("p").attr("id", "paragraphDropDown2");
    d3.select("#paragraphDropDown2").append("text").text("Choix genre 2 : ");

    d3.select("#dropDownDiv").append("p").attr("id", "paragraphDropDown3");
    d3.select("#paragraphDropDown3").append("text").text("Choix genre 3 : ");   
    
    

    

    if (user.genre1 != null){
        makeDropDownMenu("paragraphDropDown1", "dropDown1", dataFr[dataEn.indexOf(user.genre1)], dataFr);
    }else{
        makeDropDownMenu("paragraphDropDown1", "dropDown1", "Comédie", dataFr);
    }

    if (user.genre2 != null){
        makeDropDownMenu("paragraphDropDown2", "dropDown2", dataFr[dataEn.indexOf(user.genre2)], dataFr);
    }else{
        makeDropDownMenu("paragraphDropDown2", "dropDown2", "Horreur", dataFr);
    }

    if (user.genre3 != null){
        makeDropDownMenu("paragraphDropDown3", "dropDown3", dataFr[dataEn.indexOf(user.genre3)], dataFr);
    }else{
        makeDropDownMenu("paragraphDropDown3", "dropDown3", "Romance", dataFr);
    }

    d3.select("#acceptChangesDiv")
        .append("input")
        .attr("type", "button")
        .attr("value","Valider")
        .on("click", function() {
            clickAction(this);
        });
    d3.select("#acceptChangesDiv").append("text").attr("id", "texteSuiteValider");

}

function makeDropDownMenu(pId, dropDownId, defaultVal, dataFr){
    var dropdown = d3.select("#" + pId)
        .append("select")
        .attr("id",dropDownId);

    var options = dropdown.selectAll("option")
        .data(dataFr)
        .enter()
        .append("option")
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });

    options.property("selected", function(d){return d === defaultVal});
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
        user.age = parseInt(updatedAge);
    }

    makeUserDetailsDiv();
    showUserDetails();
    patchJson('user', user);
}

//fonction qui fait les actions pour chaque button
function clickAction(buttonClicked) {
    //buttonNames = ["deja vu", "a voir", "preferences", "groupes"];
    //["Créer un groupe", "Rejoindre un groupe"];
    console.log(buttonClicked);
    switch (buttonClicked.value) {
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
        case "Valider":
            const dropDown1 = document.getElementById("dropDown1").value;
            const dropDown2 = document.getElementById("dropDown2").value;
            const dropDown3 = document.getElementById("dropDown3").value;
            if(dropDown1 != dropDown2 && dropDown1 != dropDown3 && dropDown2 != dropDown3){
                user.genre1 = dataEn[dataFr.indexOf(dropDown1)];
                user.genre2 = dataEn[dataFr.indexOf(dropDown2)];
                user.genre3 = dataEn[dataFr.indexOf(dropDown3)];
                d3.select("#texteSuiteValider").text("Changements validés").style('color', '#036429').attr('class', 'validationGenreText');
                patchJson('user', user);
            }else{
                d3.select("#texteSuiteValider").text("Changements non validés").style('color', '#bb151a').attr('class', 'validationGenreText');
            }
            break;
            
            
        default:
            console.log("error in clickAction");
    }
}