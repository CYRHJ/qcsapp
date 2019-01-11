import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Icon} from 'antd';
import './index.scss';
class Center extends Component{
    constructor(){
        super();
        this.state={
            tokenType:1
        }
    }
    componentWillMount(){
        axios({
            method:'get',
            url:'http://192.168.2.251:7001/center',
            headers:{
                'Authorization':localStorage['token']
            }
        }).then((res)=>{
            console.log(res);
            if(res.data.code ===0){//登录状态获取不成功
                this.setState({
                    tokenType:true
                })
            }else{
                // this.props.history.push('/login')
                this.setState({
                    tokenType:false
                })
            }
        })
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    logout=()=>{
        localStorage['token']="";
        this.props.history.push('/login');
    }
    backfirst=()=>{
        this.props.history.push('./');
    }
    backshop=()=>{
        this.props.history.push('./shop');
    }
    // <Redirect to='/login'/>
    render(){
        if(this.state.tokenType){
            return<div>
                <div className="center">
                    <div className="center_top"><Icon onClick={this.backfirst} type="left" className="center_left"/><Icon onClick={this.backshop} type="shopping-cart" className="center_right"/></div>
                    
                    <div className="header1">
                        <div className="center_header">
                            <div className="header2"><img src={'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epC5xUULgeLticNvyIFHop8DBfc2mKtib2MR6kXnATvu7xEn8JFE4OSR767JMXkVMqXaY14AuZMRm3g/132'} alt=""/></div>
                            <p>莴笋丝</p>
                            <div className="header3" onClick={this.backfirst}><Icon type="home"/> 回到首页 <Icon type="right" /></div>
                        </div>
                    </div>
                <div className="dingdan">
                    <div className="dingdan_left">全部订单</div>
                    <div className="dingdan_right"><Icon type="right" /></div>
                </div>

                <div>
                    <ul className="app_1">
                        <li className="icon">
                            <div className="icon1"><Icon type="barcode"/></div>
                            <div className="icon2">待付款</div>
                        </li>
                        <li className="icon">
                            <div className="icon1"><Icon type="gift"/></div>
                            <div className="icon2">待发货</div>
                        </li>
                        <li className="icon">
                            <div className="icon1"><Icon type="car"/></div>
                            <div className="icon2">待收货</div>
                        </li>
                        <li className="icon">
                            <div className="icon1"><Icon type="heart"/></div>
                            <div className="icon2">待评价</div>
                        </li>
                        <li className="icon">
                            <div className="icon1"><Icon type="dollar"/></div>
                            <div className="icon2">退款</div>
                        </li>
                    </ul>
                </div>
                <div className="wenzi"><p>我猜你经常用</p></div>
                <div>
                    <ul className="app_2">
                        <li className="icon-1">
                            <div className="icon3"><Icon type="mail" style={{color:'#67D3BD'}}/></div>
                            <div className="icon4">消息</div>
                        </li>
                        <li className="icon-1"> 
                            <div className="icon3"><Icon type="money-collect" style={{color:'#F8B960'}} /></div>
                            <div className="icon4">优惠券</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="team" style={{color:'#63B3ED'}}/></div>
                            <div className="icon4">我的拼团</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="environment" style={{color:'#69B6ED'}}/></div>
                            <div className="icon4">收货地址</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="customer-service" style={{color:'#F8BB63'}}/></div>
                            <div className="icon4">联系客服</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="idcard" style={{color:'#D8C723'}}/></div>
                            <div className="icon4">会员卡</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="message" style={{color:'#66D3BD'}}/></div>
                            <div className="icon4">建议反馈</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3" onClick={this.logout}><Icon type="poweroff" style={{color:'#FAA2A2'}}/></div>
                            <div className="icon4">退出登录</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="info-circle" style={{color:'#82C2F1'}}/></div>
                            <div className="icon4">关于我们</div>
                        </li>
                        <li className="icon-1">
                            <div className="icon3"><Icon type="lock" style={{color:'#F8B960'}}/></div>
                            <div className="icon4">隐私政策</div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        }else{
            return<Redirect to="/login"/>
        }
    }
}
export default Center;