export class InMemorySessionStore {
  private googleIds: Set<string>;

  constructor() {
    this.googleIds = new Set<string>();
  }

  public containsGoogleId(id: string): boolean {
    return this.googleIds.has(id);
  }

  public setGoogleId(id: string): void {
    this.googleIds.add(id);
    return;
  }
}
