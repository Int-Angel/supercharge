import React from "react";
import "./style.scss";

interface Props {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  text,
  onClick = () => {},
  variant = "primary",
}: Props) {
  return (
    <button onClick={onClick} className={`ButtonZ ButtonZ--${variant}`}>
      {text}
    </button>
  );
}
