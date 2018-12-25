import React from 'react';

class Timer extends React.Component{
    constructor(props){
       super(props);
       this.state = {'time': props.time_counter, 'on_pause': props.on_pause};
    }
    render(){
        return (
            <div style={{backgroundColor: this.state.on_pause ? '#dc3545': '#218838'}} 
                className="jumbotron col-md-12">
                <h1 className="text-center">{this.state.time}</h1>
            </div>
        );
    }

    static getDerivedStateFromProps = (prevState, state) => {
        console.log(prevState, state);
        let time = prevState.time_counter;
        let minutes = Math.floor(time/60);
        let timer_count = `${minutes < 10 ? '0': ''}${minutes}:${time - (minutes*60) < 10 ? '0': ''}${time - (minutes*60)}`;
        return {'time': timer_count, 'on_pause':prevState.on_pause }
    }
}

export default Timer;