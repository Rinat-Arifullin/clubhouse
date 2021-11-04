import React from "react";
import clsx from "clsx";
import WhiteBlock from "components/WhiteBlock";
import Button from "components/Button";
import { StepInfo } from "components/StepInfo";
import Avatar from "components/Avatar";
import { AuthContext } from "pages";

import styles from "./ChooseAvatarStep.module.scss";
// "https://batman-on-film.com/wp-content/uploads/2021/10/THEBATMAN-batman-poster-dcfd21-banner2-534x400.jpg"
const ChooseAvatarStep: React.FC = () => {
  const { setFieldValue, onNextStep, user } = React.useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = React.useState<string>(
    user?.avatarUrl ?? ""
  );

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = (event: Event): void => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      setFieldValue("avatarUrl", imageUrl);
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
        title="Okay, Rinat Arifullin!"
        description="How’s this photo?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar width="120px" height="120px" src={avatarUrl} />
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

export default ChooseAvatarStep;
