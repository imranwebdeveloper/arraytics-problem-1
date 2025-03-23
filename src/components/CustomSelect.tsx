import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option) => void;
  placeholder?: string;
  color: string;
}

const CustomSelect = ({
  options = [],
  value,
  onChange,
  color,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)} color={color}>
        {value ? value.label.slice(0, 25).concat("...") : "Select an option"}
        <Arrow>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</Arrow>
      </DropdownHeader>
      <DropdownList isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              setIsOpen(false);
              onChange(option);
            }}
            color={color}
            isActive={option.value === value?.value}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default CustomSelect;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div<{ color: string }>`
  padding: 6px;
  background: #fff;
  border: 1px solid ${({ color }) => color};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ color }) => color};
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  /* border-radius: 5px; */
  /* margin-top: 5px; */
  list-style: none;
  padding: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.li<{ isActive: boolean; color: string }>`
  padding: 8px;
  cursor: pointer;
  text-align: start;
  color: ${({ isActive, color }) => (isActive ? color : "inherit")};
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #f4f4f4;
  }
`;

const Arrow = styled.span`
  font-size: 12px;
`;
