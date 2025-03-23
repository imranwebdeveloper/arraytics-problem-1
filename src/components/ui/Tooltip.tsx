import styled from "@emotion/styled";
import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const TooltipWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TooltipText = styled.div<{ position: string; visible: boolean }>`
  position: absolute;
  background: #fff;
  color: #000;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-size: 12px;
  width: 200px;
  white-space: wrap;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  z-index: 1000;
  text-align: start;

  ${({ position }) =>
    position === "top"
      ? `bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;`
      : position === "bottom"
      ? `top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;`
      : position === "left"
      ? `right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px;`
      : `left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px;`};

  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    ${({ position }) =>
      position === "top"
        ? `border-width: 6px 6px 0 6px; border-color: #fff transparent transparent transparent; bottom: -6px; left: 50%; transform: translateX(-50%);`
        : position === "bottom"
        ? `border-width: 0 6px 6px 6px; border-color: transparent transparent #fff transparent; top: -6px; left: 50%; transform: translateX(-50%);`
        : position === "left"
        ? `border-width: 6px 0 6px 6px; border-color: transparent transparent transparent #fff; right: -6px; top: 50%; transform: translateY(-50%);`
        : `border-width: 6px 6px 6px 0; border-color: transparent #fff transparent transparent; left: -6px; top: 50%; transform: translateY(-50%);`};
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const Tooltip = ({ text, position = "top", children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <TooltipText
        position={position}
        visible={visible}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </TooltipWrapper>
  );
};

export default Tooltip;
