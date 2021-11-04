import React from "react";
import clsx from "clsx";
import WhiteBlock from "components/WhiteBlock";
import { StepInfo } from "components/StepInfo";

import styles from "./EnterNameStep.module.scss";

import Button from "components/Button";
import { StepsContext } from "pages";

const EnterNameStep: React.FC = () => {
  const { onNextStep, user } = React.useContext(StepsContext);
  const [inputValue, setInputValue] = React.useState<string>(
    user?.fullname ?? ""
  );

  const nextDisabled = !inputValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/man.png"
        title="What’s your full name?"
        description="People use real names on Clubhouse :) Thnx!"
      />
      <WhiteBlock className={clsx("m-auto", styles.whiteBlock)}>
        <div className="mb-30">
          <input
            onChange={handleChangeInput}
            value={inputValue}
            className="field"
            placeholder="Enter fullname"
          />
        </div>
        <Button disabled={nextDisabled} onClick={onNextStep}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

export default EnterNameStep;
