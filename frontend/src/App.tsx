import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientLayout from "./layouts/PatientLayout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ServicesPage from "./pages/services";
import HomePage from "./pages/homepage";
import DoctorLayout from "./layouts/DoctorLayout";
import AdminLayout from "./layouts/AdminLayout";
import DoctorPage from "./pages/doctorpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PatientLayout>
              <HomePage />
            </PatientLayout>
          }
        />
        <Route
          path="/log-in"
          element={
            <PatientLayout>
              <Login />
            </PatientLayout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PatientLayout>
              <Signup />
            </PatientLayout>
          }
        />
        <Route
          path="/doctor-page"
          element={
            <DoctorLayout>
              <DoctorPage />
            </DoctorLayout>
          }
        />
        <Route
          path="/patient-page"
          element={
            <PatientLayout>
              <ServicesPage />
            </PatientLayout>
          }
        />
        <Route
          path="/admin-page"
          element={
            <AdminLayout>
              <ServicesPage />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
