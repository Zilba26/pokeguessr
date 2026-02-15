import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import Header from "./components/navbar/Navbar";

const Redirect: React.FC = () => {

    const error = useRouteError();
    console.error(error);
    if (isRouteErrorResponse(error)) {
      window.location.href = '/'
    }
    return (
      <div>
        <Header showGameLinks={false}></Header>
        <h1>Redirect</h1>
      </div>
    )
  }

export default Redirect