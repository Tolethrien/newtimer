import styled from "styled-components";
import useDataFinder from "../../hooks/useDataFinder";
import { ProjectsData, TasksData } from "../../../API/getUserData";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Clock } from "../../utils/icons";
import Category from "../../custom/category";
import TaskDescriptionBox from "./taskDescriptionBox";
import { convertTimeToString } from "../../utils/timeConverters";
import TitleHeading from "../custom/titleHeading";
import DisplayText from "../../styled/components/displayText";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import Head from "../../custom/head";
import Checkboxes from "./checkboxes";
import TaskOptions from "./taskOptions";
import useTheme from "../../hooks/useTheme";
import useClock from "../../hooks/useClock";
import { vibrate } from "../../utils/vibrate";
const TaskOverview: React.FC = () => {
  const { id } = useParams();
  const task = useDataFinder<TasksData>(id);
  const {
    data: { color },
  } = useDataFinder<ProjectsData>(task?.data.projectID) ?? {
    data: { color: 1 },
  };
  const navigate = useNavigate();
  const {
    getColor: {
      categoryActive,
      categoryDone,
      categoryOnHold,
      projectCardColorTone,
    },
  } = useTheme();
  const { setClock } = useClock();
  const playTask = () => {
    setClock({
      project: task!.data.projectID,
      task: id!,
      time: task!.data.timeSpend,
    });
    vibrate("medium");
    navigate(`/timer`);
  };
  const headColorBasedOnProjectColor = `hsla(${color}, 27%, ${projectCardColorTone}, 1)`;

  if (!task) return <Navigate to="/projects" replace />;
  return (
    <>
      <Head overrideColor={headColorBasedOnProjectColor}>
        <TitleHeading />
        <DisplayText size={1}>
          {convertTimeToString(task.data.timeSpend)} spend on task so far
        </DisplayText>
        <DisplayText size={1} margin="0 0 0.5rem 0">
          expected {convertTimeToString(task.data.timeExpected)}
        </DisplayText>
        <ButtonWithIcon
          src={Clock}
          alt=""
          text="Start"
          onClick={playTask}
          animation="invert"
          extendedStyle={ButtonAbsolute}
        ></ButtonWithIcon>
      </Head>
      <AllCategories>
        {task.data.showDescription && (
          <Category name="Description" overrideColor={categoryActive}>
            <TaskDescriptionBox value={task.data.desc}></TaskDescriptionBox>
          </Category>
        )}
        {task.data.showCheckboxes && (
          <Category
            name={`Checkbox(${Object.keys(task.data.checkboxes).length})`}
            overrideColor={categoryDone}
          >
            <Checkboxes
              checkboxes={task.data.checkboxes}
              showComplete={task.data.showFinishedCheckboxes}
            />
          </Category>
        )}
        <Category name="Settings" overrideColor={categoryOnHold}>
          <TaskOptions task={task} />
        </Category>
      </AllCategories>
    </>
  );
};
export default TaskOverview;

const ButtonAbsolute = styled.button`
  position: absolute;
  right: 10%;
  bottom: 10%;
`;

const AllCategories = styled.div`
  width: 100%;
  padding-top: 5%;
  margin-top: -0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
`;
