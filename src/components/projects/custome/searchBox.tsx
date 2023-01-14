import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../providers/appProvider";
import DisplayIcon from "../../styled/displayIcon";
import { Loop } from "../../utils/icons";

interface SearchBoxProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  placeholder?: string;
}
const SearchBox: React.FC<SearchBoxProps> = ({
  onChange,
  value,
  placeholder = "search...",
}) => {
  return (
    <ComponentBody>
      <DisplayIcon src={Loop} alt="search Icon"></DisplayIcon>
      <SearchBoxInput
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      ></SearchBoxInput>
    </ComponentBody>
  );
};
export default SearchBox;
const ComponentBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  max-width: 50%;
  height: 100%;
`;
const SearchBoxInput = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;
  color: inherit;

  :focus {
    outline: none;
  }
  ::placeholder {
    color: inherit;
    font-weight: 600;
  }
`;
