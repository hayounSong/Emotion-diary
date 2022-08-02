
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RouteTest from './components/RouteTest';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <MyHeader headText={"App"} leftChild={<MyButton text={"왼쪽 버튼"} onClick={()=>alert("dd")}/>}
      rightChild={<MyButton text={"오른쪽 버튼"} onClick={()=>alert("dd")}/>}/>


      
      <h2>App.js</h2>
      {/* <img src={process.env.PUBLIC_URL+`/assets/emotion1.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion2.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion3.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion4.png`}/>
      <img src={process.env.PUBLIC_URL+`/assets/emotion5.png`}/> */}
      {/* process.env.PUBLIC_URL은 무조건 public을 가리키게됨 */}
      <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} type={'positive'}></MyButton>
      <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} type={'negative'}></MyButton>
      <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} ></MyButton>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/new' element={<New></New>}></Route>
        <Route path='/edit' element={<Edit></Edit>}></Route>
        <Route path='/diary/:id' element={<Diary></Diary>}></Route>
        
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
