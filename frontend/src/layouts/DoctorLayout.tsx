import React from "react";
import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { RiBillLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import { logOut } from "../lib/action";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const DoctorLayout = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(logOut, {
    onSuccess: async () => {
      toast.success("Log Out!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/log-in");
    },
    onError: (errors: Error) => {
      toast.error(errors.message);
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <div className="bg-gradient-to-tl from-[#D1FFD7] to-[#F5FFF7] min-h-screen flex flex-col justify-center items-center px-[64px]">
      <div className="flex bg-white w-full h-[800px] rounded-2xl">
        {/* nav bar */}
        <div className="flex flex-col px-[24px] py-[32px] gap-[32px] bg-[#628D71] h-full w-[260px] rounded-s-2xl text-[#BBC8CA]">
          <div className="text-[32px] flex justify-start items-center gap-2">
            <LiaFileMedicalAltSolid />
            <span className="text-xl font-bold">HealBook</span>
          </div>
          <div className="border-b border-[#D6DEDF] flex border-[1px] border-opacity-75"></div>
          <div className="flex flex-col justify-center items-start gap-[32px]">
            <div className="flex items-center gap-4 text-2xl">
              <RxDashboard />
              <span className="text-[16px]">Dashboard</span>
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <RiBillLine />
              <span className="text-[16px]">Appointments</span>
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <IoPeopleOutline />
              <span className="text-[16px]">Patients</span>
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <MdOutlineMessage />
              <span className="text-[16px]">Messages</span>
            </div>
            <div className="flex items-center gap-4 text-2xl">
              <IoNotificationsOutline />
              <span className="text-[16px]">Notifications</span>
            </div>
          </div>
          <div className="border-b border-[#D6DEDF] flex border-[1px] border-opacity-75 "></div>
          <div className="flex flex-col gap-[32px]">
            <div className="flex items-center gap-4 text-2xl">
              <IoSettingsOutline />
              <span className="text-[16px]">Setting</span>
            </div>
            <div
              className="flex items-center gap-4 text-2xl cursor-pointer"
              onClick={handleLogout}
            >
              <MdLogout />
              <span className="text-[16px]">Logout</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full p-[32px]">
          <div className="flex gap-3 text-[40px] items-center justify-end">
            <RxAvatar />
            <div className="flex flex-col">
              <p className="text-base text-black">Jude Bellingham</p>
              <p className="text-sm text-[#808080]">Dentist</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
