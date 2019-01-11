import React,{Component} from 'react';
import {Icon,Checkbox,InputNumber} from 'antd';
import './index.scss';
class Shop extends Component{
    constructor(){
        super();
        this.state ={
            checked: true,
        }
    }

    backlast=()=>{
        this.props.history.go('-1')
    }
    onChange = (e) => {
        this.setState({
          checked: e.target.checked,
        });
      }
    render(){
        function onChange(value) {
          }
        return(

            <div className="shopping">
                <div className="shop_top">
                    <span><Icon type="left" onClick={this.backlast}/></span>
                    <span>购物车</span>
                    <span>编辑</span>
                </div>
                <ul className="shop_ul">
                    <li><img src={'https://image.watsons.com.cn//upload/27910d08.png'} alt=""/><span>正品保证</span></li>
                    <li><img src={'https://image.watsons.com.cn//upload/278ce554.png'} alt=""/><span>屈臣氏品牌</span></li>
                    <li><img src={'https://image.watsons.com.cn//upload/2e8ebc1f.png'} alt=""/><span>7天退货</span></li>
                </ul>
                <div className="wenzi1">
                    尊敬的屈臣氏用户：我们对《隐私政策》进行了更新。请仔细阅读《隐私政策》并确定了解我们对您个人信息的处理规则。阅读过程中，如您有任何疑问，可联系我们的客服咨询，如您不同意协议中的任何条款，您应立即停止继续使用屈臣氏提供的服务。【点击查阅】
                </div>
                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                <div>
                    <Checkbox checked={this.state.checked}disabled={this.state.disabled}onChange={this.onChange}></Checkbox>
                    <span>合计:￥</span>
                </div>
            </div>
        )
    }
}
export default Shop;