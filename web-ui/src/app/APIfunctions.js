/*
var url_group = "http://129.194.10.126:30001/Groups";
var url_profile = "http://129.194.10.126:30002/Profile";
*/

async function creatJson(type, body){
    //gets correct url
    var url = getURL(type);

    var response = await fetch(url,{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    });
    var returnedId = await response.json();

    return returnedId;
}

async function getJson(type, id){
    //gets correct url
    var url = getURL(type) + '/id/' + id.toString();

    var response = await fetch(url);
    var jsonData = await response.json();

    return jsonData;
}

async function patchJson(type, id, body){
    //gets correct url
    var url = getURL(type) + '/id/' + id.toString();

    var response = await fetch(url,{
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    });
    var returnedId = await response.json();

    return returnedId;
}

//deletes all entries of a DB -> might delete this function
async function deleteAll(type){
    //gets correct url
    var url = getURL(type);
    var currentUser = '';

    var response = await fetch(url);
    var jsonData = await response.json();

    for (var i=0; i<jsonData.length; i++){
        currentUser = jsonData[i].id.toString();
        var deleteUrl = url + '/delete/' + currentUser;
        await fetch(deleteUrl,{
            method: 'DELETE'
        });
    }
}

// simple switch for user or grp url
function getURL(type){
    switch(type) {
        case 'user':
            var url = 'http://129.194.10.126:30002/Profile';
            break;
        case 'group':
            var url = 'http://129.194.10.126:30001/Groups';
            break;
        default:
            var url = '';
            break;
    }
    return url;
}