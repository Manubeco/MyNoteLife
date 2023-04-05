import { Routes, Route } from "react-router-dom";

import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";
import { Edit } from "../pages/Edit";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}
