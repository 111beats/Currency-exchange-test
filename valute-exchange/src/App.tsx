import Currency from "./components/currency/Currency";
import { Navbar } from "./components/navbar/NavBar"
import { Route, Routes } from 'react-router-dom';
function App() {
 

  return (
    <>
       <Navbar/>
   <Routes>
    <Route path='/' element={ <Currency/>} />
    {/* <Route path='/charts' element={<ChartPages/>} />
    <Route path='/exchange' element={<Exchange/>} /> */}
   </Routes>
    </>
  )
}

export default App
