import { Command, DevNotesCommands } from "./types";
export class AddNotes extends Command {
  identifier = DevNotesCommands.addNotes;
  run(args: string[]): void {
    console.log("Add Notes!");
  }
}
