import { Routes, Route } from "react-router-dom";

import Home from "../views/home/index";
import GroupDataIndex from "../views/group-data/index";
import GroupDataShow from "../views/group-data/show";
import Generator from "../views/generator";
import Setting from "../views/setting/index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/groups" element={<GroupDataIndex />}></Route>
      <Route path="/group/:slug" element={<GroupDataShow />}></Route>
      <Route path="/generator" element={<Generator />}></Route>
      <Route path="/setting" element={<Setting />}></Route>
    </Routes>
  );
}
