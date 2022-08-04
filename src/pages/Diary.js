import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStaeteContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import {getStringDate} from "../util/date.js"
import { emotionList } from "../util/emotion";

const Diary=()=>{
    const navigate=useNavigate();
    const DiaryList=useContext(DiaryStaeteContext)
    const {id}=useParams();
    const [indata,setindata]=useState()
    
    useEffect(()=>{
        if(DiaryList.length>=1){
            const targetDiary=DiaryList.find((it)=>parseInt(it.id)===parseInt(id))
            
        
        if(targetDiary){
           setindata(targetDiary)
        }
        else{
            navigate('/',{replace:true})

        }}
        
    },[id,DiaryList])
    
    if(!indata){
        return <div className="DiaryPage">로딩중입니다...</div>
    }
    else{
        const curEmotionData=emotionList.find((it)=>(it.emotion_id)===parseInt(indata.emotion));
        return <div>
        <MyHeader headText={`${getStringDate(new Date(indata.date))} 기록`} leftChild={
            <MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)}></MyButton>
        }
        rightChild={
            <MyButton text={"수정하기"} onClick={()=>navigate(`/edit/${indata.id}`)}></MyButton>
        }></MyHeader>
        <div className="DiaryPage">
        <article>
            <section>
                <h4>오늘의 감정</h4>
                <div className={["diary_img_wrapper",`diary_img_wrapper_${indata.emotion}`].join(" ")}>
                    <img src={"../"+curEmotionData.emotion_img}></img>
                    <div className="emotion_descript">
                        {curEmotionData.emotion_descript}
                    </div>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="diary_content_wrapper">
                <p>{indata.content}</p>
                </div>
            </section>

        </article>
        </div>
        </div>
    }
   
}

export default Diary