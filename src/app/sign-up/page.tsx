"use client";

import { useState } from "react";
import { EmailStep } from "./_features/email";
import { Password } from "./_features/password";

const SignUp = () => {
  const [step, setStep] = useState("email");
  const [userData, setUserData] = useState<string>("");

  if (step === "email")
    return <EmailStep setStep={setStep} setUserData={setUserData} />;
  return <Password userData={userData} />;
};

export default SignUp;
