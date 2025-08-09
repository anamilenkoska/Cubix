import {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import Homepage from './components/home/Homepage';
import App from './App'
import Signin from './components/pages/Signin';
import Logout from './components/pages/Logout'
import LandingPage from './components/home/LandingPage'
import AlgorithmPage from './components/algorithms/AlgorithmPage';
import Report from './components/reports/Report'
import Profile from './components/profile/Profile'

class AppRoutes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<LandingPage/>}/>
                        <Route path='/homepage' element={<Homepage/>}/>
                        <Route path="/signin" element={<Signin/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path='/algorithms/:cubeType' element={<AlgorithmPage/>}/>
                        <Route path='/report' element={<Report/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;