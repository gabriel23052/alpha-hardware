const usersFixtures = {
  user: {
    id: "USR-000000001",
    creationPayload: {
      username: "valid username",
      password: "1234",
    },
    expected: [
      {
        id: "USR-000000001",
        username: "valid username",
        password: "1234",
      },
    ],
  },
  userList: [
    {
      id: "USR-000000001",
      username: "first user",
      password: "1234",
    },
    {
      id: "USR-000000002",
      username: "second user",
      password: "5678",
    },
  ],
};

export { usersFixtures };
