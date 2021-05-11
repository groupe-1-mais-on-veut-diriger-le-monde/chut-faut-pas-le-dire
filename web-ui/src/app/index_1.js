var testID = "1";


getJson("user", testID)
    .then((user) => choseMainScreen(user));