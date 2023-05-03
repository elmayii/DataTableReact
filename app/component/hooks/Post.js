import axios from "axios"

export const Post = async (URL,form) =>{
    return await axios.postForm(URL,form)
}