import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

interface Props {
  children: React.ReactNode;
}

const PatientLayout = ({ children }: Props) => {
  return (
    <div className="bg-gradient-to-tl from-[#D1FFD7] to-[#F5FFF7] min-h-screen flex flex-col justify-center items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PatientLayout;
