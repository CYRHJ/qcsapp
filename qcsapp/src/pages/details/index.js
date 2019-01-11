import React,{Component} from 'react';
import axios from 'axios';
import {Icon,Badge} from 'antd';
import './index.scss';
import {Link} from 'react-router-dom';
class Details extends Component{
    constructor(){
        super();
        this.state = {
            itemObj:{},
			item_id:'',
			app_price:0,
			market_price:0,
			success:false,//表示是否添加成功
            total:0,
            listArr:[],
        }
    }
    //item/reviews/list?item_id=2093&count=1&offset=0
    componentDidMount(){
        // console.log(this.props.location.search.slice(1))
        // console.log(this.props.location.search)
        // console.log(new URLSearchParams(this.props.location.search.slice(1)).get("item_id"))
        // let item_id= new URLSearchParams(this.props.location.search).get('item_id');
        let item_id= new URLSearchParams(this.props.location.search.slice(1)).get('item_id');
        this.setState({
			item_id:item_id,
			app_price:new URLSearchParams(this.props.location.search).get('app_price'),
            market_price:new URLSearchParams(this.props.location.search).get('market_price'),
            sale_point:new URLSearchParams(this.props.location.search).get('sale_point')
		})
        console.log(this.props)
        axios.get('https://h5.watsons.com.cn/item/reviews/list?item_id='+item_id+'&count=1&offset=0').then((res)=>{
            console.log(res)
            this.setState({
                itemObj:res.data.data.reviews[0]
            })
        });
        axios.get('https://h5.watsons.com.cn/act/mop/item/coupons?item_id='+item_id+'&count=30&offset=0').then((resp)=>{
            console.log(resp.data.data.coupons)
            this.setState({
                listArr:resp.data.data.coupons
            })
        });
    }
    totalFunc=()=>{
		let arr =  JSON.parse(localStorage.getItem('cart'));
		var total = 0;
		if(arr != null && arr.length){//有，追加数据
			//判断如果是同一种商品，需要修改num，如果不同的商品，直接将数据追加到 data数组中
			arr.map((item)=>{
				total += item.num
				
			})
			this.setState({
				total:total
			})
		}
	}
    goback=()=>{
        this.props.history.go(-1);
    }
    //加入购物车
    addCartFunc=()=>{
        let timeout="";
        this.setState({
            success:true
        })
        console.log(this.state);
        let data=[];
        let flag = true;
        let arr =JSON.parse(localStorage.getItem('cart'));
        console.log(arr);
        if(arr!= null && arr.length){
            arr.map((item)=>{
                if(item.id ==this.state.item_id){
                    item.num++;
                    flag = false;
                }
                data.push(item);
            })
            
        }
        if(flag){
            data.push({
				id:this.state.item_id,
				img_src:this.state.itemObj.sku_img_url,
				app_price:this.state.app_price,
				market_price:this.state.market_price,
				name:this.state.itemObj.sku_name,
				num:1//数量
            })
        }
        localStorage.setItem('cart',JSON.stringify(data));
        clearTimeout(timeout);
		
		timeout = setTimeout(()=>{
			this.setState({
				success:false
			})
		},1000);
		//计算总数量
		this.totalFunc();
		
	}
	componentWillUnmount(){
		
    }
    backmain=()=>{
        this.props.history.push('/')
    }
    backshop=()=>{
        this.props.history.push('./shop')
    }
    render(){
        let itemObj = this.state.itemObj;
        return(
            <div className="details">
                <div className="details-img"><img src={'https://image.watsons.com.cn//upload/2760bd39.jpg?x-oss-process=image/format,webp/interlace,1/quality,Q_70'} /></div>
                
                <div className="details-icon">
                    <Icon className="icon" onClick={this.goback} type="left" />
                    <span>{itemObj.sku_name}</span>
                </div>
                <div className="details-img1">
                    <img src={itemObj.sku_img_url} alt="" />
                    <div className="sale_point">
                        <span>{this.state.sale_point}</span>
                    </div>
                    <div className="sku_name">
                        <span>{itemObj.sku_name}</span>
                    </div>
                    <div className="app_price">
                        <span>￥{this.state.app_price/100}</span>
                    </div>
                </div>
                <div className="guarantee1">
                    <ul className="guarantee">
                        <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC" alt=""/>
                            <span>正品保证</span>
                        </li>
                        <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC" alt=""/>
                            <span>￥满68元免邮</span>
                        </li>
                        <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC" alt=""/>
                            <span>7天退货</span>
                        </li>
                    </ul>
                </div>
                <div className="ticket">
                    <span>领券</span>
                    {this.state.listArr.map((item,index)=>
                        <div className="ticket1" key={index}>{item.coupon_name}</div>
                    )
                    }
                </div>
                <div className="btns">
                    <div onClick={this.addCartFunc}>加入购物车</div>
                    <div>立即购买</div>
                </div>
                <div className="add_success" style={this.state.success?{'display':'block'}:{'display':'none'}}>添加成功</div>
				<div className="icon_btn">
					<Icon type="home" className="home" onClick={this.backmain}/>
					<Badge count={this.state.total}>
					<Icon type="shopping-cart"  className="shopping-cart" onClick={this.backshop}/>
					</Badge>
				</div>
            </div>
        )
    }
}
export default Details;