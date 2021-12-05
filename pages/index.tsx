import React from "react";
import type { NextComponentType, NextPage } from "next";
import Head from "next/head";

import WelcomeStep from "@mySteps/WelcomeStep";
import EnterNameStep from "@mySteps/EnterNameStep";
import TwitterStep from "@mySteps/TwitterStep";
import ChooseAvatarStep from "@mySteps/ChooseAvatarStep";
import EnterPhoneStep from "@mySteps/EnterPhoneStep";
import EnterCodeStep from "@mySteps/EnterCodeStep";
import GitHubStep from "@mySteps/GitHubStep";

// to entites
interface IStepsComponents {
  [key: number]: NextComponentType;
}

// to entites
export interface IUser {
  id: number;
  fullname: string;
  avatarUrl?: string;
  isActive: number;
  username?: string;
  phone: string;
  token?: string;
}

const stepsComponent: IStepsComponents = {
  0: WelcomeStep,
  1: GitHubStep,
  // 2: TwitterStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

// to entites
interface IAuthContextProps {
  step: number;
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  onNextStep: () => void;
  onPrevStep: () => void;
  setFieldValue: (field: keyof IUser, value: string) => void;
}

export const AuthContext = React.createContext<IAuthContextProps>(
  {} as IAuthContextProps
);

const Home: NextPage = () => {
  const [step, setStep] = React.useState<number>(0);
  const [user, setUser] = React.useState<IUser>();
  const StepComponent = stepsComponent[step];

  const onNextStep = () => {
    setStep((state) => state + 1);
  };

  const onPrevStep = () => {
    setStep((state) => state - 1);
  };

  const setFieldValue = (field: string, value: string) => {
    setUser(
      (state) =>
        ({
          ...state,
          [field]: value,
        } as IUser)
    );
  };

  return (
    <div>
      <Head>
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <AuthContext.Provider
        value={{ user, step, setUser, onNextStep, onPrevStep, setFieldValue }}
      >
        <StepComponent />
      </AuthContext.Provider>
    </div>
  );
};

export default Home;
