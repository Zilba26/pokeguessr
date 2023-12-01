import { isRouteErrorResponse, useRouteError } from "react-router-dom"

const Redirect: React.FC = () => {

    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
      window.location.href = '/'
    }
    return (
      <div>
        <h1>Redirect</h1>
      </div>
    )
  }

export default Redirect