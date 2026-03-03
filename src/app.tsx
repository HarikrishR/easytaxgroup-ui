import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";

import Home from "./components/home/home.tsx";
import SignUp from "./components/signUp/signUp.tsx";
import SignIn from "./components/signIn/signIn.tsx";
import AboutUs from "./components/aboutUs/aboutUs.tsx";
import Services from "./components/services/services.tsx";
import ContactUs from "./components/contactUs/contactUs.tsx";
import Dashboard from "./components/dashboard/dashboard.tsx";
import PDFGenerate from "./components/pdfGeneration/pdfGenerate.tsx";
import FgtPwd from "./components/forgotPassword/fgtPwd.tsx";
import ProtectedRoute from "./protectedRoute.tsx";
import Toast from "./components/toast/toast.tsx";
import Loader from "./components/loader/loader.tsx";
import StripeCheckoutForm from "./components/payment/stripElement.tsx";
import UsDotApplication from "./components/usDotApplication/usDotApplication.tsx";
import BusinessRegistration from "./components/businessRegistration/businessRegistration.tsx";
import FormF1Visa from "./components/formF1Visa/formF1Visa.tsx";
import TaxPreparationFiling from "./components/services/taxPreparationFiling.tsx";
import SalesTaxRegistration from "./components/services/salesTaxRegistrationFiling.tsx";
import PayrollSetup from "./components/services/payrollSetupCompliance.tsx";
import BusinessRegistrationServices from "./components/services/businessRegistrationServices.tsx";
import Bookkeeping from "./components/services/bookkeepingServices.tsx";
import FmcsaCompliance from "./components/services/fmcsaCompliance.tsx";
import TaxGuideStudents from "./components/services/taxGuidanceForIndianStudents.tsx";

import { AuthContext } from "./authContext.tsx";

const App = () => {
  const loader = useSelector((state: { loader: boolean }) => state.loader);
  const { loading } = useSelector(
    (state: { clientSecretSettings: { loading: boolean } }) =>
      state.clientSecretSettings
  );
  const auth = useContext(AuthContext);

  return (
    <>
      <Toast />
      {!loading && <StripeCheckoutForm />}
      {loader && <Loader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/services/taxPreparationFiling" element={<TaxPreparationFiling />} />
        <Route path="/services/salesTaxRegistration" element={<SalesTaxRegistration />} />
        <Route path="/services/payrollSetup" element={<PayrollSetup />} />
        <Route path="/services/businessRegistration" element={<BusinessRegistrationServices />} />
        <Route path="/services/bookkeeping" element={<Bookkeeping />} />
        <Route path="/services/fmcsaCompliance" element={<FmcsaCompliance />} />
        <Route path="/services/taxGuideStudents" element={<TaxGuideStudents />} />

        <Route path="/fmcsacompliance" element={<UsDotApplication />} />
        <Route path="/businessRegService" element={<BusinessRegistration />} />
        <Route path="/taxfilling" element={<FormF1Visa />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/signIn" element={auth?.token ? <Dashboard /> : <SignIn />} />
        <Route path="/signUp" element={auth?.token ? <Dashboard /> : <SignUp />} />
        <Route path="/fgtPwd" element={auth?.token ? <Dashboard /> : <FgtPwd />} />
      </Routes>

      <PDFGenerate />
    </>
  );
};

export default App;
