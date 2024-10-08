import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addNewCheckbox } from "../../../../API/handleDocs";
import useTheme from "../../../hooks/useTheme";
import ButtonAsIcon from "../../../custom/buttonAsIcon";
import { CheckBoxEmpty, Trash } from "../../../utils/icons";
import { showFromOpacity } from "../../../styled/animations/showFromOpacity";
import { useClickOutside } from "../../../hooks/useClickOutside";
interface CheckboxTemplateProps {
  isTemplateTask: boolean;
  setIsTemplateTask: React.Dispatch<React.SetStateAction<boolean>>;
  referenceButton: React.MutableRefObject<HTMLButtonElement | null>;
}
const CheckboxTemplate: React.FC<CheckboxTemplateProps> = ({
  isTemplateTask,
  setIsTemplateTask,
  referenceButton,
}) => {
  const [checkboxName, setcheckboxName] = useState("");
  const {
    getColor: { itemCardColor, iconColor },
  } = useTheme();
  const { id: taskId } = useParams();
  const componentRef = useClickOutside({
    onClickOutside: () => {
      setIsTemplateTask(false);
    },
    state: isTemplateTask,
    outsideRef: referenceButton,
  });

  const createNewCheckbox = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (checkboxName.length !== 0) addNewCheckbox(taskId!, checkboxName);
    setIsTemplateTask(false);
  };

  return (
    <ComponentBody ref={componentRef} bodyColor={itemCardColor}>
      <BoxWrap>
        <Box
          checked={false}
          type="checkbox"
          icon={CheckBoxEmpty}
          iconColor={iconColor}
          readOnly
        ></Box>
      </BoxWrap>
      <NameForm onSubmit={(e) => createNewCheckbox(e)}>
        <NameInput
          autoFocus={true}
          placeholder="Name of Checkbox..."
          onChange={(e) => setcheckboxName(e.target.value)}
        ></NameInput>
      </NameForm>
      <ButtonAsIcon
        src={Trash}
        size={[1, 1]}
        margin="0 2%"
        onClick={() => setIsTemplateTask(false)}
      ></ButtonAsIcon>
    </ComponentBody>
  );
};
export default CheckboxTemplate;
const ComponentBody = styled.div<{ bodyColor: string }>`
  display: flex;
  padding-block: 0.5rem;
  margin-bottom: 0.1rem;
  background-color: ${({ bodyColor }) => bodyColor};
  animation: ${showFromOpacity} 0.5s normal forwards;

  backdrop-filter: blur(20px);
  border-radius: 5px;
  box-shadow: 2px 2px 4px 1px hsla(0, 0%, 0%, 0.25);
`;
const NameForm = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-left: 2%;
`;

const NameInput = styled.input`
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: 500;
  background: transparent;
  color: inherit;
  border: none;
  outline: none;
  ::placeholder {
    color: inherit;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2%;
`;
const Box = styled.input<{
  checked: boolean;
  icon: string;
  iconColor: string;
}>`
  appearance: none;
  width: 1rem;
  height: 1rem;
  background: ${({ icon }) => `url(${icon})`};
  background-size: cover;
  filter: ${({ iconColor }) => iconColor};
`;
