import React,{Component} from 'react';
import {Icon} from 'antd';
import './ninetab.scss';
class Ninetab extends Component{
    render(){
        return(
            <div className="img-2">
                <ul className="nine-tab">{
                        this.props.ninetab.map((item,index)=>

                        <li key={item.item_id}>
                        {this.props.type==='spe' && index > 5   ?"":
                        <div>
                            <img src={item.over_image_url} alt=""/>
                            <div className="twoline">
                                <span>{item.item_name.slice(0,16)}</span>
                                <span className="ccc"></span>
                            </div>
                            <div className="price1">
                                <span>￥{item.min_app_price/100}</span>
                                <span>{item.min_market_price===0?"":"￥"+item.min_market_price/100}</span>
                                <div className="icon-1"><Icon className="qcs-shopping1" type="shopping-cart"/></div>
                            </div>
                        </div>    
                            }
                        </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
export default Ninetab;