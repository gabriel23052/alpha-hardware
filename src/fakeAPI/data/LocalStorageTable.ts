type LocalStorageData<T extends object> = {
  version: number;
  data: T[];
};

const PREFIX = "fakeAPI-";

class LocalStorageTable<T extends object> {
  private key: string;
  private version: number;
  private data: T[];

  constructor(key: string, version: number) {
    this.key = PREFIX + key;
    this.version = version;
    const json = localStorage.getItem(this.key);
    if (!json) {
      localStorage.setItem(
        this.key,
        JSON.stringify({ version: this.version, data: [] }),
      );
      this.data = [];
      return;
    }
    const dataFromLocalStorage = JSON.parse(json) as LocalStorageData<T>;
    if (dataFromLocalStorage.version !== this.version) {
      localStorage.setItem(
        this.key,
        JSON.stringify({ version: this.version, data: [] }),
      );
      this.data = [];
      return;
    }
    this.data = dataFromLocalStorage.data;
  }

  private save() {
    localStorage.setItem(
      this.key,
      JSON.stringify({
        version: this.version,
        data: this.data,
      }),
    );
  }

  public push(data: T) {
    this.data.push(data);
    this.save();
  }

  public setData(data: T[]) {
    this.data = data;
    this.save();
  }

  public getData() {
    return this.data;
  }
}

export { LocalStorageTable };
