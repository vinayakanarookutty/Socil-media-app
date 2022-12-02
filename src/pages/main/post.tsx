import { addDoc, collection,query,where,getDoc, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {Posts as Postsmain} from './main'
import {useNavigate} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
interface Props
{
    Post:Postsmain
}
interface Like
{
    userId:string,
    likeId:string
}

export const Posts=(props:Props)=>{
    const {Post}=props;
    const navigate=useNavigate()
    const [user]=useAuthState(auth)
    const[like,setlike]=useState<Like[] | null>(null)
    const likeref=collection(db,'likes')
    const likesDoc=query(likeref,where("postId","==",Post.id))
    const getLikes= async()=>{
        const data=await getDocs(likesDoc)
        setlike(data.docs.map((doc)=>({ userId:doc.data().userId,likeId:doc.id})))
    }
    const addLikes=async ()=>{
        try{
      const newDoc=await addDoc(likeref,{
        userId:user?.uid,postId:Post.id
       
      })

    //   navigate('/')
    if(user)
    {
        setlike((prev)=>prev ? [...prev,{userId:user.uid,likeId:newDoc.id}]:[{userId:user.uid,likeId:newDoc.id}])
    }
}catch(err)
{
    console.log(err)
}
    }


    const removeLikes=async ()=>{
        try{
     const liketodeletequery=query(likeref,
        where("postId","==",Post.id),
        where("userId","==",user?.uid),
        );
        const liketodeletedata=await getDocs(liketodeletequery)
        const likeId=liketodeletedata.docs[0].id
        const liketodelete=doc(db,"likes",likeId)
        await deleteDoc(liketodelete)
        


    //   navigate('/')
    if(user)
    {
        setlike((prev)=>prev  && prev.filter((like)=>like.likeId !== likeId))
    }
}catch(err)
{
    console.log(err)
}
    }


    const hasUserLiked=like?.find((like)=>like.userId===user?.uid)

    useEffect(()=>{
        getLikes()
    },[]);

    return<div>
        <div className='title'>
            <h1>{Post.title}</h1>
        </div>
        <div className='body'>
            <p>{Post.description}</p>
        </div>
        
        <div className='footer'>
            <p>@{Post.username}</p>
            <button onClick={hasUserLiked ? removeLikes : addLikes}
            >{hasUserLiked ? <>&#128078;</> :<>&#128077;</>}</button>
            {like && <p>Likes:{like?.length}</p>}
        </div>
    </div>
}