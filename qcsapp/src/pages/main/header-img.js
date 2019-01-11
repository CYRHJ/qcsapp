import React,{Component} from 'react';
class Img extends Component{
    render(){
        return(
            <div>
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
            </div>
        )
    }
}
export default Img;