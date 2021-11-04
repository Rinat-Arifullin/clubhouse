import React from "react";
import clsx from "clsx";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import WhiteBlock from "components/WhiteBlock";
import Button from "components/Button";
import { StepInfo } from "components/StepInfo";

import styles from "./EnterPhoneStep.module.scss";
import { AuthContext } from "pages";

interface IInputValueState {
  formattedValue: string;
  value: string;
}

const EnterPhoneStep: React.FC = () => {
  const { setFieldValue, onNextStep, user } = React.useContext(AuthContext);

  const [values, setValues] = React.useState<IInputValueState>({
    value: user?.phone.length ? user?.phone : "",
  } as IInputValueState);

  const nextDisabled =
    !values.formattedValue || values.formattedValue.includes("_");

  const onChangeInput = (inputProps: NumberFormatValues) => {
    const { formattedValue, value } = inputProps;
    setValues({ formattedValue, value });
  };

  const onNext = () => {
    setFieldValue("phone", values.formattedValue);
    onNextStep();
  };

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/phone.png"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
        <div className={clsx("mb-30", styles.input)}>
          <img src="/static/russian-flag.png" alt="flag" width={24} />
          <NumberFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 333-22-11"
            value={values.value}
            onValueChange={onChangeInput}
          />
        </div>
        <Button disabled={nextDisabled} onClick={onNext}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
        <p className={clsx(styles.policyText, "mt-30")}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </div>
  );
};

export default EnterPhoneStep;
