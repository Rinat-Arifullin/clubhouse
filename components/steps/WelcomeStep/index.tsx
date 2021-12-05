import React from "react";
import { AuthContext } from "pages";
import Button from "components/Button";
import WhiteBlock from "components/WhiteBlock";
import styles from "./WelcomeStep.module.scss";

const WelcomeStep: React.FC = () => {
  const { onNextStep } = React.useContext(AuthContext);

  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>
        <img
          className={styles.handWaveImg}
          src="/static/hand-wave.png"
          alt="Celebration"
        />
        Welcome to Clubhouse
      </h3>
      <p>
        We're working hard to het Clubhouse ready for everyone! While we wrap up
        the finishing youches, we're adding people gradually to mkae sure
        nothing breaks :)
      </p>
      <div>
        <Button onClick={onNextStep}>
          Get your username
          <img className="ml-5" src="/static/arrow.svg" />
        </Button>
      </div>
      <div className="link mt-15 cup d-ib">Have an invite text? Sign in</div>
    </WhiteBlock>
  );
};

export default WelcomeStep;
