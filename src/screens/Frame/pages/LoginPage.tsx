import { CheckCircle2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Header from "../../../components/ui/header";


export const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState("yogavwijaya@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid && value.length > 0);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValid && password.length > 0) {
      console.log("Login attempt:", { email, password });
      // Навигация на /dashboard после успешной авторизации
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start gap-1 bg-[#1a1a1b] relative w-full overflow-hidden">
      <div className="flex items-center relative w-full min-h-screen">
        <div className="flex items-center gap-[84px] px-[90px] py-[162px] flex-1 self-stretch grow bg-[#1a1a1b] border-t [border-top-style:solid] border-[#949494] flex-col relative max-md:gap-[40px] max-md:px-[20px] max-md:py-[40px] max-md:justify-center">
          <div className="flex items-end justify-center gap-2 max-md:gap-0 max-md:justify-center max-md:w-full">
            <img
              className="w-[123px] h-[59px] max-md:w-[53px] max-md:h-[26px]"
              alt="Group"
              src="/group-1-7.svg"
            />

            <div className="[font-family:'PaluiSPDemo-Bold',Helvetica] font-bold text-[#ffffff] text-[42px] max-md:text-[18px] tracking-[0] leading-[normal] whitespace-nowrap">
              AVIAPIC
            </div>
          </div>

          <div className="flex-col w-[607px] max-md:w-full max-md:px-4 gap-[30px] flex-[0_0_auto] flex items-center relative">
            <header className="flex flex-col items-start justify-center gap-2 relative self-stretch w-full flex-[0_0_auto] max-md:items-center">
              <h1 className="relative self-stretch mt-[-1.00px] [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-3xl max-md:text-2xl tracking-[0] leading-[39px] max-md:text-start">
                Sign In
              </h1>
            </header>

            <form onSubmit={handleSubmit} className="flex-col gap-6 self-stretch w-full flex-[0_0_auto] flex items-center relative">
              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                {/* Email Input */}
                <div className="flex-[0_0_auto] flex flex-col items-start gap-1.5 relative self-stretch w-full">
                  <div className="flex-col items-start gap-1 self-stretch w-full flex-[0_0_auto] flex relative">
                    <Label className="relative w-fit [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                      Email
                    </Label>
                  </div>

                  <div className={`h-[52px] gap-1 p-4 self-stretch w-full border-[1.6px] border-solid flex items-center relative rounded-xl transition-all ${
                    emailValid && email.length > 0
                      ? "border-[#09b9d9] bg-[#09b9d9]/5"
                      : "border-[#d1d1d1]"
                  }`}>
                    <div className="items-center gap-2 flex-1 grow flex relative">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="Введи email"
                        className="relative flex-1 [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px] bg-transparent border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#949494]"
                      />
                    </div>

                    {emailValid && email.length > 0 && (
                      <CheckCircle2Icon className="relative w-6 h-6 text-[#09b9d9] flex-shrink-0" />
                    )}
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex-[0_0_auto] flex flex-col items-start gap-1.5 relative self-stretch w-full">
                  <div className="flex-col items-start gap-1 self-stretch w-full flex-[0_0_auto] flex relative">
                    <Label className="relative w-fit [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-[#f6f6f6] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                      Password
                    </Label>
                  </div>

                  <div className={`h-[52px] gap-1 p-4 self-stretch w-full border-[1.6px] border-solid flex items-center relative rounded-xl transition-all ${
                    password.length > 0
                      ? "border-[#09b9d9] bg-[#09b9d9]/5"
                      : "border-[#d1d1d1]"
                  }`}>
                    <div className="items-center gap-2 flex-1 grow flex relative">
                      <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Введи пароль"
                      className="flex-1 bg-transparent border-0 text-[#f6f6f6] placeholder:text-[#949494] p-0 focus:ring-0 [font-family:'PPNeueMachina-Regular',Helvetica]"
                      />
                    </div>

                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex-shrink-0 relative w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#949494] hover:text-[#f6f6f6] transition-colors"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-6 h-6" />
                      ) : (
                        <EyeOffIcon className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 self-stretch w-full relative flex-[0_0_auto]">
                <Button
                  type="submit"
                  disabled={!emailValid || password.length === 0}
                  className="flex justify-center gap-1.5 px-6 py-3 self-stretch w-full flex-[0_0_auto] bg-[#09BAD9] rounded-xl items-center relative disabled:cursor-not-allowed h-auto"
                >
                  <span className="relative w-full [font-family:'PPNeueMachina-Regular',Helvetica] font-normal text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                    Sign In
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};