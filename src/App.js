import React from "react";
import Mainpage from "./pages/Mainpage";
import Form from "./pages/Form";
import Error from "./pages/Error";
import Complete from "./pages/Complete";
import Test from "./pages/test";
import Mcaotmcap from "./pages/Mcaotmcap";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/Complete" element={<Complete />} />
            <Route path="/test" element={<Test />} />
            <Route path="/Mcaotmcap" element={<Mcaotmcap />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
