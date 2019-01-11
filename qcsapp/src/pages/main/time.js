import {Component} from 'react';
class Time extends Component{
    render(){
        return(
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
        )
    }
}
export default Time;