import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection} from 'firebase/firestore'
import {db,auth} from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'

export  const CreateForm=()=>{
    const [user]=useAuthState(auth)
    const navigate=useNavigate()
    interface CreateFormData{
        title:string;
        description:string;
    }
    const schema=yup.object().shape(
        {
            title:yup.string().required("You must add a title"),
            description:yup.string().required("you must add description")
        }
    )
    const {register,handleSubmit,formState:{errors}}=useForm<CreateFormData>({
        resolver:yupResolver(schema)
    })
    const postref=collection(db,'posts')
    const OnCreatepost=async (data:CreateFormData)=>{
      await addDoc(postref,{
        title:data.title,
        description:data.description,
        username:user?.displayName,
        userId:user?.uid,
      })
      navigate('/')
    }
    return <form onSubmit={handleSubmit(OnCreatepost)}>
        <input placeholder='Title...'{...register('title')} />
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder='Description...' {...register('description')}/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type='submit'/>

    </form>
}