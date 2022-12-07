const login = async (email, password) => {
    const response = await fetch(`http://192.168.0.72:5000/user-authe/userSign/${email}&${password}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
    return response.status
  }

[
    {
      email: "logintest@gmail.com",
      password: "Password1!",
      expectedStatus: 200,
      message: "Login - Valid credentials"
    },
    {
      email: "logintest@gmail.com",
      password: "password",
      expectedStatus: 401,
      message: "Login - Wrong password"
    },
    {
        email: "loginTest1@gmail.com",
        password: "Password1!",
        expectedStatus: 401,
        message: "Login - Wrong email"
    },
    {
        email: "loginTest1gmail.com",
        password: "Password1!",
        expectedStatus: 401,
        message: "Login - Invalid email"
    },
    {
        email: "",
        password: "Password1!",
        expectedStatus: 404,
        message: "Login - Empty email"
    }
    ,
    {
        email: "loginTest1@gmail.com",
        password: "",
        expectedStatus: 404,
        message: "Login - Empty password"
    }
].forEach((value) => {
  it(`${value.message} - Status code should be ${value.expectedStatus}`, async () => {
    expect(await login(value.email, value.password)).toBe(value.expectedStatus)
  })
})