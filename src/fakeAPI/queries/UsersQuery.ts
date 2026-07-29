import { LocalStorageTable } from "@fakeAPI/tables/LocalStorageTable";
import { Query } from "./Query";
import { config } from "@fakeAPI/config";

type User = {
  id: string;
  username: string;
  password: string;
};

type UserPatterns = {
  default: { id: string; username: string; password: string };
  private: { id: string; username: string };
};

const SCHEMA_VERSION = 1;

class UsersQuery extends Query<User> {
  private localStorageTable = new LocalStorageTable<User>(
    config.localStorageKeys.users,
    SCHEMA_VERSION,
  );

  public createAndInsert(id: string, username: string, password: string) {
    if (this.existsById(id) || this.existsByUsername(username)) return null;
    const user: User = {
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

  private inDefaultPattern(): UserPatterns["default"][] {
    return structuredClone(this.buffer);
  }

  private inPrivatePattern(): UserPatterns["private"][] {
    return this.buffer.map((u) => ({
      id: u.id,
      username: u.username,
    }));
  }

  public get(pattern: "default"): UserPatterns["default"][];
  public get(pattern: "private"): UserPatterns["private"][];
  public get(pattern: keyof UserPatterns): UserPatterns[keyof UserPatterns][] {
    if (pattern === "default") {
      return this.inDefaultPattern();
    }
    if (pattern === "private") {
      return this.inPrivatePattern();
    }
    return this.inDefaultPattern();
  }

  public getUnique(pattern: "default"): UserPatterns["default"] | undefined;
  public getUnique(pattern: "private"): UserPatterns["private"] | undefined;
  public getUnique(
    pattern: keyof UserPatterns,
  ): UserPatterns[keyof UserPatterns] | undefined {
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
