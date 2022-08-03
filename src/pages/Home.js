import { useContext, useEffect, useState } from "react";
import { DiaryStaeteContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";
const Home=()=>{

    const diarylist=useContext(DiaryStaeteContext)

    const [data,setData]=useState([])

    const [curDate,setCurDate]=useState(new Date());
   
    const headText=`${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`
   
    useEffect(()=>{
        if(diarylist.length>=1){
        const firstDay=new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1,
        ).getTime();
        const lastDay=new Date(
            curDate.getFullYear(),
            curDate.getMonth()+1,
            0,
        ).getTime();
        

        setData(diarylist.filter((it)=>firstDay<=it.date&&it.date<=lastDay))}
    },[diarylist,curDate])

  
    
    const increaseMonth=()=>{

        setCurDate(new Date(curDate.getFullYear(),curDate.getMonth()+1),curDate.getDate())
    }
    const decreaseMonth=()=>{
        setCurDate(new Date(curDate.getFullYear(),curDate.getMonth()-1),curDate.getDate())
    }

    return <div>
    
    <MyHeader headText={headText}
    leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
    rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
    />
    <DiaryList diaryList={data}></DiaryList>


    </div>
}

export default Home;