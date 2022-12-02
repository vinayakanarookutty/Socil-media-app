import {getDoc,collection, getDocs} from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { db } from '../../config/firebase'
import { Posts as POSTs } from './post'
export interface Posts
{
    id:string,
    userId:string,
    title:string,
    username:string,
    description:string,
}

export  const Main=()=>{
    const postref=collection(db,'posts')
    const [postlist,setpostlist]=useState<Posts[] | null>(null)
    const getPosts=async ()=>{
        const data =await getDocs(postref)
    setpostlist(data.docs.map((doc)=>({...doc.data(),id:doc.id}))as Posts[])
    }
    useEffect(()=>
    {
        getPosts();
    },[])
 
  return(
    <div>
        {postlist?.map(
            (post)=>(
                <POSTs Post={post}/>
            )
        )}
    </div>
  )
   
}