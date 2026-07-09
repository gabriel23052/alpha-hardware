import { config } from "@fakeAPI/config";

class UsersTable {
  private data: Map<string, FAUser> = new Map<string, FAUser>();
  private usersBuffer: FAUser[] = [];

  constructor() {
    this.readUsersFromLocalStorage();
  }

  private readUsersFromLocalStorage() {
    const localStorageKey = config.localStorageKeys.users;
    const usersJson = localStorage.getItem(localStorageKey);
    if (typeof usersJson !== "string") {
      localStorage.setItem(localStorageKey, "[]");
      this.data.clear();
      return;
    }
    const users: FAUser[] = JSON.parse(usersJson);
    users.forEach((u) => this.data.set(u.id, u));
  }

  private saveInLocalStorage() {
    localStorage.setItem(
      config.localStorageKeys.users,
      JSON.stringify([...this.data.values()]),
    );
  }

  public createUser(id: string, userCreationPayload: FAUserCreationPayload) {
    if (
      this.data.has(id) ||
      this.getUserByUsername(userCreationPayload.username)
    )
      return;
    this.data.set(id, {
      id,
      username: userCreationPayload.username,
      password: userCreationPayload.password,
    });
    this.saveInLocalStorage();
  }

  public searchById(id: string) {
    const user = this.data.get(id);
    if (!user) {
      this.usersBuffer = [];
      return;
    }
    this.usersBuffer = [user];
  }

  public searchByUsername(username: string) {
    const user = [...this.data.values()].find(
      (u) => username === u.username,
    );
    this.usersBuffer = user ? [user] : [];
  }

  public verifyIfExistsByUsername(username: string) {
    return this.getUserByUsername(username) !== undefined;
  }

  private getUserByUsername(username: string) {
    const users = [...this.data.values()];
    return users.find((u) => u.username === username);
  }

  public getInWithoutPasswordFormat() {
    return structuredClone(
      this.usersBuffer.map<FAUser_WithoutPassword>((u) => ({
        id: u.id,
        username: u.username,
      })),
    );
  }

  public get() {
    return structuredClone(this.usersBuffer);
  }
}

export { UsersTable };
