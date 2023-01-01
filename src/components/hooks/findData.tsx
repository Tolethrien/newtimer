import { appContext } from "../providers/appProvider";
import { useContext } from "react";

const FindData = (id: string | undefined) => {
  const { userData } = useContext(appContext);
  let findProject = userData.find((e) => e.id === id);
  if (findProject) return findProject;
  let filteredProject = userData.find((el) =>
    el.tasks.find((e) => e.id === id)
  );
  if (filteredProject) return filteredProject.tasks.find((e) => e.id === id);
  console.error("cant find project or task with this ID");
  return undefined;
};
export default FindData;
