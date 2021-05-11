var baseUrl = "/jsonFiles/";
var getUserById = "user=";
var getGroupById = "group=";
var getMovieById = "film=";

async function getJson(type, id) {
    var url = "";

    switch(type) {
        case "user":
            url = baseUrl + getUserById + id + ".json";
            console.log("getting user");
            break;
        case "group":
            url = baseUrl + getGroupById + id + ".json";
            console.log("getting group");
            break;
        case "film":
            url = baseUrl + getMovieById + id + ".json";
            console.log("getting movie");
            break;
        default:
            console.log("bad getJson input !!");
            return null;
    }

    var response = await fetch(url);
    console.log(response);
    var jsonData = await response.json();
    
    return jsonData;
    
}