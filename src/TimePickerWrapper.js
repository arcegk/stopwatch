import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class TimePickerWrapper extends React.Component {

    render(){
        return(
            <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="pauseLength">{this.props.label}</label>
              </div>
              <div className="col-md-6">
                  <TimePicker 
                  disabled={this.props.running} 
                  showHour={false}
                  onChange={this.props.onChangeFunc}
                  defaultValue={moment("000000", "h:mm:ss")}/>
              </div>
            </div>
          </div>
        )
    }
}

export default TimePickerWrapper;