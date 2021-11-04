import clsx from "clsx";
// import Cookies from "js-cookie";
import WhiteBlock from "components/WhiteBlock";
import Button from "components/Button";
import { StepInfo } from "components/StepInfo";

import styles from "./GitHubStep.module.scss";
import React from "react";
import { AuthContext } from "@pages";

const GitHubStep: React.FC = () => {
  const { onNextStep, setUser } = React.useContext(AuthContext);
  const onClickAuth = () => {
    window.open(
      "http://localhost:3001/auth/github",
      "Auth",
      "width=1000px,height=600,status=yes,toolbar=no,location=no"
    );
  };

  React.useEffect(() => {
    window.addEventListener("message", ({ data, origin }) => {
      const { port } = new URL(origin);
      if (port === "3001") {
        setUser(data);
        onNextStep();
      }
      // if (typeof user === "string" && user.includes("avatarUrl")) {
      // Cookies.remove("token");
      // const json: UserData = JSON.parse(user);
      // setUserData(json);
      // onNextStep();
      // Cookies.set("token", json.token);
      // }
    });
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/connect.png"
        title="Do you want import info from GitHub?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <Button
          onClick={onClickAuth}
          className={clsx(styles.button, "d-i-flex align-items-center")}
        >
          <img className="d-ib mr-10" src="/static/github.svg" />
          Import from GitHub
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
        <div className="link mt-20 cup d-ib" onClick={onNextStep}>
          Enter my info later manually
        </div>
      </WhiteBlock>
    </div>
  );
};
export default GitHubStep;
