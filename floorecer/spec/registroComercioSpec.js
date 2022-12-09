[
    {
      email: "emailComercioTest1@gmail.com",
      username: "username2",
      usernameForSearch: ["u", "us", "use", "user", "usern", "userna", "usernam", "username", "username1"],
      password: "Password1!",
      numberphone: "987654321",
      isBusinessOwner: false,
      expectedStatus: 200,
      message: "Register business owner - Using correct data",
      eliminar: true
    },
    {
      email: "emailComercioTest2@gmail.com",
      username: "username2",
      usernameForSearch: ["u", "us", "use", "user", "usern", "userna", "usernam", "username", "username2"],
      password: "password",
      numberphone: "987654321",
      isBusinessOwner: false,
      expectedStatus: 400,
      message: "Register business owner - Using weak password",
      eliminar: false
    },
    {
      email: "",
      username: "",
      usernameForSearch: ["u"],
      password: "",
      numberphone: "",
      isBusinessOwner: false,
      expectedStatus: 400,
      message: "Register business owner - Using empty data",
      eliminar: false
    },
    {
      email: "emailComercioTest1gmail.com",
      username: "username2",
      usernameForSearch: ["u", "us", "use", "user", "usern", "userna", "usernam", "username", "username2"],
      password: "Password1!",
      numberphone: "987654321",
      isBusinessOwner: false,
      expectedStatus: 400,
      message: "Register business owner - Using invalid email",
      eliminar: false
    },
    {
      email: "emailComercioTest1@gmail.com",
      username: "username2",
      usernameForSearch: ["u", "us", "use", "user", "usern", "userna", "usernam", "username", "username2"],
      password: "Password1!",
      numberphone: "9876543210",
      isBusinessOwner: false,
      expectedStatus: 400,
      message: "Register business owner - Using invalid phone",
      eliminar: false
    },
  ].forEach((value) => {
    it(`${value.message} - Status code should be ${value.expectedStatus}`, async () => {
      expect(await registrar(value.email, value.username, value.usernameForSearch, value.password, value.numberphone, value.isBusinessOwner)).toBe(value.expectedStatus)
    })
  })