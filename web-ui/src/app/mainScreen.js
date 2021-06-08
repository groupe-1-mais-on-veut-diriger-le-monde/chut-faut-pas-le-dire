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
        .then((user) => {
            if(user != null){
                makeMainScreen(user);
            }
        });
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

    // mets les 3 sous divs dans le div de user
    d3.select("#userDetailsWithStyle").append("div").attr("id", "pName").attr("class", "titresMain");
    d3.select("#userDetailsWithStyle").append("div").attr("id", "userDetails").attr("class", "profilMain");
    d3.select("#userDetailsWithStyle").append("div").attr("id", "remakeUserDetails").attr("class", "remakeProfilMain");

    makeUserDetailsDiv(user);
    makeChoiceGenreDiv(user, 0);
    makeButtonsDiv(user);
    showUserDetails(user);

    if(user.groupe1 != null){
        getJson('group', user.groupe1).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
    }
}

//creats paragraphs for userDetails div
function makeUserDetailsDiv(user) {

    //resets user details div
    d3.select("#userDetails")
        .selectAll("*")
        .remove();
    
    d3.select("#remakeUserDetails")
        .selectAll("*")
        .remove();
    
    d3.select("#userDetails")
        .append("div")
        .attr("class", "insideUserDetails")
        .attr("id", "pId");
    
    d3.select("#userDetails")
        .append("div")
        .attr("class", "insideUserDetails")
        .style("top", "50%")
        .attr("id", "pAge");

    d3.select("#pId").append("text").text("ID : ").attr("class", "textC");
    d3.select("#pAge").append("text").text("Âge : ").attr("class", "textC");

    d3.select("#remakeUserDetails")
        .append("div")
        .style("position", "absolute")
        .style("width", "25%")
        .style("height", "100%")
        .attr("id", "remakeUserDetailsL");
    
    d3.select("#remakeUserDetails")
        .append("div")
        .style("position", "absolute")
        .style("right", "0")
        .style("width", "75%")
        .style("height", "100%")
        .attr("id", "remakeUserDetailsR");

    d3.select("#remakeUserDetailsL")
        .append("input")
        .attr("type", "button")
        .attr("value", "🖉")
        .attr("class", "button")
        .style("width", "80%")
        .on("click", function() {
            clickAction(this, user);
        });
}

// ca fait les boites de texte pour metre a jour user
function makeUserDetailsUpdateDiv(user) {
    //assure que si on clic plusieures fois sur modifier, on supprime les suivants

    d3.select("#renameInput").remove()
    d3.select("#newAgeInput").remove()
    d3.select("#buttonAccept").remove()
    d3.select("#buttonRefuse").remove()

    //remakeUserDetailsR
    d3.select("#remakeUserDetailsR")
        .append("input")
        .attr("type", "text")
        .attr("id", "renameInput")
        .attr("placeholder", "nouveau username")
        .style("width", "90%")
        .attr("class", "textInfo");
    
    d3.select("#remakeUserDetailsR")
        .append("input")
        .attr("type", "text")
        .attr("id", "newAgeInput")
        .attr("placeholder", "nouvel age")
        .style("width", "50%")
        .attr("class", "textInfo");

    d3.select("#remakeUserDetailsR")
        .append("input")
        .attr("id", "buttonAccept")
        .attr("type", "button")
        .attr("class", "button")
        .style("width", "20%")
        .attr("value", "\u2705")
        .on("click", function() {
            clickAction(this, user);
        });

    

    d3.select("#remakeUserDetailsR")
        .append("input")
        .attr("id", "buttonRefuse")
        .attr("type", "button")
        .attr("class", "button")
        .style("width", "20%")
        .attr("value", "\u274c")
        .on("click", function() {
            clickAction(this, user);
        });


}

//met les details de user dans les <p></p>
function showUserDetails(user) {
    // affiche les details sur le user -> on peut utiliser a chaque fois qu on met a jouer user
    d3.select("#pName").selectAll("*").remove();

    d3.select("#pId").append("text").text(user.id).attr("class", "textInfo");
    d3.select("#pName").append("text").text(user.name);
    d3.select("#pAge").append("text").text(user.age).attr("class", "textInfo");
}

function makeChoiceGenreDiv(user, info) {
    

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
            clickAction(this, user);
        });
    d3.select("#acceptChangesDiv").append("text").attr("id", "texteSuiteValider");

    if(info == 1){
        displayMessageGenreFilme("Changements validés", '#036429');
    }

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
function makeButtonsDiv(user) {
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
        .style("width", "50%")
        .attr("value", function(d) {
            return d;
        }).on("click", function() {
            clickAction(this, user);
        });
}

function makeSearchBarDiv(user) {
    //resets buttons div
    d3.select("#searchBar")
        .selectAll("*")
        .remove();

    d3.select("#searchBar")
        .append("input")
        .attr("type", "text")
        .attr("id", "searchInput")
        .attr("class", "searchBarStyle")
        .attr("placeholder", "ID du groupe");

    d3.select("#searchBar")
        .append("input")
        .attr("type", "button")
        .attr("value", "\u2192")
        .attr("class", "button")
        .style("width", "30%")
        .on("click", function() {
            clickAction(this, user);
        });
}

//gets text from update fields, and reloads page with new values
function updatesUserDetails(user) {
    // need to actually update the user in the API
    const updatedUsername = document.getElementById("renameInput").value;
    const updatedAge = document.getElementById("newAgeInput").value;

    if (updatedUsername != "") {
        user.name = updatedUsername;
    }

    if (updatedAge != "" && !Number.isNaN(Number(updatedAge)) && Number(updatedAge) > 0) {
        user.age = parseInt(updatedAge);
    }

    makeUserDetailsDiv(user);
    showUserDetails(user);
    patchJson('user', user);
}

//resets user group info
function resetGroupInfo(user){
    if (user.host == -1){
        deleteJson('group', user.group1);
    }else{
        console.log(user.group1);
        console.log(user.host);
        quitGroup(user.group1, user.host)
    }
    user.group1 = 0;
    user.host = 0;
    user.vote = null;
    console.log(user)
    patchJson('user', user);
}

function displayMessageGenreFilme(msg, color){
    d3.select("#texteSuiteValider")
        .text(msg)
        .style('color', color)
        .attr('class', 'validationGenreText');
    
    setTimeout(function(){
        d3.select("#texteSuiteValider")
        .text('');
    }, 3000);

}

function displayMessageInfoFilm(msg, color){
    d3.select("#searchBar")
        .selectAll("*")
        .remove();

    d3.select("#searchBar")
        .append('text')
        .text(msg)
        .style('color', color)
        .attr('class', 'validationGenreText');
    
    setTimeout(function(){
        d3.select("#searchBar")
            .selectAll("*")
            .remove();
    }, 3000);

}

//fonction qui fait les actions pour chaque button
function clickAction(buttonClicked, user) {
    //buttonNames = ["deja vu", "a voir", "preferences", "groupes"];
    //["Créer un groupe", "Rejoindre un groupe"];
    switch (buttonClicked.value) {
        case "🖉":
            makeUserDetailsUpdateDiv();
            break;
        
        case "\u2192":// look for group to join
            //lit la valuer dans la boite de texte, et appelle le nouveau ecran avec user et le texte -> qui si texte est different de ""
            const searchBarText = document.getElementById("searchInput").value;
            if (searchBarText != "") {
                if (user.group1 != 0){
                    resetGroupInfo();              
                }
                d3.select("#searchBar")
                    .selectAll("*")
                    .remove();

                joinGroup(searchBarText, user.id).then((place) => {
                    if(place != 0){
                        user.host = place;
                        user.group1 = searchBarText;
                        patchJson('user', user);
                        displayMessageInfoFilm("Groupe Rejoint", '#036429');
                        getJson('group', searchBarText).then((group) => {
                            makeShowGrpDiv(group, user);
                        }); 
                    }else{
                        displayMessageInfoFilm("Impossible de rejoindre le groupe", '#bb151a');
                    }              
                });
                
                
            }
            break;
        case "\u2705":
            //accept changes click
            updatesUserDetails();
            break;
        case "\u274c":
            //reset changes click
            makeUserDetailsDiv(user);
            showUserDetails(user);
            break;
        case "Créer un groupe":
            // deletes previous user group info
            /*
            test().then((films) => {
                creatGrp(films);
            });
            */
            /* WHAT WAS HERE BEFORE*/
            console.log(user)

            if (user.group1 != 0){
                resetGroupInfo();              
            }
            
            if(user.genre1 != null && user.genre2 != null && user.genre3 != null){
                var body = {
                    name:"",
                    host: user.id
                }
                
                creatJson('group', body).then((idGroup) =>{
                    user.group1 = idGroup;
                    user.host = -1;
                    patchJson('user', user);
                    getJson('group', idGroup).then((group) => {
                        makeShowGrpDiv(group, user);
                    });              
                });
            }else{
                displayMessageGenreFilme("Veuillez effectuer vos choix", '#bb151a');
            }
              
            break;
        case "Rejoindre un groupe":
            //joinGroup(1);
            //getJson("group", user.groupe).then((grpInfo) => makeShowGrpDiv(grpInfo, user));
            if(user.genre1 != null && user.genre2 != null && user.genre3 != null){
                makeSearchBarDiv();
            }else{
                displayMessageGenreFilme("Veuillez effectuer vos choix", '#bb151a');
            }
            
            break;
        case "Valider":
            const dropDown1 = document.getElementById("dropDown1").value;
            const dropDown2 = document.getElementById("dropDown2").value;
            const dropDown3 = document.getElementById("dropDown3").value;
            if(dropDown1 != dropDown2 && dropDown1 != dropDown3 && dropDown2 != dropDown3){
                user.genre1 = dataEn[dataFr.indexOf(dropDown1)];
                user.genre2 = dataEn[dataFr.indexOf(dropDown2)];
                user.genre3 = dataEn[dataFr.indexOf(dropDown3)];

                patchJson('user', user);
                makeChoiceGenreDiv(user, 1);
            }else{
                displayMessageGenreFilme("Changements non validés", '#bb151a');
            }
            break;
            
            
        default:
            console.log("error in clickAction");
    }
}

function creatGrp(film){
    console.log(film)
    if (user.group1 != 0){
        resetGroupInfo();              
    }
    
    if(user.genre1 != null && user.genre2 != null && user.genre3 != null){
        var body = {
            name:"",
            host: user.id
        }
        
        creatJson('group', body).then((idGroup) =>{
            user.group1 = idGroup;
            user.host = -1;
            patchJson('user', user);
            getJson('group', idGroup).then((group) => {
                group.result = film;
                patchJson('group', group);
                makeShowGrpDiv(group, user);
            });              
        });
    }else{
        displayMessageGenreFilme("Veuillez effectuer vos choix", '#bb151a');
    }
}