import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { SessionsHandler } from "./SessionsHandler";
import { UsersQuery } from "@fakeAPI/queries/UsersQuery";
import { createRandomHexId } from "@fakeAPI/utils/createRandomHexId";

class UsersHandler {
  public createUser(
    response: FakeAPIResponse<FAUser_WithoutPassword | null>,
    userCreationPayload: FAAuthRegister,
  ) {
    const usersQuery = new UsersQuery();
    const sessionsHandler = new SessionsHandler();
    const id = createRandomHexId("USR", 9);
    const user = usersQuery.createAndInsert(
      id,
      userCreationPayload.username,
      userCreationPayload.password,
    );

    if (!user) {
      return response.setError("AUTH_REGISTER_USER_ALREADY_REGISTERED");
    }

    sessionsHandler.createNewSession(user.id);

    return response.setData({
      id: user.id,
      username: user.username,
    });
  }

  public login(
    response: FakeAPIResponse<FAUser_WithoutPassword>,
    loginPayload: FAAuthLogin,
  ) {
    const usersQuery = new UsersQuery();
    const user = usersQuery
      .selectByUsername(loginPayload.username)
      .getUnique("default");
    if (!user || user.password !== loginPayload.password) {
      return response.setError("AUTH_LOGIN_INCORRECT_CREDENTIALS");
    }

    const sessionsHandler = new SessionsHandler();
    sessionsHandler.createNewSession(user.id);

    return response.setData(
      usersQuery.getUnique("private") as FAUser_WithoutPassword,
    );
  }

  public logout() {
    const sessionsHandler = new SessionsHandler();
    sessionsHandler.finishCurrentSession();
  }

  public recoverPassword(
    response: FakeAPIResponse<null>,
    recoverPayload: FAAuthRecover,
  ) {
    const usersQuery = new UsersQuery();
    const user = usersQuery
      .selectByUsername(recoverPayload.username)
      .getUnique("private");

    if (!user) {
      return response.setError("AUTH_RECOVER_USER_NOT_FOUND");
    }

    usersQuery.updatePassword(user.id, recoverPayload.newPassword);
  }

  public updatePassword(
    response: FakeAPIResponse<null>,
    updatePasswordPayload: FAAuthUpdatePassword,
  ) {
    const sessionsHandler = new SessionsHandler();
    const usersQuery = new UsersQuery();
    const sessionData = sessionsHandler.getSessionData(response);

    if (!sessionData) return;

    const user = usersQuery.selectById(sessionData.userId).getUnique("default");
    if (!user) {
      return response.setError("AUTH_UPDATE_PASSWORD_USER_NOT_FOUND");
    }
    if (user.password !== updatePasswordPayload.password) {
      return response.setError("AUTH_UPDATE_PASSWORD_INCORRECT_PASSWORD");
    }

    usersQuery.updatePassword(user.id, updatePasswordPayload.newPassword);
  }
}

export { UsersHandler };
