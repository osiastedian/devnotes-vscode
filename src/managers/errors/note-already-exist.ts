export class NoteAlreadyExistError extends Error {
  constructor(noteName: string) {
    super(`Note ${noteName} already exist`);
  }
}
