import React,{Component} from 'react';
import axios from 'axios';
class Datas extends Component{
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
    }
}
export default Datas;