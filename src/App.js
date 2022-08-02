
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RouteTest from './components/RouteTest';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
import React, { useReducer, useRef } from 'react';

const reducer=(state,action)=>{
  let newState=[];
  switch(action.type){
  case 'INIT':{
    return(action.data)
  }
  case 'CREATE':{
    const newItem={
      ...action.data
    };
    newState=[newItem,...state]
    break;
  }
  case 'REMOVE':{
    newState=state.filter((it)=>it.id!==action.targetId);
    break;
  }
  case 'EDIT':{
    newState=state.map((it)=>it.id === action.data.id ? {...action.data}: it)
  }
  default:
    return state;
  return newState;
};
}


export const DiaryStaeteContext=React.createContext();
export const DiaryDispatchContext=React.createContext();
function App() {
  
  
  const [data,dispatch]= useReducer(reducer,[1])



  const dataId=useRef(0);

  const onCreate=(date,content,emotion)=>{
    dispatch({type:"CREATE",
    data:{
      od:dataId.current,
      date:new Date(date).getTime(),
      content,
      emotion,
    },
  });
  dataId.current +=1;
  }

  const onRemove=(targetId)=>{
    dispatch({type:"REMOVE",targetId});
  }

  const onEdit = (targetId,date,content,emotion)=>{
    dispatch({
      type:"EDIT",
      data:{
        id:targetId,
        date:new Date(date).getTime(),
        content,
        emotion

      }
    })
  }
  return (
    <DiaryStaeteContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,onEdit,onRemove}}>
    <BrowserRouter>
    <div className="App">
      {/* <MyHeader headText={"App"} leftChild={<MyButton text={"왼쪽 버튼"} onClick={()=>alert("dd")}/>} */}
      {/* rightChild={<MyButton text={"오른쪽 버튼"} onClick={()=>alert("dd")}/>}/> */}


      
     
      {/* <img src={process.env.PUBLIC_URL+`/assets/emotion1.png`}/> */}
      {/* <img src={process.env.PUBLIC_URL+`/assets/emotion2.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion3.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion4.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion5.png`}/> */} 
      {/* process.env.PUBLIC_URL은 무조건 public을 가리키게됨 */}
      {/* <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} type={'positive'}></MyButton>
      <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} type={'negative'}></MyButton>
      <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} ></MyButton> */}


      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/new' element={<New></New>}></Route>
        <Route path='/edit' element={<Edit></Edit>}></Route>
        <Route path='/diary/:id' element={<Diary></Diary>}></Route>
        
      </Routes>
      
    </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStaeteContext.Provider>
  );
}

export default App;
