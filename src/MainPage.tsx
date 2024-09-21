import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div>
      <Link to={"/admin"}>to admin</Link>
    </div>
  );
};
