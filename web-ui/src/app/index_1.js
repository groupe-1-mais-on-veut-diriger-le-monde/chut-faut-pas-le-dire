/*var testID = "1";
getJson("user", testID)
    .then((user) => choseMainScreen(user));
*/
/* */
deleteAll('group');
deleteAll('user');

var body = {
    name: 'Joao Quinta',
    age: 23
}
creatJson('user', body)
    .then((userId) => choseMainScreen(userId));

/*
creatJson('user', body).then((userId) => console.log('user ID ' + userId));

var body = {
    name: 'nom_Du_Groupe',
    host: 'Joao Quinta'
}

creatJson('group', body).then((groupId) => console.log('group ID ' + groupId));

var body = {
    name: 'Joao',
    age: 23
}*/


//creatPatchJson('PATCH', 'user', body).then((userId) => console.log('user ID ' + userId));
