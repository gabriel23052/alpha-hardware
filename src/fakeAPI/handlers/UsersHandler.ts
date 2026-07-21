import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { SessionsHandler } from "./SessionsHandler";
import { UsersTable } from "@fakeAPI/tables/UsersTable";
import { createRandomHexId } from "@fakeAPI/utils/createRandomHexId";

class UsersHandler {
  public createUser(
    response: FakeAPIResponse<FAUser_WithoutPassword | null>,
    userCreationPayload: FAUserCreationPayload,
  ) {
    const usersTable = new UsersTable();
    const sessionsHandler = new SessionsHandler();

    if (usersTable.verifyIfExistsByUsername(userCreationPayload.username)) {
      return response.setError("AUTH_REGISTER_USER_ALREADY_REGISTERED");
    }

    const id = createRandomHexId("USR", 9);
    usersTable.createUser(id, userCreationPayload);
    usersTable.searchById(id);

    sessionsHandler.createNewSession(id);

    return response.setData(usersTable.getInWithoutPasswordFormat()[0]);
  }

  public login(
    response: FakeAPIResponse<FAUser_WithoutPassword>,
    loginPayload: FALoginPayload,
  ) {
    const usersTable = new UsersTable();
    usersTable.searchByUsername(loginPayload.username);
    const user = usersTable.get()[0];
    if (!user || user.password !== loginPayload.password) {
      return response.setError("AUTH_LOGIN_INCORRECT_CREDENTIALS");
    }
    const sessionsHandler = new SessionsHandler();
    sessionsHandler.createNewSession(user.id);

    return response.setData(usersTable.getInWithoutPasswordFormat()[0]);
  }

  public logout() {
    const sessionsHandler = new SessionsHandler();
    sessionsHandler.finishCurrentSession();
  }

  public recoverPassword(
    response: FakeAPIResponse<null>,
    recoverPayload: FARecoverPayload,
  ) {
    const usersTable = new UsersTable();

    if (!usersTable.verifyIfExistsByUsername(recoverPayload.username)) {
      return response.setError("AUTH_RECOVER_USER_NOT_FOUND");
    }

    usersTable.searchByUsername(recoverPayload.username);
    const user = usersTable.get()[0];

    usersTable.updatePassword(user.id, recoverPayload.newPassword);
  }

  public updatePassword(
    response: FakeAPIResponse<null>,
    updatePasswordPayload: FAUpdatePasswordPayload,
  ) {
    const sessionsHandler = new SessionsHandler();
    const usersTable = new UsersTable();
    const sessionData = sessionsHandler.getSessionData(response);

    if (!sessionData) return;
    usersTable.searchById(sessionData.userId);

    const user = usersTable.get()[0];
    if (!user) {
      return response.setError("AUTH_UPDATE_PASSWORD_USER_NOT_FOUND");
    }
    if (user.password !== updatePasswordPayload.password) {
      return response.setError("AUTH_UPDATE_PASSWORD_INCORRECT_PASSWORD");
    }
    
    usersTable.updatePassword(user.id, updatePasswordPayload.newPassword);
  }
}

export { UsersHandler };
