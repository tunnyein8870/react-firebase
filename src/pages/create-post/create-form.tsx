import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export interface PostTypeScript {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
}

export const CreateForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string(),
    description: yup.string().max(300),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostTypeScript>({
    resolver: yupResolver(schema),
  });

  const onCreatePost = async (data: PostTypeScript) => {
    await addDoc(collection(db, "posts"), {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Write Your Option
          </h3>
        </div>
        <div className="border-t border-blue-300">
          <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-bold text-gray-700">Title</dt>
            <input
              className="pl-2 overflow-auto mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0"
              required
              placeholder="Title"
              {...register("title")}
            />
            <p>{errors.title?.message}</p>
          </div>
          <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-bold text-gray-700">Description</dt>
            <textarea
              className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0 rounded-md"
              required
              placeholder="Description"
              {...register("description")}
            />
            <p>{errors.description?.message}</p>
          </div>

          <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <button
              className="h-10 mt-1 text-lg text-gray-900 bg-blue-500 sm:col-span-2 sm:mt-0 rounded-md"
            >Submit</button>
          </div>
          
        </div>
      </div>
    </form>
    
  );
};

            {/* <button type="submit" className="h-10">Submit</button> */}


////

// <div className="overflow-hidden bg-white shadow sm:rounded-lg">
//   <div className="px-4 py-5 sm:px-6">
//     <h3 className="text-lg font-medium leading-6 text-gray-900">
//       Write Your Option
//     </h3>
//   </div>
//   <div className="border-t border-blue-300">
//     <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-bold text-gray-700">Title</dt>
//       <input
//         className="overflow-auto mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0"
//         required
//       />
//     </div>
//     <div className="bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
//       <dt className="text-sm font-bold text-gray-700">Description</dt>
//       <textarea className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0 rounded-md" />
//     </div>
//   </div>
// </div>
