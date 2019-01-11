import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import './swiper.scss';
class Swiper extends Component{
    render(){
        return(
            <ReactSwipe className="carousel" swipeOptions={{continuous:true,auto:3000}} key={this.props.swiperlist.length}>
                {
                    this.props.swiperlist.map((item)=><div key={item.id}>
                        <img src={item.image_url} alt=''/>
                    </div>)
                }
            </ReactSwipe>
        )
    }
}
export default Swiper;