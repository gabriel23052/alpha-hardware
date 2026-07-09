import { config } from "@fakeAPI/config";
import { SessionsTable } from "@fakeAPI/tables/SessionsTable";
import { createRandomHexId } from "@fakeAPI/utils/createRandomHexId";

class SessionsHandler {
  public createNewSection(userId: string) {
    const sessionsTable = new SessionsTable();
    const sessionId = createRandomHexId("SES", 9);
    sessionsTable.createSession(sessionId, userId);
    sessionsTable.searchById(sessionId);
    const session = sessionsTable.get()[0];
    localStorage.setItem(config.localStorageKeys.sessionFakeCookie, session.id);
  }

  public isAValidSection(userId: string, sessionId: string): boolean {
    const sessionsTable = new SessionsTable();
    sessionsTable.searchById(sessionId);
    const session = sessionsTable.get()[0];
    if (!session) return false;
    if (session.userId !== userId) return false;
    return true;
  }
}

export { SessionsHandler };
