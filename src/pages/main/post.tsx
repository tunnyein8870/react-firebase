import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { PostTypeScript } from "../create-post/create-form";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import likelogo from "../.././logos/like.jpg";
import unlikelogo from "../.././logos/unlike.jpg";

interface Props {
  post: PostTypeScript;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likeCount, setLike] = useState<Like[] | null>(null);

  const likesDoc = query(
    collection(db, "likes"),
    where("postId", "==", post.id)
  );

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const getLike = data.docs.map((doc) => ({
      userId: doc.data().userId,
      likeId: doc.id,
    }));
    setLike(getLike);
  };

  const isUserLiked = likeCount?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(collection(db, "likes"), {
        userId: user?.uid,
        postId: post.id,
      });
      user &&
        setLike((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      // if (user){
      //   setLike((prev) =>
      //     prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
      //   );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const deleteQuery = query(
        collection(db, "likes"),
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const deleteLikeData = await getDocs(deleteQuery);
      const deleteLike = doc(db, "likes", deleteLikeData.docs[0].id);

      await deleteDoc(deleteLike);
      user &&
        setLike(
          (prev) =>
            prev &&
            prev.filter((like) => like.likeId !== deleteLikeData.docs[0].id)
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid w-5/6 mt-2 h-64 md:h-60 lg:h-60 bg-blue-500 border-4 rounded-xl items-center">
        <div className="text-2xl font-medium text-center lg:m-5">
          <p className="">{post.title}</p>
        </div>
        <div className=" overflow-auto justify-start text-left p-3 h-24 mx-5 lg:mx-24 bg-gray-100 text-gray-800 rounded-md">
          <p>{post.description}</p>
        </div>
        <p className="justify-start"></p>
        <div className="flex text-left ml-6 lg:ml-24 lg:mb-3">
          <button onClick={isUserLiked ? removeLike : addLike} className="flex">
            {isUserLiked ? (
              <img src={likelogo} className="w-10 h-10 rounded-full" />
            ) : (
              <img src={unlikelogo} className="w-10 h-10 rounded-full" />
            )}
            <sub className="text-gray-200">{likeCount?.length}</sub>
          </button>
          <div className="text-right w-5/6 pt-2 sm:mr-6 lg:mr-0">
          <p className="">@{post.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
