import { FC } from "react";
import { Work } from "./MainPage";

export const MainCard: FC<{
  work: Work;
  setIsModalOpen: (work: Work) => void;
  isAdmin?: boolean;
  onRemove?: (id: string) => void;
}> = ({ onRemove, work, isAdmin, setIsModalOpen }) => {
  return (
    <div className="card">
      <img
        className="card__img"
        onClick={() => setIsModalOpen(work)}
        src={work.photoLinks[0]}
      />
      <div className="card__info">
        <div className="card__text">
          <h2 className="card__title">{work.name}</h2>
          <p className="card__description">{work.description}</p>
        </div>
        <div className="card__buttons">
          <button onClick={() => setIsModalOpen(work)}>Просмотр</button>
          {isAdmin && onRemove && (
            <button
              onClick={() => onRemove(work.id)}
              className="card__button-delete"
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
