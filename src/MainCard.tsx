import { FC } from "react";
import { Work } from "./MainPage";

export const MainCard: FC<{ work: Work }> = ({ work }) => {
  return <div>{work.description}</div>;
};
