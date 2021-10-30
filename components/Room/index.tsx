import React from "react";
import Link from "next/link";
import Button from "components/Button";
import clsx from "clsx";

import styles from "./Room.module.scss";

interface IRoom {
  title: string;
}

const Room: React.FC<IRoom> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div
          className={clsx("d-flex align-items-center", styles.actionButtons)}
        >
          <Link href="/rooms">
            <Button color="gray" className={styles.leaveButton}>
              <img
                width={18}
                height={18}
                src="/static/peace.png"
                alt="Hand black"
              />
              Leave quietly
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;
