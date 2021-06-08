/*
var url_group = "http://129.194.10.126:30001/Groups";
var url_profile = "http://129.194.10.126:30002/Profile";
*/

async function creatJson(type, body){
    delete body.id;
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
    if(response.statusText == "OK"){
        var jsonData = await response.json();
        return jsonData;
    }else{
        return null;
    }
}

async function patchJson(type, body){
    //gets correct url
    var url = getURL(type);

    await fetch(url,{
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    });
}

// deletes 1 entry by id
async function deleteJson(type, id){
    var url = getURL(type) + '/delete/' + id.toString();
    await fetch(url,{
        method: 'DELETE'
    });
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

//loads users all users in grp, and returns them in list
async function loadAllMembers(group){
    var membersId = [group.host, group.member1, group.member2, group.member3, group.member4, group.member5];
    var usersInGrp = [];
    for (var i = 0; i < membersId.length; i++){
        if(membersId[i] != 0){
            var user = await getJson('user', membersId[i]);
            usersInGrp.push(user);
        }
    }
    return usersInGrp;
}

//join grp
async function joinGroup(idGroup, idProfil){
    var url = getURL('group');
    url = url + "/join/" + idGroup.toString() + "/" + idProfil.toString();

    var response = await fetch(url,{
        method: 'PUT',
        headers: {'content-type': 'application/json'}
    });
    var jsonData = await response.json();

    return jsonData;
}

//quit grp
async function quitGroup(idGroup, place){
    var url = getURL('group');
    url = url + "/exit/" + idGroup.toString() + "/" + place.toString();

    var response = await fetch(url,{
        method: 'PUT',
        headers: {'content-type': 'application/json'}
    });
    console.log(response);
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