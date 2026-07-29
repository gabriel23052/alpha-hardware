import { config } from "@fakeAPI/config";
import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { SessionsQuery } from "@fakeAPI/queries/SessionsQuery";
import { createRandomHexId } from "@fakeAPI/utils/createRandomHexId";

class SessionsHandler {
  public createNewSession(userId: string) {
    const sessionsQuery = new SessionsQuery();
    const sessionId = createRandomHexId("SES", 9);
    const session = sessionsQuery.createAndInsert(sessionId, userId);
    // TODO: error
    if (!session) return;
    localStorage.setItem(config.localStorageKeys.sessionFakeCookie, session.id);
  }

  public finishCurrentSession() {
    const sessionsQuery = new SessionsQuery();
    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    localStorage.removeItem(config.localStorageKeys.sessionFakeCookie);
    if (!currentSessionId) return;
    sessionsQuery.deleteById(currentSessionId);
  }

  public isAuthenticated(response: FakeAPIResponse) {
    const sessionsQuery = new SessionsQuery();

    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );

    if (!currentSessionId || !sessionsQuery.existsById(currentSessionId)) {
      localStorage.removeItem(config.localStorageKeys.sessionFakeCookie);
      return response.setError("AUTH_INVALID_SESSION");
    }
  }

  public getSessionData(response: FakeAPIResponse) {
    const sessionsQuery = new SessionsQuery();
    const currentSessionId = localStorage.getItem(
      config.localStorageKeys.sessionFakeCookie,
    );
    const sessionData = sessionsQuery
      .selectById(currentSessionId || "")
      .getUnique();
    if (!sessionData) {
      response.setError("AUTH_INVALID_SESSION");
      return null;
    }
    return sessionData;
  }
}

export { SessionsHandler };
