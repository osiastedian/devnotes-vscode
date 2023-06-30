export class NoteNotFound extends Error {
  constructor(noteName: string) {
    super(`Note ${noteName} not found`);
  }
}
