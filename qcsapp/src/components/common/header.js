import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss';
import axios from 'axios';
import {Row,Col,Icon,Input,Drawer} from 'antd';
import {withRouter} from 'react-router-dom';
class Header extends Component{
    constructor(){
        super();
        this.state={
            visible: false,
            searchlist:[],
        }
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
    goCenter=()=>{
        this.props.history.push('./center')
    }
    goshop=()=>{
        this.props.history.push('./shop')
    }
      componentDidMount(){
        axios.get("https://h5.watsons.com.cn/search/hotWord")
        .then((resp)=>{
            console.log(resp.data.data)
            this.setState({
                searchlist:resp.data.data.word_list
            })
        })
    }
   
    render(){
        const pathname=this.props.location.pathname
        return(
            <div>
                {
                    pathname ==='/' ||pathname ==='/life'||pathname ==='/mask'||pathname ==='/global'?
                    <div className="qcs-header">
                        <div className="qcs-search">
                            <div>
                            <Drawer
                                placement="right"
                                closable={false}
                                visible={this.state.visible}
                                >
                                <Input className="qcs-input" onClick={this.showDrawer}
                                placeholder="面膜"
                                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                onChange={this.onChangeUserName}
                                ref={node => this.userNameInput = node}/>
                                <div className="" onClick={this.onClose}>取消</div>
                                <div className="hotsearch">热门搜索</div>
                                <ul className="searchlist">
                                    {
                                        this.state.searchlist.map((item)=><li key={item}>
                                            {item}
                                        </li>)
                                    }
                                </ul>
                                </Drawer>
                            </div>
                            <Row>
                                <Col span={4}><Icon className="qcs-user" type="user" onClick={this.goCenter}/></Col>
                                <Col span={16}><Input className="qcs-input" onClick={this.showDrawer}
                                placeholder="面膜"
                                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                onChange={this.onChangeUserName}
                                ref={node => this.userNameInput = node}/></Col>
                                    <Col span={4}><Icon className="qcs-shopping"  type="shopping-cart" onClick={this.goshop}/></Col>
                            </Row>
                        </div>
                        <nav className="qcs-menu">
                            <ul>
                                <li><NavLink exact to='/' activeClassName="active">今日推荐</NavLink></li>
                                <li><NavLink to='/mask' activeClassName="active">面膜中心</NavLink></li>
                                <li><NavLink to='/life' activeClassName="active">居家生活</NavLink></li>
                                <li><NavLink to='/global' activeClassName="active">购全球</NavLink></li>
                            </ul>
                        </nav>
                    </div>:""
                }
        </div>
        )
    }
}
export default withRouter(Header);


