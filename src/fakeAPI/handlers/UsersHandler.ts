import { ErrorMessages } from "@fakeAPI/ErrorMessages";
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
      return response.setError(
        ErrorMessages.USER_CREATION_USERNAME_ALREADY_REGISTERED,
        true,
      );
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
      return response.setError(
        ErrorMessages.USER_LOGIN_INCORRECT_CREDENTIALS,
        true,
      );
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
      return response.setError(
        ErrorMessages.AUTH_RECOVER_USERNAME_NOT_FOUND,
        true,
      );
    }

    usersTable.searchByUsername(recoverPayload.username);
    const user = usersTable.get()[0];
    
    usersTable.updatePassword(user.id, recoverPayload.newPassword);
  }
}

export { UsersHandler };
