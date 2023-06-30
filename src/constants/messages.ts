/* eslint-disable @typescript-eslint/naming-convention */
export const messages = {
  common: {
    workspace: "Workspace",
    global: "Global",
    activationLog: "Congratulations, your extension DevNotes is now active!",
    deactivationLog: "DevNotes deactivated",
  },
  activate: {
    message: "DevNotes Activated!\n Set storage path for Workspace or Global?",
  },
  addNotes: {
    noteName: "NoteName",
    noteNameCreateNewNote: "Create a new note",
    noteNameInputPlaceholder: "Enter note name",
    successMessage: "DevNotes: Addeds notes for <noteName>",
    noteContentInputTitle: "Description",
  },
  deleteNote: {
    confirmMessage: "Deleted Note: <noteName>",
  },
  stateManager: {
    setWorkspaceStoragePath:
      "Workspace Storage path set to <path>. Please reload the window.",
    setGlobalStoragePath:
      "Global Storage path set to <path>. Please reload the window.",
    storagePathNotSet: "Storage path not set",
  },
};
