import { Note } from "../store/journal";

export const noteData = (notes: Note[]) => {
  return notes.reduce(
    (acc, note) => {
      if (
        (note.body === undefined,
        note.title === undefined,
        note.date === undefined)
      ) {
        acc.totalNotesLength -= 1;
        return acc;
      }
      acc.totalBodyNotesLength += note.body.length;
      acc.totalTitleNotesLength += note.title.length;
      acc.totalNotesLength += note.body.length + note.title.length;

      acc.oldestNote = acc.oldestNote
        ? Math.min(acc.oldestNote, note.date)
        : note.date;

      acc.newestNote = acc.newestNote
        ? Math.max(acc.newestNote, note.date)
        : note.date;

      return acc;
    },
    {
      totalNotesLength: 0,
      totalTitleNotesLength: 0,
      totalBodyNotesLength: 0,
      oldestNote: 0,
      newestNote: 0,
    }
  );
};
