import React, { Component } from 'react';
import Timer from './Timer';
import TimePickerWrapper from './TimePickerWrapper';
import './App.css';
import 'rc-time-picker/assets/index.css';

class App extends Component {

  state = {
    'time': '',
    'on_pause': false,
    'time_counter': '',
    'repetitions': 1,
    'pause_time': '',
    'initial_time': '',
    'running': false
  }

  onChangeValue = (e) => {
      let updateObj = {[e.target.name]: parseInt(e.target.value)}
      this.setState(updateObj);
  }

  onClickBtn = (e) =>{
    if(!this.state.running){
      this.setState({'running': true});
      let loops = 0;
      const ticker = (e) => {
        loops++;
        document.getElementById('beepSoundStart').play();
        let counter_helper = this.state.time;
        let counter_helper_rest = this.state.pause_time;
        this.setState({'on_pause': false});
        let interval = setInterval((e) =>{
          counter_helper = counter_helper - 1;
          this.setState({'time_counter': counter_helper});
          if (counter_helper === 0){
            document.getElementById('beepSound').play();
            clearInterval(interval);
            this.setState({'on_pause': true});
            if(loops < this.state.repetitions){
              let intervalRest = setInterval((e) =>{
                counter_helper_rest = counter_helper_rest - 1;
                this.setState({'time_counter': counter_helper_rest});
                if (counter_helper_rest === 0){
                  clearInterval(intervalRest);
                } 
                if (loops === this.state.repetitions + 1){
                  this.setState({'running': false});
                }
              }, 1000);
            }else{
              this.setState({'running': false});
            }
          }
        }, 1000);    
      }
      ticker();
      if(this.state.repetitions > 1){
        let repeatedFunc = setInterval(()=> {
          ticker();
          if (loops === this.state.repetitions){
            clearInterval(repeatedFunc);
          }
        }, (this.state.time + this.state.pause_time) *1000);
    }
  }
  }

  convertFromPicker = (value) => {
    return value.minutes()*60 + value.seconds();
  }

  changeTimerValue = (value) =>{
    let timerCounter = this.convertFromPicker(value);
    this.setState({'time': timerCounter, 'time_counter': timerCounter})
  }

  changePauseValue = (value) =>{
    let timerCounter = this.convertFromPicker(value);
    this.setState({'pause_time': timerCounter});
  }

  changeInitialValue = (value) => {
    let timerCounter = this.convertFromPicker(value);
    this.setState({'initial_time': timerCounter});
  }
  
  render() {
    return (
      <div className="container-fluid">
        <Timer time_counter={this.state.time_counter} on_pause={this.state.on_pause}/>
        <div className="col-md-12">
          <div className="row">
            <TimePickerWrapper onChangeFunc={this.changeTimerValue} 
              label={'Interval time (minutes:seconds)'} 
              running={this.state.running} />

            <div className="col-md-6">
              <label htmlFor="sessionTimes">Number of repetitions</label>
              <input disabled={this.state.running}
                type="number"
                name="repetitions"
                id="sessionTimes" value={this.state.repetitions}
                onChange={this.onChangeValue} />
            </div>
          </div>
        </div>

        <div className="col-md-12">
        <div className="row">
            <TimePickerWrapper onChangeFunc={this.changePauseValue} 
              label={'Rest time (minutes:seconds)'} 
              running={this.state.running} />

            <TimePickerWrapper onChangeFunc={this.changeInitialValue} 
              label={'Initial time (minutes:seconds)'} 
              running={this.state.running} />
        </div>
          <div className="row">
            <div className="nopadding col-md-12">
              <button disabled={this.state.time === "" ? true : false } style={{width: '100%'}} id="actionBtn" className={this.state.running ? 'btn btn-danger': 'btn btn-success' } onClick={this.onClickBtn}>{this.state.running ? 'Stop' : 'Start' }</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
