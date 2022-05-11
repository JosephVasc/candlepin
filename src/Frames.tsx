import { Component, ReactNode} from 'react';
import './Frames.css';

export interface FramesProps {
  downed: number;
  active: boolean;
}

export default class Frames extends Component<FramesProps> { // set the Frames component it will be used in the game to loop through and show downed pins
  // you can do a fun thing here and set the downed pins to a different color when the frame is active ( boolean active == true);
  render(): ReactNode {
    return (
      <div className={this.props.active ? 'activeFrame' : ''}>  {/* if the frame is active add the active class to highlight the current ball */}
        <div className="frame">
          <div className="downed">{this.props.downed} downed</div>
        </div>
    </div>
    );
  }
}