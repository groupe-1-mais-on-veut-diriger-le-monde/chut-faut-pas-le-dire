var testID = "3";


getJson("user", testID)
    .then((user) => choseMainScreen(user));