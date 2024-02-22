import React from "react";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="bg-gradient-to-tl from-[#D1FFD7] to-[#F5FFF7] min-h-screen flex flex-col justify-center items-center">
      {children}
      This is for admin role
    </div>
  );
};

export default AdminLayout;
