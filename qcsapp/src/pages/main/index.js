import React,{Component} from 'react';
import Swiper from '../../components/main/swiper';
import Ninetab from '../../components/main/ninetab';
import './main.scss';
import {Modal} from 'antd';
import axios from 'axios';
import './time.js';
import './header-img.js';
import Rowscr from '../../components/main/row-scroll';
import {Link} from 'react-router-dom';
import BackTop from '../../components/BackTop/index';
class Main extends Component{
    constructor(){
        super();
        this.state={
            endTime:[],
            hours:"",
            min:"",
            sec:"",
            seckill:[],
            ninetab:[],
            swiperlist:[],
            visible: true,
            ninetab1:[],
            ninetab2:[],
            ninetab3:[],
            ninetab4:[],
            ninetab5:[],
            ninetab6:[],
        }
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    componentDidMount(){
        axios.get("https://h5.watsons.com.cn/activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=c025fac0-0d75-11e9-a3fd-318d2f36e54f")
        .then((resp)=>{
            console.log(resp.data.data)
            this.setState({
                endTime:resp.data.data.specials_time_ranges[0].end,
                seckill:resp.data.data.specials_item_v_o_s
            })
        })
        axios.get("https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12779&device_id=1eb3d360-0d7f-11e9-8178-cd171d9fc968")
        .then((res)=>{
            console.log(res.data.data.item_list)
            this.setState({
                ninetab:res.data.data.item_list
            })
        })
        axios.get('aladdin/get_batch_data?codes=["chajian"]&version=&app_channel=wap&plat=wap&access_token=&device_id=1eb3d360-0d7f-11e9-8178-cd171d9fc968')
        .then((rep)=>{
            console.log(rep)
            this.setState({
                swiperlist:rep.data.data.chajian.datas
            })
        })
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12780&device_id=9900b770-0e59-11e9-9518-9ff5a8265838')
        .then((resps)=>{
            console.log(resps)
            this.setState({
                ninetab1:resps.data.data.item_list
            })
        })
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12781&device_id=9900b770-0e59-11e9-9518-9ff5a8265838')
        .then((resp1)=>{
            console.log(resp1)
            this.setState({
                ninetab2:resp1.data.data.item_list
            })
        })
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12543&device_id=9900b770-0e59-11e9-9518-9ff5a8265838')
        .then((resp2)=>{
            console.log(resp2)
            this.setState({
                ninetab3:resp2.data.data.item_list
            })
            // this.reduice()
        })
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12545&device_id=9900b770-0e59-11e9-9518-9ff5a8265838')
        .then((resp3)=>{
            console.log(resp3)
            this.setState({
                ninetab4:resp3.data.data.item_list
            })
        })
        axios.get('https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=12782&device_id=9900b770-0e59-11e9-9518-9ff5a8265838')
        .then((resp4)=>{
            console.log(resp4)
            this.setState({
                ninetab5:resp4.data.data.item_list
            })
        })
        axios.get('https://h5.watsons.com.cn/aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_topBig_forcase_180105_1%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=9900b770-0e59-11e9-9518-9ff5a8265838')
        .then((resp5)=>{
            console.log(resp5.data.data.Home_TopicCase_170505_7)
            this.setState({
                ninetab6:resp5.data.data.Home_TopicCase_170505_7.datas
            })
        })
        //倒计时
        setInterval(function(){
            function time (value){
                if(value < 10){
                    value = String("0" + value)
                }
                return value
            }
            function day (value){
                if(value >24){
                    value=value-24
                }
                return value
            }
            let date = new Date()
            let Etime = this.state.endTime;
            let all = Etime - date
            let hour = time(day(Math.floor(all/1000/60/60)))
            let min = time(Math.floor((day(all/1000/60/60) - hour) * 60))
            let sec = time( Math.floor((day((all/1000/60/60 - hour))* 60 - min) * 60))
            this.setState({
                hours:hour,
                sec:sec,
                min:min
            })
        }.bind(this),1000)
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{return}
    }
    render(){
        return(
            <div className="header-gif">
            <div className="pop-up">
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <img src={"https://image.watsons.com.cn//upload/6db00343.png"} style={{'width':'100%'}} alt=""/>
                </Modal>
            </div>
            {/* heard图片渲染 */}
                <div className="ceremony">
                    <img src={'https://image.watsons.com.cn//upload/7f66c995.gif'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/f1b6eeef.jpg'} alt=""/>
                </div>
                <div className="fourbtn">
                    <img src={'https://image.watsons.com.cn//upload/7bfc7523.jpg'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/72e1b6d3.jpg'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/892c6faa.jpg'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/dc40ed17.jpg'} alt=""/>
                </div>
                <div className="two-img">
                    <img src={'https://image.watsons.com.cn//upload/aa4c293a.jpg'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/804ba34f.jpg'} alt=""/>
                </div>
                <div className="seckill">
                {/* 倒计时及溢出滚动 */}
                    <div className="seckill-all">
                        <div className="times">
                            <div className="seckill-head">今日秒杀</div>
                            <div className="seckill-time">
                                <time>{this.state.hours}</time>
                                <span className = "countdown_t">:</span>
                                <time>{this.state.min}</time>
                                <span className = "countdown_t">:</span>
                                <time>{this.state.sec}</time>
                            </div>
                        </div>
                            <div className="seckill-more">更多好货></div>
                    </div>
                    <Rowscr seckill={this.state.seckill}/>
                </div>
                {/* 秒杀后图片数据 */}
                <div className="img-1">
                    <img src={'https://image.watsons.com.cn//upload/491f7964.jpg'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/f2a33fb4.gif'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/3247a6b0.jpg'} alt=""/>
                </div>
                    <Ninetab ninetab={this.state.ninetab} type="normal"/>
                <div>
                    <Swiper swiperlist = {this.state.swiperlist}/>
                </div>
                {/* 补水大 */}
                <div className="img-3">
                    <img src={'https://image.watsons.com.cn//upload/5d0d63f6.jpg?x-oss-process=image/quality,q_80/format,webp'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/b8ee0f79.jpg?x-oss-process=image/quality,q_80/format,webp'} alt=""/>
                </div>
                <Ninetab ninetab={this.state.ninetab1} type="normal"/>
                {/* 卸妆水低至49 */}
                <div className="img-4">
                <Link to='/delicacy'>
                    <img src={'https://image.watsons.com.cn//upload/3965e404.jpg'} alt=""/>
                </Link>
                </div>
                <Ninetab ninetab={this.state.ninetab2} type="normal"/>
                {/* 爆款低至9.9元 */}
                <div className="img-5">
                    <img src={'https://image.watsons.com.cn//upload/13bbaf39.jpg?x-oss-process=image/quality,q_80/format,webp'} alt=""/>
                </div>
                <Ninetab ninetab={this.state.ninetab3} type="spe"/>
                {/* 保温杯29元 */}
                <div className="img-6">
                    <img src={'https://image.watsons.com.cn//upload/af3f458d.jpg?x-oss-process=image/quality,q_80/format,webp'} alt=""/>
                </div>
                <Ninetab ninetab={this.state.ninetab4}/>
                {/* olay沐浴露 */}
                <div className="img-7">
                    <img src={'https://image.watsons.com.cn//upload/f6eae2cd.jpg?x-oss-process=image/quality,q_80/format,webp'} alt=""/>
                </div>
                <Ninetab ninetab={this.state.ninetab5}/>
                <div className="img-8">
                    <img src={'https://image.watsons.com.cn//upload/6639a5cc.jpg'} alt=""/>
                    <img src={'https://image.watsons.com.cn//upload/8c3676f5.jpg'} alt=""/>
                    <ul>
                    {
                        this.state.ninetab6.map((item,index)=>
                        <li key={item.id}>
                            <img src={item.image_url} alt=""/>
                        </li>
                        )
                        }
                    </ul>
                </div>
                <BackTop/>
            </div>
        )
    }
}
export default Main;