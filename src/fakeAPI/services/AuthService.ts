import { config } from "@fakeAPI/config";
import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { SessionsQuery } from "@fakeAPI/queries/SessionsQuery";
import { UsersQuery, type User } from "@fakeAPI/queries/UsersQuery";
import { createRandomHexId } from "@fakeAPI/utils/createRandomHexId";

export type AuthLoginPayload = {
  username: string;
  password: string;
};

export type AuthRegisterPayload = {
  username: string;
  password: string;
};

export type AuthRecoverPayload = {
  username: string;
  newPassword: string;
};

export type AuthUpdatePasswordPayload = {
  password: string;
  newPassword: string;
};

class AuthService {
  private createSession(userId: string) {
    const sessionsQuery = new SessionsQuery();
    const sessionId = createRandomHexId("SES", 9);

    const session = sessionsQuery.createAndInsert(sessionId, userId);
    if (!session) return null;

    localStorage.setItem(config.localStorageKeys.sessionFakeCookie, session.id);
    return session;
  }

  public isAuthenticated() {
    const sessionsQuery = new SessionsQuery();
    const sessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    if (!sessionId) return false;
    return sessionsQuery.existsById(sessionId);
  }

  public getSessionData(response?: FakeAPIResponse) {
    const sessionsQuery = new SessionsQuery();
    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    if (!currentSessionId) {
      if (response) {
        response.setError("AUTH_UNAUTHENTICATED");
      }
      return null;
    }
    const sessionData = sessionsQuery.selectById(currentSessionId).getUnique();
    if (!sessionData) {
      if (response) {
        response.setError("AUTH_UNAUTHENTICATED");
      }
      return null;
    }
    return sessionData;
  }

  public register(
    response: FakeAPIResponse<User["private"]>,
    payload: AuthRegisterPayload,
  ) {
    const usersQuery = new UsersQuery();
    const { username, password } = payload;

    const userId = createRandomHexId("USR", 9);
    const user = usersQuery.createAndInsert(userId, username, password);
    if (!user) {
      return response.setError("AUTH_REGISTER_USER_ALREADY_REGISTERED");
    }

    const session = this.createSession(user.id);
    if (!session) {
      return response.setError("AUTH_REGISTER_DUPLICATED_SESSION");
    }

    return response.setData({
      id: user.id,
      username: user.username,
    });
  }

  public login(
    response: FakeAPIResponse<User["private"]>,
    payload: AuthLoginPayload,
  ) {
    const usersQuery = new UsersQuery();
    const { username, password } = payload;

    const user = usersQuery.selectByUsername(username).getUnique("default");
    if (!user || user.password !== password) {
      return response.setError("AUTH_LOGIN_INCORRECT_CREDENTIALS");
    }

    const session = this.createSession(user.id);
    if (!session) {
      return response.setError("AUTH_LOGIN_DUPLICATED_SESSION");
    }

    return response.setData(user);
  }

  public logout() {
    const sessionsQuery = new SessionsQuery();
    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    localStorage.removeItem(config.localStorageKeys.sessionFakeCookie);
    if (!currentSessionId) return;
    sessionsQuery.deleteById(currentSessionId);
  }

  public recover(response: FakeAPIResponse<null>, payload: AuthRecoverPayload) {
    const usersQuery = new UsersQuery();
    const user = usersQuery
      .selectByUsername(payload.username)
      .getUnique("private");

    if (!user) {
      return response.setError("AUTH_RECOVER_USER_NOT_FOUND");
    }

    usersQuery.updatePassword(user.id, payload.newPassword);
  }

  public updatePassword(
    response: FakeAPIResponse<null>,
    payload: AuthUpdatePasswordPayload,
  ) {
    const usersQuery = new UsersQuery();
    const { password, newPassword } = payload;

    const sessionData = this.getSessionData();
    if (!sessionData) {
      return response.setError("AUTH_UNAUTHENTICATED");
    }

    const user = usersQuery.selectById(sessionData.userId).getUnique("default");
    if (!user || user.password !== password) {
      return response.setError("AUTH_UNAUTHENTICATED");
    }

    usersQuery.updatePassword(user.id, newPassword);
  }

  public validateSession(response: FakeAPIResponse<null>) {
    if (!this.isAuthenticated()) {
      return response.setError("AUTH_UNAUTHENTICATED");
    }
    return;
  }
}

export { AuthService };
