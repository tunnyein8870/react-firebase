import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

interface ExtractData {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
}
export const Main = () => {
  const [postList, setPostList] = useState<ExtractData[] | null>(null);

  const getPost = async () => {
    const data = await getDocs(collection(db, "posts"));
    const extractData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as ExtractData[];
    setPostList(extractData);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <h1>{postList?.map((post) => (
        <Post post={post} />
      ))}
      </h1>
    </div>);
};
