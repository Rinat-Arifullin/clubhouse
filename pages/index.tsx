import React from "react";
import type { NextComponentType, NextPage } from "next";
import Head from "next/head";

import WelcomeStep from "@steps/WelcomeStep";
import EnterNameStep from "@steps/EnterNameStep";
import TwitterStep from "@steps/TwitterStep";
import ChooseAvatarStep from "@steps/ChooseAvatarStep";
import EnterPhoneStep from "@steps/EnterPhoneStep";
import EnterCodeStep from "@steps/EnterCodeStep";
import GitHubStep from "components/steps/GitHubStep";

interface IStepsComponents {
  [key: number]: NextComponentType;
}

export interface IUser {
  id: number;
  fullname: string;
  avatarUrl?: string;
  isActive: number;
  username: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
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

interface IAuthContextProps {
  onNextStep: () => void;
  step: number;
  user?: IUser;
  setUser: (user: IUser) => void;
}

export const StepsContext = React.createContext<IAuthContextProps>(
  {} as IAuthContextProps
);

const Home: NextPage = () => {
  const [step, setStep] = React.useState<number>(0);
  const [user, setUser] = React.useState<IUser>();
  const StepComponent = stepsComponent[step];

  const onNextStep = () => {
    setStep((state) => state + 1);
  };

  return (
    <div>
      <Head>
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <StepsContext.Provider value={{ step, onNextStep, user, setUser }}>
        <StepComponent />
      </StepsContext.Provider>
    </div>
  );
};

export default Home;
