'use client'
import Tab from "./component/tabla"
import { useAxios } from "./component/hooks/useAxios";
const URL='https://jsonplaceholder.typicode.com/posts/1/comments'

export default function HomePage (){
    const {data} = useAxios(URL)
    console.log(data)

    return(
        <div className="home">
            {(data!=undefined) && <Tab rows={data.data}/>}
        </div>
    )
}
