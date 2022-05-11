import { ReactElement, useState } from 'react';

import './BowlingLane.css';

export interface BowlingLaneProps {
  startingTime: number;
  bowlingLane: number;

}

export default function BowlingLane({ bowlingLane, startingTime}: BowlingLaneProps): ReactElement {
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // some state problem is causing the starting time and lane to bug out,
  // I think it is because the state for active is not being updated properly
  setInterval(() => {
    setTime(Math.round((Date.now() - startingTime)/ 1000)); // set the time from starting time
    setMinutes(Math.floor(time/60)); // convert it to minutes
    setSeconds(time%60); // convert it to seconds
  }, 1000);

  return (
    <div>
      <div className="navigation">
        <div className="left">Lane {bowlingLane}</div>
        {/* I wanted to show 00:00 format here so if the minutes and seconds < 10 it will show 0{minutes}:0{seconds} */}
        {minutes < 10 && seconds < 10 ? ( 
          <div className="right">0{minutes}:0{seconds}</div> 
        ) : (
          <div className="right">{minutes}:{seconds}</div>
        )}
      </div>          
                      
      </div>
  );
}