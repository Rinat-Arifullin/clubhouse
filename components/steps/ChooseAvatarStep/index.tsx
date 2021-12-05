import React from "react";
import clsx from "clsx";
import WhiteBlock from "components/WhiteBlock";
import Button from "components/Button";
import { StepInfo } from "components/StepInfo";
import Avatar from "components/Avatar";
import { AuthContext } from "pages";

import styles from "./ChooseAvatarStep.module.scss";
import { uploadFile } from "helpers/steps";

const ChooseAvatarStep: React.FC = () => {
  const { setFieldValue, onNextStep, user } = React.useContext(AuthContext);
  const avatarLetters = user?.fullname
    .split(" ")
    .map((s) => s[0])
    .join("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
      const data = await uploadFile(file);
      setFieldValue("avatarUrl", data.url);
    }
  };

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener("change", handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/celebration.png"
        title={`Okey${user?.fullname ? ", " + user.fullname : ""}`}
        description="How’s this photo?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={clsx("mb-20", styles.avatar)}>
          <Avatar
            width="120px"
            height="120px"
            src={user?.avatarUrl}
            letters={avatarLetters}
          />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={onNextStep}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

export default React.memo(ChooseAvatarStep);
