import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { MainCard } from "./MainCard";
import { Skeleton } from "./Skeleton";
import { db, storage } from "./firebase";
import { getDownloadURL, ref } from "@firebase/storage";

export type Work = {
  id: string;
  name: string;
  description: string;
  photoLinks: string[];
};

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [works, setWorks] = useState<Work[]>([]);
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "works"));
      const newWorks: Work[] = [];
      for (const doc of querySnapshot.docs) {
        const photos = [];
        for await (const id of doc.data().photoLinks) {
          const link = await getDownloadURL(ref(storage, id));
          photos.push(link);
        }
        newWorks.push({
          ...doc.data(),
          id: doc.id,
          photoLinks: photos,
        } as Work);
      }
      setWorks(newWorks);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__header-title">Наше портфолио</h1>
        <a href="https://t.me/egor_dyachenko" className="main__header-contact">
          <button>
            <svg
              style={{ marginRight: 5 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_732_815)">
                <path
                  d="M22.6253 1.21961C22.9184 1.45447 23.0552 1.83378 22.9795 2.20166L19.4795 19.2017C19.4168 19.506 19.2163 19.7639 18.9368 19.8996C18.6573 20.0353 18.3307 20.0334 18.0528 19.8944L10.0528 15.8944C9.77576 15.7559 9.57855 15.4969 9.51879 15.193C9.45903 14.889 9.54347 14.5746 9.74742 14.3415L13.2474 10.3415C13.6111 9.92587 14.2429 9.88375 14.6585 10.2474C15.0741 10.6111 15.1163 11.2429 14.7526 11.6585L12.1049 14.6844L17.783 17.5235L20.626 3.71492L4.33118 11.0476L7.44721 12.6056C7.786 12.775 8 13.1212 8 13.5V19.8276L9.68077 17.4265C9.99748 16.9741 10.621 16.8641 11.0735 17.1808C11.5259 17.4975 11.6359 18.121 11.3192 18.5735L7.81923 23.5735C7.56893 23.931 7.11564 24.085 6.69936 23.9537C6.28308 23.8225 6 23.4365 6 23V14.118L1.55279 11.8944C1.20742 11.7218 0.992334 11.3657 1.00021 10.9796C1.00808 10.5936 1.23752 10.2465 1.58964 10.0881L21.5896 1.08809C21.9322 0.933954 22.3322 0.984754 22.6253 1.21961Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_732_815">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Связаться с нами
          </button>
        </a>
      </div>
      {isLoading && (
        <div className="skeleton__wrapper">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}
      {works.map((work) => (
        <MainCard key={work.id} work={work} />
      ))}
      <div></div>
    </div>
  );
};
