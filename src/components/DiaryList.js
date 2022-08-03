import { useState } from "react"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"
const sortOptionList=[
    {value:"latest",name:"최신순"},
    {value:"ordest",name:"오래된 순"},
]
const filterOptionList=[
    {value:"all",name:"전부다"},
    {value:"good",name:"좋은 감정"},
    {value:"bad",name:"나쁜 감정"},

]

const EmotionMenu=({value,onChange,optionList})=>{
    return(
        <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
            {optionList.map((it,idx)=>(<option key={idx} value={it.value}>{it.name}</option>))}
        </select>
    )
}

const ControlMenu=({value,onChange,optionList})=>{
    return (
    <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
        {optionList.map((it,idx)=>(<option key={idx} value={it.value}>{it.name}</option>
        ))}
    </select>
    )
}



const DiaryList=({diaryList})=>{
    const navigate=useNavigate();
    const [sortType,setSortType]=useState('latest')
    const [filter,setFilter]=useState("all")

    const filterCallBack=(item)=>{
        if(filter==='good'){
            return parseInt(item.emotion) <=3;
        }
        else{
            return parseInt(item.emotion)>3;
        }
    }
    const getProcessedDiaryList=()=>{

        const compare=(a,b)=>{
            if(sortType==='latest'){
                return parseInt(b.date)-parseInt(a.date);
            }
            else{
                return parseInt(a.date)-parseInt(b.date);
            }
        }
        const copyList=JSON.parse(JSON.stringify(diaryList))

        const filteredList=filter==='all' ? copyList :copyList.filter((it)=>filterCallBack(it))

        const sortedList=filteredList.sort(compare)
        return sortedList;
    }
    return <div className="DiaryList">
        <div className="menu_wrapper">
            <div className="left_col">
            <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
    <EmotionMenu value={filter} onChange={setFilter} optionList={filterOptionList}></EmotionMenu>
            </div>
            <div className="right_col">
            <MyButton type={'positive'} text={'새 일기쓰기'} onClick={()=>navigate('/new')}></MyButton>
            </div>
        </div>


    {getProcessedDiaryList().map((it)=>(<DiaryItem key={it.id} {...it}></DiaryItem>

    ))
    
    }
    
</div>

}
DiaryList.defaultProps={
    diaryList:[],

};
export default DiaryList