import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const backgroundImage = 'url("/src/assets/background-image.jpg")';
  const containerStyle: React.CSSProperties = {
    backgroundImage: backgroundImage,
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
      style={containerStyle}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
