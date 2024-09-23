import { FC } from "react";
import { Work } from "./MainPage";

export const MainCard: FC<{ work: Work }> = ({ work }) => {
  return (
    <div className="card">
      <img className="card__img" src={work.photoLinks[0]} />
      <div className="card__info">
        <div className="card__text">
          <h2 className="card__title">{work.name}</h2>
          <p className="card__description">{work.description}</p>
        </div>
        <button>Просмотр</button>
      </div>
    </div>
  );
};
