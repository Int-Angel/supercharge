import React from "react";
import "./style.scss";
import { X } from "react-feather";

interface Props {
  text: string;
  icon: any;
  iconColor?: string;
  initialSelection?: number;
  onClick?: any;
  onClear?: () => void;
}

export default function DropDownButton({
  text,
  icon: Icon,
  iconColor,
  initialSelection,
  onClick,
  onClear,
}: Props) {
  return (
    <div className="DropDownButton_Container" onClick={onClick}>
      <div className="DropDownButton_Icon">
        <Icon size={12} strokeWidth={2} color={iconColor} />
      </div>
      <div>
        <p
          style={{
            color: initialSelection === -1 ? "#676767" : "#2F2F2F",
            fontWeight: initialSelection === -1 ? "normal" : "bold",
            fontSize: 12,
          }}
        >
          {text}
        </p>
      </div>

      {onClear && initialSelection !== -1 && (
        <div
          className="DropDownButton_Clear_Button"
          onClick={(e) => {
            e.stopPropagation();
            if (onClear) {
              onClear();
            }
          }}
        >
          <X size={12} strokeWidth={2} color={"#676767"} />
        </div>
      )}
    </div>
  );
}
