import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { ref, uploadBytes } from "@firebase/storage";
import { auth, db, storage } from "./firebase";
import { uuidv4 } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";

export const AdminControls = () => {
  const [typeOfPage, setTypeOfPage] = useState<"form" | "gallary">("form");
  const [formValue, setFormValue] = useState<{
    isEditing: boolean;
    name: string;
    description: string;
    photos: File[];
  }>({
    isEditing: false,
    name: "",
    description: "",
    photos: [],
  });

  const handleAdd = async () => {
    const photoLinks: string[] = [];
    if (!auth.currentUser) return;
    try {
      for (const file of formValue.photos) {
        const storageRef = ref(
          storage,
          `${uuidv4()}.${file.type.split("/")[1]}`
        );
        const res = await uploadBytes(storageRef, file);
        photoLinks.push(res.ref.fullPath);
      }
      await addDoc(collection(db, "works"), {
        name: formValue.name,
        description: formValue.description,
        photoLinks,
      });
      alert("Успешно добавлено!");
      setFormValue({
        isEditing: false,
        name: "",
        description: "",
        photos: [],
      });
    } catch (e) {
      alert(e);
    }
  };

  const handleLogOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="admin">
      <div className="admin__header">
        <div className="admin__type">
          <button
            className={`admin__type-button ${
              typeOfPage === "form" ? "admin__type-button-active" : ""
            }`}
            onClick={() => setTypeOfPage("form")}
          >
            Форма
          </button>
          <button
            className={`admin__type-button ${
              typeOfPage === "gallary" ? "admin__type-button-active" : ""
            }`}
            onClick={() => setTypeOfPage("gallary")}
          >
            Галерея
          </button>
        </div>
        <div className="admin__type">
          <Link to={"/"} className="admin__link">
            На главную
          </Link>
          <button className="admin__logout" onClick={handleLogOut}>
            Выйти
          </button>
        </div>
      </div>
      {typeOfPage === "form" && (
        <div className="form">
          <label className="form__label">
            <p className="form__label-text">Название</p>
            <input
              className="form__label-input"
              value={formValue.name}
              onChange={(v) =>
                setFormValue({ ...formValue, name: v.target.value })
              }
            />
          </label>
          <label className="form__label">
            <p className="form__label-text">Описание</p>
            <input
              className="form__label-input"
              value={formValue.description}
              onChange={(v) =>
                setFormValue({ ...formValue, description: v.target.value })
              }
            />
          </label>
          <label className="form__label">
            <input
              className="form__label-file"
              type="file"
              multiple
              onChange={({ target }) => {
                setFormValue({
                  ...formValue,
                  photos: target.files
                    ? Object.values(target.files).slice(0, target.files.length)
                    : formValue.photos,
                });
              }}
              accept="image/png, image/gif, image/jpeg, image/webp, image/heic"
            />
            <p className="form__label-input-text">
              <svg
                style={{ marginRight: 5 }}
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.93517 11.7796L14.1617 4.55304C15.0392 3.67631 16.4657 3.67631 17.3432 4.55304C18.2206 5.43052 18.2206 6.85774 17.3432 7.73522L7.40091 17.5477C5.9362 19.0124 3.56325 19.0124 2.09854 17.5477C0.633821 16.0837 0.633821 13.7093 2.09854 12.2453L11.9335 2.53784C13.984 0.487387 17.3094 0.487387 19.3569 2.53784C21.4088 4.58904 21.4088 7.91146 19.3584 9.96192L12.239 17.082"
                  stroke="currentColor"
                  stroke-linecap="round"
                />
              </svg>
              Прикрепить фото
            </p>
          </label>
          {!!formValue.photos.length && (
            <div className="form__gallary">
              <p className="form__gallary-text">Фотографии</p>
              <div className="form__gallary-items">
                {formValue.photos.map((file, index) => (
                  <div className="form__gallary-item" key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      className="form__gallary-img"
                    />
                    <button
                      onClick={() =>
                        setFormValue({
                          ...formValue,
                          photos: formValue.photos
                            .slice(0, index)
                            .concat(formValue.photos.slice(index + 1)),
                        })
                      }
                      className="form__gallary-cancel"
                    >
                      <svg
                        width="61"
                        height="61"
                        viewBox="0 0 61 61"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M59.4533 1.70778C59.1998 1.45556 58.8986 1.25546 58.567 1.11892C58.2355 0.982387 57.88 0.912109 57.521 0.912109C57.162 0.912109 56.8066 0.982387 56.475 1.11892C56.1435 1.25546 55.8423 1.45556 55.5888 1.70778L30.2294 26.879L4.86994 1.70778C4.35748 1.19923 3.66243 0.913527 2.93769 0.913527C2.21296 0.913527 1.51791 1.19923 1.00544 1.70778C0.492978 2.21634 0.205078 2.90608 0.205078 3.62528C0.205078 4.34449 0.492978 5.03423 1.00544 5.54278L26.3703 30.7086L1.00544 55.8744C0.492978 56.383 0.205078 57.0728 0.205078 57.792C0.205078 58.5112 0.492978 59.2009 1.00544 59.7094C1.51791 60.218 2.21296 60.5037 2.93769 60.5037C3.66243 60.5037 4.35748 60.218 4.86994 59.7094L30.2294 34.5382L55.5888 59.7094C56.1012 60.218 56.7963 60.5037 57.521 60.5037C58.2458 60.5037 58.9408 60.218 59.4533 59.7094C59.9657 59.2009 60.2536 58.5112 60.2536 57.792C60.2536 57.0728 59.9657 56.383 59.4533 55.8744L34.0884 30.7086L59.4533 5.54278C59.7074 5.2912 59.9091 4.99233 60.0467 4.6633C60.1843 4.33426 60.2551 3.98152 60.2551 3.62528C60.2551 3.26904 60.1843 2.9163 60.0467 2.58727C59.9091 2.25823 59.7074 1.95936 59.4533 1.70778Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleAdd}
            className="form__add"
            disabled={
              !formValue.description ||
              !formValue.name ||
              !formValue.photos.length
            }
          >
            Добавить
          </button>
        </div>
      )}
      {typeOfPage === "gallary" && <div></div>}
    </div>
  );
};
