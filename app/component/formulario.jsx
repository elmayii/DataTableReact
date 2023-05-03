import React from "react";
import { useForm, Controller } from "react-hook-form";
import {Input, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styles from './formulario.module.css'
import "./styles.css";
import { Post } from "./hooks/Post";
const URL='https://jsonplaceholder.typicode.com/posts/1/comments'

const Formulario = ({list,dispach,setShow,update,setUpdate,selectedRows}) => {
  const { control, handleSubmit } = useForm();
  
  const onSubmit = async (submit) => {

    //alert
    alert(JSON.stringify(submit));
    const {name,email,body} = submit
    const post=await Post(URL,submit)
    console.log(post)
    console.log(selectedRows)
    if(update){
      const action={
        type:'update',
        payload:{
          newItem:{
          name,
          email,
          body
        },
        oldItem:selectedRows[0]
        }
      }
      dispach(action)
    }
    else{
      let {id,postId} = post.data
      postId
      id=changeId(id)
      const action={
        type:'add',
        payload:{
          postId,
          id,
          name,
          email,
          body
        }
      }
      dispach(action)
    }
    
    setUpdate(false)
    setShow(false)
  };
  
  //Esto lo hago porque la Api me devuelve el mismo ID una y otra vez y esto afecta la integridad de la tabla
  const changeId = (id) =>{
    while(list.find(element => element.id==id)){
      id=list.find(element => element.id==id).id+1
    }
    return id
  }

  return (
    <div className={styles.div}>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <IconButton color="primary" onClick={e => setShow(false)}>
		    <CloseIcon/>
	    </IconButton>
      <label>Name</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        name="name"
        control={control}
        defaultValue=""
        className="materialUIInput"
        rules={{required: true,maxLength: 30}}
      />
      <label>Email</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        name="email"
        control={control}
        defaultValue=""
        rules={{required: true,maxLength: 50,pattern:/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/}}
      />
      <label>Body</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        name="body"
        control={control}
        defaultValue=""
        rules={{required: true,maxLength: 255}}
      />
      <input type="submit" className={styles.submit}/>
    </form>
    </div>
  );
};

export default Formulario;