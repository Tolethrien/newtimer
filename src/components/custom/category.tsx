import { useEffect, useRef, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import useTheme from "../hooks/useTheme";
import { Collapse } from "../utils/icons";
import ButtonAsIcon from "./buttonAsIcon";
const Category: React.FC<{
  name: string;
  overrideColor?: string;
  children?: React.ReactNode;
  extendedStyle?: StyledComponent<"div", any, {}, never>;
  extendedProps?: {};
}> = ({ name, children, extendedStyle, extendedProps, overrideColor }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    (children as []).length === 0
  );
  const divChildrenRef = useRef<HTMLDivElement>(null);

  const {
    coloredCategory,
    getColor: { categoryColor },
  } = useTheme();
  const isColored =
    overrideColor && coloredCategory !== "Mono" ? overrideColor : categoryColor;

  useEffect(() => {
    if ((children as []).length === 0) setIsCollapsed(true);
  }, [children]);

  return (
    <ComponentBody bodyColor={isColored} as={extendedStyle} {...extendedProps}>
      <TopBar bodyColor={isColored}>
        <TopBarName>{name}</TopBarName>
        <ButtonAsIcon
          extendedStyle={CollapseIcon}
          extendedProps={{ isCollapsed }}
          src={Collapse}
          onClick={() => setIsCollapsed((prev) => !prev)}
        />
      </TopBar>
      {!isCollapsed && (
        <TaskWrapper ref={divChildrenRef}>{children}</TaskWrapper>
      )}
    </ComponentBody>
  );
};
export default Category;

const ComponentBody = styled.div<{ bodyColor: string }>`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;

  :before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: calc(100% + 1rem);
    width: 5%;
    transition: 0.5s;
    background-color: ${({ bodyColor }) => bodyColor};
    border-radius: 0 0 5px 0;
  }
`;

const TaskWrapper = styled.div`
  width: 94%;
  z-index: 2;
  margin-top: 1.9rem;
`;
const CollapseIcon = styled.button<{ isCollapsed: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  transform: ${({ isCollapsed }) =>
    `rotate(${isCollapsed ? "0deg" : "180deg"})`};
`;
const TopBar = styled.div<{ bodyColor: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  left: 0;
  top: 0;
  height: 1.75rem;
  min-width: 6rem;
  padding-inline: 2%;
  transition: 0.5s;
  background-color: ${({ bodyColor }) => bodyColor};
  border-radius: 0 5px 5px 0;
`;
const TopBarName = styled.p`
  font-weight: 500;
`;
