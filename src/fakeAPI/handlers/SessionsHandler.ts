import { config } from "@fakeAPI/config";
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

  public isAValidSession(userId: string, sessionId: string): boolean {
    const sessionsTable = new SessionsTable();
    sessionsTable.searchById(sessionId);
    const session = sessionsTable.get()[0];
    if (!session) return false;
    if (session.userId !== userId) return false;
    return true;
  }
}

export { SessionsHandler };
