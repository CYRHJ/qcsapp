import React,{Component} from 'react';
import './delicacy.scss';
import {Icon} from 'antd';
import axios from 'axios';
import BackTop from '../../components/BackTop/index';
import {Link} from 'react-router-dom';
class Delicacy extends Component{
    constructor(){
        super();
        this.state={
            listArr:[],
            page:1,//当前页
            end:false,
            type:false,
            group_id:12983,
            topArr:[
                {'id':0,'name':'洁面卸妆','group_id':12983,'type':true},
                {'id':1,'name':'水乳面霜','group_id':12984,'type':false},
                {'id':2,'name':'精华眼霜','group_id':12985,'type':false},
            ]
        }
    }
    componentDidMount(){
        this.getData(this.state.group_id);
        //调用滚动事件
        this.Scroll();
    }
    Scroll(){
        let _this=this;
        //滚动事件
        window.onscroll=function(){
            //获取滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //获取窗口的可视高度
            let windowHeight = document.documentElement.clientHeight;
            //当前页面的总高度
            let scrollHeight = document.body.scrollHeight;

            console.log(scrollHeight-scrollTop +':'+windowHeight)
            if(scrollHeight-scrollTop<=windowHeight){
                //获取数据
                _this.moreData(_this.state.page+1);
                //更新当前页
                _this.setState({
                    page:_this.state.page+1
                })
            }
        }
    }
    moreData(i){
        if(!this.state.end){
            this.setState({
                type:true
            });
            axios.get("https://h5.watsons.com.cn/item/ws/group_list?current_page="+i+"&page_size=24&group_id="+this.state.group_id+"&device_id=c78ad1b0-0fbd-11e9-8ad5-c31bae1602d7")
            .then((res)=>{
                if(res.data.data.item_list === undefined){
                    this.setState({
                        end:true
                    })
                }else{
                    let oldArr = this.state.listArr;
                    let newArr = [];
                    newArr = oldArr.concat(res.data.data.item_list);
                    setTimeout(()=>{
                        this.setState({
                            listArr:newArr,
                            type:false
                        })
                    },2000);
                }
            }
            )}
    }
    goback=()=>{
        this.props.history.go(-1);
    }
    changeBorder(id,group_id){
        let newArr=this.state.topArr;
        for(var i=0;i<newArr.length;i++){
            if(i === id){
                newArr[i].type =true;
            }else{
                newArr[i].type=false;
            }
        }
        this.setState({
            topArr:newArr,
            group_id:group_id,
            page:1
        })
        this.getData(group_id);
    }
    getData(group_id){
        axios.get("https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id="+group_id+"&device_id=c78ad1b0-0fbd-11e9-8ad5-c31bae1602d7")
        .then((resp)=>{
            console.log(resp.data.data.item_list)
            this.setState({
                listArr:resp.data.data.item_list
            })
            console.log(this.state.listArr[0].item_id)
        })
    }
            
    render(){
        return(
            <div className="delicacy-img">
                <img src={'https://image.watsons.com.cn//upload/2760bd39.jpg'} alt=""/>
                    <h1>
                        <Icon onClick={this.goback} type="left" />
                        <span className="xinmeiji">新宠精致美肌</span>
                    </h1>
                <div>
                    <ul className="top-list">
                        {
                            this.state.topArr.map((item,index)=><li onClick={()=>this.changeBorder(item.id,item.group_id)} className={item.type?"active":""} key={index}>{item.name}</li>)
                        }
                    </ul>
                    <ul className="item-list">{
                        this.state.listArr.map((item,index)=><li key={index}>
                            <Link to={{pathname:'details', search:'item_id='+item.item_id+'&app_price='+item.min_app_price+'&market_price='+item.min_market_price+'&sale_point='+item.sale_point}}>
                                <div className="desc1">
                                    <img src={item.over_image_url} alt=""/>
                                    <div className="desc2">
                                        {
                                                item.promotions?
                                            <div className="youhui">{item.promotions[0]}</div>
                                            :""
                                        }
                                        {
                                            item.promotions?
                                            <div className="youhui1">{item.promotions[1]}</div>
                                            :""
                                        }
                                    </div>
                                </div>
                            </Link>
                            <div className="desc">
                                <div className="sale_point">{item.sale_point}</div>
                                <div className="name">{item.item_name}</div>
                                <div className="shop">
                                    <div className="price">￥{item.min_price/100}</div>
                                    <div className="icon-1"><Icon className="qcs-shopping1" type="shopping-cart"/></div>
                                </div>
                            </div>
                        </li>)
                    }
                    </ul>
                </div>
                <div className="sync" style={this.state.type?{'display':'block'}:{'display':'none'}}><Icon type="sync" spin />正在加载中.....</div>
                {this.state.end?<div>我是有底线的.....</div>:''}
                <BackTop/>
            </div>
        )
    }
}
export default Delicacy;