import Currency from "./components/currency/Currency";
import { Navbar } from "./components/navbar/NavBar"
import { Route, Routes } from 'react-router-dom';
import Wallet from "./components/wallet/Wallet";
import Chart from "./components/chart/Chart";
function App() {
 

  return (
    <>
       <Navbar/>
   <Routes>
    <Route path='/' element={ <Currency/>} />
    <Route path='/charts' element={<Chart/>} />
    <Route path='/wallet' element={<Wallet/>} />
   </Routes>
    </>
  )
}

export default App
