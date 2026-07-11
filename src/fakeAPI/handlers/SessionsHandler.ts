import { config } from "@fakeAPI/config";
import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { SessionsTable } from "@fakeAPI/tables/SessionsTable";
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

  public verifySession(response: FakeAPIResponse<null>) {
    const sessionsTable = new SessionsTable();

    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );

    if (!currentSessionId || !sessionsTable.verifyIfExistsById(currentSessionId)) {
      localStorage.removeItem(config.localStorageKeys.sessionFakeCookie);
      return response.setError("AUTH_INVALID_SESSION");
    }
  }
}

export { SessionsHandler };
