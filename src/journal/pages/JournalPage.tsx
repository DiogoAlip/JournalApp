import { JournalLayout } from "../../auth/layout/JournalLayout";
import { NoteView } from "../views/";

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>
  );
};
