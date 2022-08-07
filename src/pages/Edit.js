import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStaeteContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import React from "react";
const env=process.env;
    

const Edit=()=>{
    const [originData,setOriginData]=useState();
    const diaryList=useContext(DiaryStaeteContext)
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        const titleElement=document.getElementsByTagName('title')[0];
        titleElement.innerHTML=`감정 일기장 - ${id}번 일기 수정`
    },[])
    useEffect(()=>{
        if(diaryList.length>=1){
            const targetDiary=diaryList.find((it)=>parseInt(it.id)===parseInt(id))
            
            if(targetDiary){

            setOriginData(targetDiary)
            }else{
                navigate('/',{replace:true})
            }
        }

        
    },[diaryList,id])
    return <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}></DiaryEditor>}
    </div>
}

export default Edit