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
    var newGrp = await getJson('group', group.id);
    var membersId = [newGrp.host, newGrp.member1, newGrp.member2, newGrp.member3, newGrp.member4, newGrp.member5];
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

    await fetch(url,{
        method: 'PUT',
        headers: {'content-type': 'application/json'}
    });
}

//changes state of grp
async function changeState(grpId, state){
    var url = getURL('group');
    url = url + "/status/" + grpId.toString() + "/" + state;

    await fetch(url,{
        method: 'PUT',
        headers: {'content-type': 'application/json'}
    });
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


async function computeResultId(grp, allUserInfo){
    var motsCles = [];
    for (user in allUserInfo){
        motsCles.push(allUserInfo[user].genre1)
        motsCles.push(allUserInfo[user].genre2)
        motsCles.push(allUserInfo[user].genre3)
    }
    var motCle = getMotCle(motsCles);

    //var url = 'https://imdb-api.com/en/API/Keyword/' + getKeyIMDB() + '/' + motCle;
    var url = 'https://imdb-api.com/en/API/Keyword/k_despdtm5/love';
    
    var response = await fetch(url);
    var jsonData = await response.json();

    var all = jsonData.items;
    console.log(all);
    var filmsI = [];
    var finalId = "";
    for (val in all){
        if (! all[val].year.includes("–")){
            filmsI.push(all[val].id);
        }        
    }
    for (var i = 0; i<10; i++){
        var indexS = Math.floor(Math.random() * filmsI.length);
        finalId = finalId + filmsI[indexS] + ","
        const indexT = filmsI.indexOf(filmsI[indexS]);
        if (indexT > -1) {
            filmsI.splice(indexT, 1);
        }
    }

    grp.result = finalId;
    patchJson('group', grp);
    changeState(grp.id, '1');

}

function getMotCle(arrayEx1){
    arrayEx1.sort();
    var n = arrayEx1.length;
    var countofmax = 1;
    var temp = arrayEx1[0]; 
    var count = 1; 

    for (var i = 1; i < arrayEx1.length; i++){ 
        if (arrayEx1[i] == arrayEx1[i - 1]){
            count ++;
        } else{
            if (count > countofmax) {
                countofmax = count;
                temp = arrayEx1[i - 1];
            }
            count = 1;

        }
    }

    if (count > countofmax){
        countofmax = count;
        temp = arrayEx1[n - 1]; 
    }
    return temp; 
}

function getKeyIMDB(){
    //return 'k_despdtm5';
    return 'k_h1yacuhi';
}