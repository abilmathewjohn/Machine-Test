import { BrowserRouter, Routes, Route } from "react-router";
import Form from "./Form";
import Dashboard from "./Dashboard";
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path = "/" element={<Form />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
