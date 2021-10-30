import React from "react";
import type { NextComponentType, NextPage } from "next";
import Head from "next/head";

import WelcomeStep from "@steps/WelcomeStep";
import EnterNameStep from "@steps/EnterNameStep";
import TwitterStep from "@steps/TwitterStep";
import ChooseAvatarStep from "@steps/ChooseAvatarStep";
import EnterPhoneStep from "@steps/EnterPhoneStep";
import EnterCodeStep from "@steps/EnterCodeStep";

interface IStepsComponents {
  [key: number]: NextComponentType;
}

const stepsComponent: IStepsComponents = {
  0: WelcomeStep,
  1: EnterNameStep,
  2: TwitterStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

interface IStepsContextProps {
  onNextStep: () => void;
  step: number;
}

export const StepsContext = React.createContext<IStepsContextProps>(
  {} as IStepsContextProps
);

const Home: NextPage = () => {
  const [step, setStep] = React.useState<number>(0);
  const StepComponent = stepsComponent[step];

  const onNextStep = () => {
    setStep((state) => state + 1);
  };

  return (
    <div>
      <Head>
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <StepsContext.Provider value={{ step, onNextStep }}>
        <StepComponent />
      </StepsContext.Provider>
    </div>
  );
};

export default Home;
