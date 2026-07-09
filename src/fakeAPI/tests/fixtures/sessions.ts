const sessionsFixture = {
  commomSession: {
    payload: {
      id: "SES-123456789",
      userId: "USR-123456789",
    },
    expected: [
      {
        id: "SES-123456789",
        userId: "USR-123456789",
        startedAt: 123,
      },
    ],
  },
};

export { sessionsFixture };
