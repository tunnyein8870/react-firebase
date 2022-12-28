import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import {db,auth} from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export interface PostTypeScript {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const CreateForm = ()=>{
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string(),
        description: yup.string().max(300),   
    })
    const {register, handleSubmit, formState: {errors}} = useForm<PostTypeScript>({
        resolver: yupResolver(schema)
    })

    const onCreatePost = async(data: PostTypeScript)=>{
       await addDoc(collection(db, "posts"), {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
       })
       navigate("/");
    }   

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title" required {...register("title")}/>
            <p>{errors.title?.message}</p>
            <textarea placeholder="Description" required {...register("description")}/>
            <p>{errors.title?.message}</p>
            <input type="submit" className="submitForm"/>
        </form>
    )
}