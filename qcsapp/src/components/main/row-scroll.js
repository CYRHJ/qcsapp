import React,{Component} from 'react';
class Rowscr extends Component{
    render(){
        return(
            <ul className = "list">{
                this.props.seckill.map((item)=>
                    <li key = {item.item_id } className="item">
                        <img src ={item.image_url} alt ="" />
                            <span>{item.item_short_name}</span>
                        <p>
                            <span>￥{(item.promotion_price/100)}</span>
                            <span>{(item.market_price?"￥"+item.market_price/100:'')}</span>
                        </p>
                    </li>
                )
            }
            </ul>
        )
    }
}
export default Rowscr;