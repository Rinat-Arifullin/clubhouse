import React from "react";
import Link from "next/link";

interface IBackButton {
  title: string;
  href: string;
}

const BackButton: React.FC<IBackButton> = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <div className="d-flex cup">
          <img src="/static/back-arrow.svg" alt="back" className="mr-10" />
          <h3>{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default BackButton;
