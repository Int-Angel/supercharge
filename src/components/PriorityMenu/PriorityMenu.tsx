import React from "react";
import { Flag } from "react-feather";
import "./style.scss";
import { Check } from "react-feather";

interface Props {
  onClick: (priority: number) => void;
  selectedPriority: number;
}

export default function PriorityMenu({
  onClick,
  selectedPriority,
}: Props): JSX.Element {
  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className="PriorityMenuContainer" onClick={handleClick}>
      <div
        className="PriorityMenu__item"
        onClick={() => {
          onClick(0);
        }}
      >
        <Flag color="#2F2F2F" strokeWidth={2} size={16} />
        <p>Priority 0</p>
        {selectedPriority === 0 ? (
          <div className="PriorityMenu__item__selected">
            <Check size={18} strokeWidth={2} color={"#2F2F2F"} />
          </div>
        ) : (
          <div className="PriorityCheckPlaceholder" />
        )}
      </div>
      <div
        className="PriorityMenu__item"
        onClick={() => {
          onClick(1);
        }}
      >
        <Flag color={"#5d7bff"} strokeWidth={2} size={16} />
        <p>Priority 1</p>
        {selectedPriority === 1 ? (
          <div className="PriorityMenu__item__selected">
            <Check size={18} strokeWidth={2} color={"#2F2F2F"} />
          </div>
        ) : (
          <div className="PriorityCheckPlaceholder" />
        )}
      </div>
      <div
        className="PriorityMenu__item"
        onClick={() => {
          onClick(2);
        }}
      >
        <Flag color={"#fccf5c"} strokeWidth={2} size={16} />
        <p>Priority 2</p>
        {selectedPriority === 2 ? (
          <div className="PriorityMenu__item__selected">
            <Check size={18} strokeWidth={2} color={"#2F2F2F"} />
          </div>
        ) : (
          <div className="PriorityCheckPlaceholder" />
        )}
      </div>
      <div
        className="PriorityMenu__item"
        onClick={() => {
          onClick(3);
        }}
      >
        <Flag color={"#ff1010"} strokeWidth={2} size={16} />
        <p>Priority 3</p>
        {selectedPriority === 3 ? (
          <div className="PriorityMenu__item__selected">
            <Check size={18} strokeWidth={2} color={"#2F2F2F"} />
          </div>
        ) : (
          <div className="PriorityCheckPlaceholder" />
        )}
      </div>
    </div>
  );
}
