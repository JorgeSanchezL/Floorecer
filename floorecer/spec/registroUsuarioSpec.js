const registrar = async (email, username, usernameForSearch, password, numerodetelefono, isBusinessOwner) => {
  const response = await fetch(`http://192.168.0.72:5000/user-authe/userRegister`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      username: username,
      usernameForSearch: usernameForSearch,
      password: password,
      numberphone : numerodetelefono,
      isBusinessOwner : isBusinessOwner,

  }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  })
  return response.status
}

[
  {
    email: "emailUsuarioTest1@gmail.com",
    username: "username1",
    usernameForSearch: ["u", "us", "use", "user", "usern", 
    "userna", "usernam", "username", "username1"],
    password: "Password1!",
    numberphone: "987654321",
    isBusinessOwner: false,
    expectedStatus: 200,
    message: "Register user - Using correct data",
    eliminar: true
  },
  {
    email: "emailUsuarioTest2@gmail.com",
    username: "username1",
    usernameForSearch: ["u", "us", "use", "user", "usern", 
    "userna", "usernam", "username", "username1"],
    password: "password",
    numberphone: "987654321",
    isBusinessOwner: false,
    expectedStatus: 400,
    message: "Register user - Using weak password",
    eliminar: false
  },
  {
    email: "",
    username: "u",
    usernameForSearch: ["u"],
    password: "",
    numberphone: "",
    isBusinessOwner: false,
    expectedStatus: 400,
    message: "Register user - Using empty data",
    eliminar: false
  },
  {
    email: "emailUsuarioTest3gmail.com",
    username: "username1",
    usernameForSearch: ["u", "us", "use", "user", "usern", 
    "userna", "usernam", "username", "username1"],
    password: "Password1!",
    numberphone: "987654321",
    isBusinessOwner: false,
    expectedStatus: 400,
    message: "Register user - Using invalid email",
    eliminar: false
  },
  {
    email: "emailUsuarioTest4@gmail.com",
    username: "username1",
    usernameForSearch: ["u", "us", "use", "user", "usern", 
    "userna", "usernam", "username", "username1"],
    password: "Password1!",
    numberphone: "9876543210",
    isBusinessOwner: false,
    expectedStatus: 400,
    message: "Register user - Using invalid phone",
    eliminar: false
  },
].forEach((value) => {
  it(`${value.message} - Status code should be ${value.expectedStatus}`, async () => {
    expect(await registrar(value.email, value.username, value.usernameForSearch, value.password, value.numberphone, value.isBusinessOwner)).toBe(value.expectedStatus)
  })
})