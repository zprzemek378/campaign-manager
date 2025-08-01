import { API_URL } from "@shared/constants";
import { User } from "@shared/types";

function App() {
  const user: User = {
    id: 4,
    name: "John",
  };
  return (
    <>
      {user.name} {API_URL}
    </>
  );
}

export default App;
