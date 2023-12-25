import Currency from "./components/currency/Currency";
import { Navbar } from "./components/navbar/NavBar"
import { Route, Routes } from 'react-router-dom';
import Wallet from "./components/wallet/Wallet";
function App() {
 

  return (
    <>
       <Navbar/>
   <Routes>
    <Route path='/' element={ <Currency/>} />
    {/* <Route path='/charts' element={<ChartPages/>} /> */}
    <Route path='/wallet' element={<Wallet/>} />
   </Routes>
    </>
  )
}

export default App
