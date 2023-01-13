import styled from "styled-components";
import Footer from "./components/footer/footer";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Calendar from "./pages/calendar";
import Timer from "./pages/timer";
import Data from "./pages/data";
import Projects from "./pages/projects";
import Options from "./pages/options";
import { Routes, Route } from "react-router-dom";
import Clock from "./components/providers/clockProvider";
import useStore from "./components/hooks/useStore";
//=======TYPES========
interface styleProps {
  // height: number;
  textColor: string;
}
//=======COMPONENT========
function App() {
  // const height = window.innerHeight;
  const {
    text: { textColor },
    primary: { primaryColor },

    userData,
  } = useStore("app");
  // document
  //   .querySelector('meta[name="theme-color"]')!
  //   .setAttribute("content", `hsla(${primaryColor}, 20%, 74%, 1)`);
  // //
  return (
    <MainBody textColor={textColor}>
      <>
        <Clock>
          <Routes>
            <Route path={"/"} element={<Dashboard />}></Route>
            <Route path={"/timer"} element={<Timer />}></Route>
            <Route path={"/calendar"} element={<Calendar />}></Route>
            <Route path={"/data"} element={<Data />}></Route>
            <Route path={"/projects/*"} element={<Projects />}></Route>
            <Route path={"/options"} element={<Options />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
          </Routes>
        </Clock>
        <Footer />
      </>
    </MainBody>
  );
}
export default App;
//=======STYLES========
const MainBody = styled.main<styleProps>`
  position: relative;
  color: ${({ textColor }) => textColor};
  width: 100vw;
  max-width: 420px;
  height: 100vh;
  background: hsla(220, 95%, 88%, 1);
  margin: auto;
  overflow: hidden;
  background-image: url("./LofiMain.jpg");
  background-size: cover;
  overflow-y: auto;
`;
