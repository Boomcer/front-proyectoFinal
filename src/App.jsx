import Footer from "./components/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./css/general.css";
import RoutesTwo from "./routes/RoutesTwo";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="">
        <Routes>
          <Route path="/*" element={<RoutesTwo />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
