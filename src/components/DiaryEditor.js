import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import {getStringDate} from "../util/date"
import { emotionList } from "../util/emotion";

const DiaryEditor=({isEdit,originData})=>{
    const {onCreate,onEdit}=useContext(DiaryDispatchContext)
    const contentRef=useRef();
    const [content,setContent]=useState("")
    const [emotion,setEmotion]=useState(3);
    const navigate=useNavigate();
    const [date,setDate]=useState(getStringDate(new Date()));
    
    const handleSubmit=()=>{
        if(content.length<1){
            contentRef.current.focus()
            return;
        }
        else{
            if(isEdit){
                onEdit(date,content,emotion);
            }
            else{
                onCreate(date,content,emotion);
            }
            
            navigate(`/`,{replace:true})
        }
    }
    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion)
            setContent(originData.content)
        }
    },[isEdit,originData])
    return <div className="DiaryEditor">

        <MyHeader headText={isEdit? "일기 수정하기":"새로운 일기 쓰기"} leftChild={
            <MyButton text={"< 뒤로가기"} onClick={()=>{navigate(-1)}}></MyButton>}
            />

            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}>

                        </input>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=>(
                            <EmotionItem key={it.emotion_id }  onClick={()=>{setEmotion(it.emotion_id)}} {...it}
                            isSelected={it.emotion_id===emotion}></EmotionItem>
                        ))}
                        

                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea placeholder="오늘은 어땟나요"ref={contentRef} value={content} onChange={(e)=>setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=>{navigate(-1)}}></MyButton>
                        <MyButton text={"작성완료"} type="positive" onClick={handleSubmit}></MyButton>
                    </div>
                </section>
            </div>
    </div>
}

export default DiaryEditor