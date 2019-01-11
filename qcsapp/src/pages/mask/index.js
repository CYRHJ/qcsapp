import React,{Component} from 'react';
import axios from 'axios';
import './mask.scss';
import {Icon,Progress} from 'antd';
import Swiper from '../../components/main/swiper';
class Mask extends Component{
    constructor(){
        super();
        this.state={
            swiperlist:[],
            resArr:[],
        }
    }
    componentDidMount(){
        axios.get('https://h5.watsons.com.cn/tms/aladdin/get?code=Mask_center_banner_index_1')
        .then((resp)=>{
            console.log(resp)
            this.setState({
                swiperlist:resp.data.data.datas
            })
        })
        axios.get('https://h5.watsons.com.cn/activity/specials/info?code=Mask_center_products_index_4&access_token=undefined')
        .then((res)=>{
            this.setState({
                resArr:res.data.data.specials_item_v_o_s
            })
        })
    }
    render(){
        return(
            <div className="mask">
                <div>
                    <Swiper swiperlist={this.state.swiperlist}/>
                </div>
                {/* 登录抢购资格 */}
                <div className="maskimg2">
                    <div className="text">
                        登录查看抢购资格
                    </div>
                        抢购资格可用于购买本活动优惠价商品<Icon type="question-circle"/>
                </div>
                <div className="maskimg3">
                    <div>
                        <div>特权面膜抢购</div>
                        <span>每款最多限购3件</span>
                        <img src={'https://asset.watsons.com.cn/act/static/images/mask-center/f32ab5c224e50c8935e6b23ec.png'} alt=""/>
                    </div>
                </div>
                <ul className="shopping">
                    {
                        this.state.resArr.map((item)=><li key={item.item_id}>
                            <div className="shopping_img">
                                <img src={item.image_url} alt=""/>
                                
                            </div>
                            <div className="shop_right">
                                <div className="shop_name">{item.item_short_name}</div>
                                <div className="write_shop"></div>
                                <div className="fast_price">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAXCAMAAAB03EJUAAAAllBMVEUAAAD/ZpH/XIj/WG7/ZZH/YIn/ZZL/ZZD/ZZL/ZpH/ZZL/ZpH/Xor/Y4//ZZH/ZpL/ZZL/ZZH/ZZH/ZZH/ZZL/ZZH/ZI//YY7/ZZH/ZZH/ZJD/ZJH/Y4//ZZL/ZZH/ZZL/ZZH/ZZH/ZZH/ZZH/ZZH/ZZH/ZJD/ZpL/ZZH/ZZL/ZZH/Y5D/ZZH/YY7/ZZH/ZJD/ZYz/ZpLDfCkvAAAAMXRSTlMA+gkEQBL3bdPftaUOHenj2VWujfPPNhq6nDBMI++noIZyZ6qAe0bIw76XK3cWWmInJsyFigAAA6JJREFUOMtNVVeC6jAMdOL03hNCCgQIbSm6/+XeyGbZNx84lqWxqhG/yIloxx+2bZs2EPFG6g0ghzNRIf7Ql2W5M+04fsg2Blr5PZrBZWF91V4d1p7nXQdQvTLvdvaA8xASpfF/VD4MTlZNdC0NAkZYa5g4OsOVbUUfVE8hoo4+uLo48OcNw2XvrxB2Q02QksZRMKS1lA7RxW0eZwgNAL8nIe6Qqg1tOvqihMkTQmf9IdL6WsywM0PJqnwHX/MoihY2FwJLuc3XmtKANTQSC5ewM3OTEgVbCyi+XCtpjEv1Ea0GtKQIaHTnYqmpSpCtw+FQwPoshTxwbP2ETOgsHb9cz8PFYN0iAYOq3x1ftRmPNHeUThUlfna5Q976qtoqtt3qwHldvR27qRMf7RHhMXq8XHcbr/B5XdzXIF2DypouBTmv9hmEx0g8kaVeIDasy9lwslYonBzDuOrPaILLdzFUjpP6BsNxbgIhJpvECM6URrbHxZAbokyaqg7psOxPqy3ZvO1P7rLVXG9c5Flvl/7DVsQZnQ+U7BwqJBzvImEnnJZ8dFRIZhkEN1sg5C6Y3uKDE/tcbQPksgjDcDLgZiT2BhUdZUfwNiMlPboPeo2Im1rdZZEqkGg9qA+6I0rfUU6vPi5vTdNssJ+lmGi8jRSeKRkCpDoM7jdU5CFE7MM4FvDVQd+C8ztdL1Jwdi4o9hCwQ7Tl63wUDBYhlosFWQZKOMKKNzPCBQkPmsuF0G4VxJhXiY+xsfb7H1/5bBnUFZTdYO8jwgXRjuCDCVvk4s49yAQXcMZ6SLNrgrNehV23Fz0QG1MeQYIQPcpqKN88CkJUMdb5Qfa4UghRcXaffohjbmZbbA1QcKr00EdznSImr/YCvstHIa6Eiuqh6KTAznlzRnC6fJ+uCkMu5Ynfhn4+AFOuWnjD02fCAaCsKEjVwMsf3oqWXwNTCOasBvHBRGSsokXYaOM/mDMxGtHneb597N0StW4EFNV8739DHOElOIGHlacqDY2BpbE0GhwuBnkd6wOx6+6PSNNVIsFQ9KTgZuxx5BpaBzipVBd61MnQoNrmFyrtIdywizfS+A1xJwYfzA9swek0mitTFC8hZ/qCCayEqpxTVbPzqRZn3E4d9C3VYyeJ8QNnAE7GBY95l0PYbKbwg2nX2sfDBOk9nG6mQE1xhs/+0wKZyT3mcxXZyx+hEem/HMD8gxQyMs2PUKpFi4EBlWiEtJ75+9NSMTQZ/wCYzJit6tBMAwAAAABJRU5ErkJggg==" alt=""/>
                                    <span>￥{item.market_price/100}</span>
                                    <Progress showInfo={false} percent={100/item.stock_all*(item.stock_all-item.stock_left)} size="small" />
                                    <span>{item.stock_all-item.stock_left}/{item.stock_all}</span>
                                </div>
                            </div>
                        </li>)  
                    }
                </ul>
            </div>
        )
    }
}
export default Mask;