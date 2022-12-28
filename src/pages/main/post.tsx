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
      likeId: doc.id
    }));
    setLike(getLike);
  };

  const isUserLiked = likeCount?.find((like) => like.userId == user?.uid);

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
          prev ? 
          [...prev, { userId: user?.uid, likeId: newDoc.id  }] : 
          [{ userId: user?.uid, likeId: newDoc.id }]
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
        setLike((prev) => (
          prev && prev.filter((like)=> 
            like.likeId !== deleteLikeData.docs[0].id))
          );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="header">Title: {post.title}</div>
      <div className="body">Description: {post.description}</div>
      <div className="footer">
        @{post?.username}
        <button onClick={isUserLiked ? removeLike : addLike}>
          {isUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likeCount && <p>Like: {likeCount?.length}</p>}
      </div>
    </div>
  );
};
