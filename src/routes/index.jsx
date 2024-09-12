import { Routes, Route } from "react-router-dom";

import Home from "../views/home/index";
import Data from "../views/data/index";
import Setting from "../views/setting/index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/data" element={<Data />}></Route>
      <Route path="/setting" element={<Setting />}></Route>
    </Routes>
  );
}
