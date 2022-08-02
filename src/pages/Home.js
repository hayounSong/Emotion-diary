import { useContext } from "react";
import { DiaryStaeteContext } from "../App";

const Home=()=>{
    const data=useContext(DiaryStaeteContext)
    return <div>

        <h1>Home</h1>
        <p>이곳은 홈입니다.</p>
        {data[0]}
    </div>
}

export default Home;