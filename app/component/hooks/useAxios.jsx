import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export const useAxios = (URL) =>{
    const [data, setData] = useState({})

    useEffect(() =>{
        axios.get(URL)
            .then(resp => {
                console.log(resp)
                setData({data:resp})
            })
            .catch(err =>{
                console.log(err)
            })
    },[URL])
    return data
}