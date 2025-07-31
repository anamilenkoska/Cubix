import {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import Homepage from './components/home/Homepage';
import App from './App'
import Signin from './components/pages/Signin';
import Login from './components/pages/Login'

class AppRoutes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<Homepage/>}/>
                        <Route path="/signin" element={<Signin/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;