import { config } from "@fakeAPI/config";
import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { SessionsTable } from "@fakeAPI/queries/SessionsTable";
import { createRandomHexId } from "@fakeAPI/utils/createRandomHexId";

class SessionsHandler {
  public createNewSession(userId: string) {
    const sessionsTable = new SessionsTable();
    const sessionId = createRandomHexId("SES", 9);
    sessionsTable.createSession(sessionId, userId);
    sessionsTable.searchById(sessionId);
    const session = sessionsTable.get()[0];
    localStorage.setItem(config.localStorageKeys.sessionFakeCookie, session.id);
  }

  public finishCurrentSession() {
    const sessionsTable = new SessionsTable();
    const currentSession = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    if (!currentSession) return;
    sessionsTable.removeSession(currentSession);
    localStorage.removeItem(config.localStorageKeys.sessionFakeCookie);
  }

  public isAuthenticated(response: FakeAPIResponse) {
    const sessionsTable = new SessionsTable();

    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );

    if (
      !currentSessionId ||
      !sessionsTable.verifyIfExistsById(currentSessionId)
    ) {
      localStorage.removeItem(config.localStorageKeys.sessionFakeCookie);
      return response.setError("AUTH_INVALID_SESSION");
    }
  }

  public getSessionData(response: FakeAPIResponse) {
    const sessionsTable = new SessionsTable();
    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    sessionsTable.searchById(currentSessionId || "");
    const sessionData = sessionsTable.get()[0];
    if (!sessionData) {
      response.setError("AUTH_INVALID_SESSION");
      return null;
    }
    return sessionData;
  }
}

export { SessionsHandler };
