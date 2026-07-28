import { config } from "@fakeAPI/config";

class SessionsTable {
  private data: Map<string, FASession> = new Map<string, FASession>();
  private sessionsBuffer: FASession[] = [];

  constructor() {
    this.readSessionsFromLocalStorage();
  }

  private readSessionsFromLocalStorage() {
    const localStorageKey = config.localStorageKeys.sessions;
    const sessions = localStorage.getItem(localStorageKey);
    if (typeof sessions !== "string") {
      localStorage.setItem(localStorageKey, "[]");
      this.data.clear();
      return;
    }
    const users: FASession[] = JSON.parse(sessions);
    users.forEach((s) => this.data.set(s.id, s));
  }

  private saveInLocalStorage() {
    localStorage.setItem(
      config.localStorageKeys.sessions,
      JSON.stringify([...this.data.values()]),
    );
  }

  public createSession(id: string, userId: string) {
    this.data.set(id, {
      id,
      userId,
      startedAt: Date.now(),
    });
    this.saveInLocalStorage();
  }

  public removeSession(id: string) {
    this.data.delete(id);
    this.saveInLocalStorage();
  }

  public verifyIfExistsById(id: string) {
    return this.data.has(id);
  }

  searchById(id: string) {
    const session = this.data.get(id);
    if (!session) {
      this.sessionsBuffer = [];
      return;
    }
    this.sessionsBuffer = [session];
  }

  public get() {
    return structuredClone(this.sessionsBuffer);
  }
}

export { SessionsTable };
