import { v4 } from 'uuid';

const uuid = v4;

export class InMemorySessionStore {
  private users: Map<string, string>;
  private googleIds: Map<string, string>;

  constructor() {
    this.users = new Map<string, string>();
    this.googleIds = new Map<string, string>();
  }

  public containsGoogleId(googleId: string): boolean {
    return this.users.has(googleId);
  }

  public setGoogleId(googleId: string): void {
    const _id = uuid();
    this.users.set(googleId, _id);
    this.googleIds.set(_id, googleId);
  }

  public getUser(googleId: string) {
    return this.users.get(googleId);
  }

  public getGoogleId(_id: string) {
    return this.googleIds.get(_id);
  }
}
