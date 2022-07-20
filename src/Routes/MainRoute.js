import React, {  useState,useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import { Routes } from './routes';
import About from '../pages/About';
import Projects from '../pages/Projects';
import MainNavbar from '../component/navbar';
import MainFooter from '../component/footer';
import { Themebody } from '../context/component';

import '../scss/react-bootstrap.scss';
import Sidebar from '../component/Sidebar';
import CovidTracker from '../projects/covid_tracker';
import Home from '../pages/Home';

const RouteWithLoader=({ component: Component, ...rest })=>{

    const [loading,setloading]=useState(false)
    useEffect(()=>{
        
        const timer=setTimeout(() => setloading(true), 1000);
        return ()=>clearTimeout(timer)
    },[])
    return(
        <Route {...rest} render={props => ( 
            <>
            {/* //Preloader */}
           { /*<Sidebar />*/}
            
            <Themebody>
            
                <div className='min-h-screen flex flex-col justify-between '> 
                <div className='h-3/4'>
                <Component {...props}/>
                </div>
                <div className='h-1/4'>
                <MainFooter/>
                </div>
                </div>
            </Themebody>
            </>
        )} />
        
    );
}
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
            <Switch>

    <RouteWithLoader exact path={Routes.home.path} component={Home}/>
    <RouteWithLoader exact path={Routes.about.path} component={About}/>
    <RouteWithLoader exact path={Routes.project.path} component={Projects}/>
    <RouteWithLoader exact path={Routes.covidtracker.path} component={CovidTracker}/>

    </Switch>

);
