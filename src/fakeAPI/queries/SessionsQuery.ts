import { LocalStorageTable } from "@fakeAPI/tables/LocalStorageTable";
import { Query } from "./Query";
import { config } from "@fakeAPI/config";

type Session = {
  default: {
    id: string;
    userId: string;
    startedAt: number;
  };
};

const SCHEMA_VERSION = 1;

class SessionsQuery extends Query<Session["default"]> {
  private localStorageTable = new LocalStorageTable<Session["default"]>(
    config.localStorageKeys.sessions,
    SCHEMA_VERSION,
  );

  public createAndInsert(
    id: string,
    userId: string,
  ): Session["default"] | null {
    if (this.existsById(id)) return null;
    const session = {
      id,
      userId,
      startedAt: Date.now(),
    };
    this.localStorageTable.push(session);
    return session;
  }

  public existsById(id: string) {
    const data = this.localStorageTable.getData();
    return data.some((s) => s.id === id);
  }

  public deleteById(id: string) {
    const data = this.localStorageTable.getData();
    this.localStorageTable.setData(data.filter((s) => s.id !== id));
  }

  public selectById(id: string) {
    const origin = this.externalSelect
      ? this.localStorageTable.getData()
      : this.buffer;
    this.setBuffer(origin.find((s) => s.id === id));
    return this;
  }

  private inDefaultPattern(): Session["default"][] {
    return structuredClone(this.buffer);
  }

  public get(): Session["default"][] {
    return this.inDefaultPattern();
  }

  public getUnique(): Session["default"] | undefined {
    return this.inDefaultPattern()[0];
  }
}

export { SessionsQuery };
