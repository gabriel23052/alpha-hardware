import { ErrorMessages } from "@fakeAPI/ErrorMessages";
import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { UsersTable } from "@fakeAPI/tables/UsersTable";

class UsersHandler {
  public createUser(
    response: FakeAPIResponse<FAUser_WithoutPassword | null>,
    userCreationPayload: FAUserCreationPayload,
  ) {
    const usersTable = new UsersTable();

    if (usersTable.verifyIfExistsByUsername(userCreationPayload.username)) {
      return response.setError(
        ErrorMessages.USER_CREATION_USERNAME_ALREADY_REGISTERED,
        true,
      );
    }

    const id = createRandomHexId("USR", 9);
    usersTable.createUser(id, userCreationPayload);
    usersTable.searchById(id);

    return response.setData(usersTable.getInWithoutPasswordFormat()[0]);
  }
  }
}

export { UsersHandler };
