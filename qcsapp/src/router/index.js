import React from 'react'; 
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Main from '../pages/main';
import Global from '../pages/global';
import Life from '../pages/life';
import Mask from '../pages/mask';
import Login from '../pages/login';
import Center from '../pages/center';
import Delicacy from '../pages/delicacy/delicacy';
import Shop from '../pages/shop/index';
import Details from '../pages/details/index';
//引入组件
import Header from '../components/common/header';
//定义路由表
const App =()=>(
    <BrowserRouter>
            <div>
                <Header/>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/global" exact component={Global}/>
                        <Route path="/life" exact component={Life}/>
                        <Route path="/mask" exact component={Mask}/>
                        <Route path="/delicacy" exact component={Delicacy}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/center" exact component={Center}/>
                        <Route path="/shop" exact component={Shop}/>
                        <Route path="/details" exact component={Details}/>
                    </Switch>
            </div>
    </BrowserRouter>
)
export default App;