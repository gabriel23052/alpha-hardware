import { LocalStorageTable } from "@fakeAPI/tables/LocalStorageTable";
import { Query } from "./Query";
import { config } from "@fakeAPI/config";

export type User = {
  default: { id: string; username: string; password: string };
  private: { id: string; username: string };
};

const SCHEMA_VERSION = 1;

class UsersQuery extends Query<User["default"]> {
  private localStorageTable = new LocalStorageTable<User["default"]>(
    config.localStorageKeys.users,
    SCHEMA_VERSION,
  );

  public createAndInsert(id: string, username: string, password: string) {
    if (this.existsById(id) || this.existsByUsername(username)) return null;
    const user: User["default"] = {
      id,
      username,
      password,
    };
    this.localStorageTable.push(user);
    return user;
  }

  public existsById(id: string) {
    return this.localStorageTable.getData().some((u) => u.id === id);
  }

  public existsByUsername(username: string) {
    return this.localStorageTable
      .getData()
      .some((u) => u.username === username);
  }

  public updatePassword(id: string, newPassword: string) {
    const userIndex = this.localStorageTable
      .getData()
      .findIndex((u) => u.id === id);
    const user = this.localStorageTable.getData()[userIndex];
    if (userIndex === -1) return null;
    const updatedUser = {
      id: user.id,
      username: user.username,
      password: newPassword,
    };
    this.localStorageTable.update(userIndex, updatedUser);
    return updatedUser;
  }

  public selectById(id: string) {
    const origin = this.externalSelect
      ? this.localStorageTable.getData()
      : this.buffer;
    this.setBuffer(origin.find((u) => u.id === id));
    return this;
  }

  public selectByUsername(username: string) {
    const origin = this.externalSelect
      ? this.localStorageTable.getData()
      : this.buffer;
    this.setBuffer(origin.find((u) => u.username === username));
    return this;
  }

  private inDefaultPattern(): User["default"][] {
    return structuredClone(this.buffer);
  }

  private inPrivatePattern(): User["private"][] {
    return this.buffer.map((u) => ({
      id: u.id,
      username: u.username,
    }));
  }

  public get(pattern: "default"): User["default"][];
  public get(pattern: "private"): User["private"][];
  public get(pattern: keyof User): User[keyof User][] {
    if (pattern === "default") {
      return this.inDefaultPattern();
    }
    if (pattern === "private") {
      return this.inPrivatePattern();
    }
    return this.inDefaultPattern();
  }

  public getUnique(pattern: "default"): User["default"] | undefined;
  public getUnique(pattern: "private"): User["private"] | undefined;
  public getUnique(pattern: keyof User): User[keyof User] | undefined {
    if (pattern === "default") {
      return this.inDefaultPattern()[0];
    }
    if (pattern === "private") {
      return this.inPrivatePattern()[0];
    }
    return this.inDefaultPattern()[0];
  }
}

export { UsersQuery };
