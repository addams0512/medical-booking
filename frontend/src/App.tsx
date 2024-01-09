import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ServicesPage from "./pages/services";
import ResoucesPage from "./pages/resources";
import NewsPage from "./pages/news";
import AboutPage from "./pages/about";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <ServicesPage />
            </Layout>
          }
        />
        <Route
          path="/resources"
          element={
            <Layout>
              <ResoucesPage />
            </Layout>
          }
        />
        <Route
          path="/news"
          element={
            <Layout>
              <NewsPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
