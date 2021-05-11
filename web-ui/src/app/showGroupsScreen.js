var user = localStorage['user'];

makeGroupesScreen(user);

function makeGroupesScreen(user) {
    //resets body
    d3.select("body")
        .selectAll("*")
        .remove();

    console.log("new screen - Groups - function called by user :");
    console.log(user);
}