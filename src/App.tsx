import { useGlobalContext } from "./context/GlobalContext/useContext";
import { V2Router } from "./v2/Routes/routes";
import { V1Router } from "./v1/Routes/routes";

function App() {
  const { pageVersion } = useGlobalContext();

  return pageVersion === "v2" ? <V2Router /> : <V1Router />;
}

export default App;
