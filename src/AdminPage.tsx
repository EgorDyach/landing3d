import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { sha512 } from "./helpers";
import { AdminControls } from "./AdminControls";
export const AdminPage = () => {
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsPageLoading(false);
      setIsUser(!!user);
    });
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const newPassword = await sha512(password);
      await signInWithEmailAndPassword(auth, email, newPassword);
      setEmail("");
      setPassword("");
    } catch (e) {
      const error = e as { message: string };
      if (
        error.message.includes("invalid-credential") ||
        error.message.includes("invalid-email")
      ) {
        setError("Неверный Email или пароль!");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) return "Загрузка...";

  if (!isUser)
    return (
      <div className="login">
        <label>
          <p>Email</p>
          <input
            className="login__input"
            value={email}
            onChange={(v) => {
              setError("");
              setEmail(v.target.value);
            }}
            type="text"
          />
        </label>
        <label>
          <p>Пароль</p>
          <input
            className="login__input"
            value={password}
            onChange={(v) => {
              setError("");
              setPassword(v.target.value);
            }}
            type="text"
          />
        </label>
        <button
          disabled={!email || !password || !!error}
          onClick={handleSignIn}
        >
          Войти
        </button>
        {error}
        {isLoading && "Загрузка..."}
      </div>
    );
  return <AdminControls />;
};
