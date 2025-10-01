import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";
import { AccountPage } from "../pages/AccountPage";

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
