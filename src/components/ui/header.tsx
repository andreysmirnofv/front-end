import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onClose?: () => void;
}

export const Header = ({ onClose }: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-2">
      <div
        className="inline-flex items-end gap-[5px] cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img
          className="w-[53.53px] h-[26px]"
          alt="Group"
          src="/group-1-7.svg"
        />
        <div className="[font-family:'PaluiSPDemo-Bold',Helvetica] font-bold text-[#ffffff] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
          AVIAPIC
        </div>
      </div>

      {/* КНОПКА ЗАКРЫТИЯ — закрывает sidebar */}
      <img
        className="w-6 h-6 text-white cursor-pointer"
        alt="Close"
        src="/panel-close.svg"
        onClick={onClose}
      />
    </header>
  );
};

export default Header;