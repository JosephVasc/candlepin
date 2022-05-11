import React, { Component } from 'react';
import { ApiClient } from './ApiClient';
import { Player } from './model';
import Frames from './Frames';
import { MdRestartAlt } from "react-icons/md";

import './BowlingGame.css';
// use the game class to create the game, table and rows and highlight the current bowler

export interface Bowling {
  apiclient: ApiClient;
  restartGame(event: any): void;
  playerNames: Player[];
}   

export interface BowlingState {
  isActive?: Player;
}

export default class BowlingGame extends Component<Bowling> {
  // componentDidMount(): void {
  //   this.props.apiclient.on('activate', (event: ClientEventData.Activate) => {
  //     this.setState({
  //       isActive: undefined, 
  //     } as BowlingState);
  //   }
  //   );
  // }
  state: BowlingState = {} as BowlingState;

  // create a get method to return the rows and create the table
  get DefineRows():JSX.Element[] {
    let rows: JSX.Element[] = [];
    for (let index = 0; index < 10; index++) { // loop through the rows index 10 times (0-10) and add a row to the array for each index and add the frame to the row
      rows.push(( // push the rows to the array
        <tr>
          <td>Frame: {index}</td>  
          {this.props.playerNames.map(player => ( // loop through the players and add the frame to the row
            <td id={`${player.name}_${index}`}>
              <Frames {...player.frames[index] } /> {/* pass the player.frames to the frame component at that index */}
            </td>
          ))}
        </tr>
      ));     
    } 
    return rows;
  }
  

  render(): React.ReactNode {
    // here we can call the define rows method to return the body of the table.
    // this should render out the 10 frames and the corresponding players (in order of entered)
    let rows = this.DefineRows; //get the rows from the method
    return (
      <div className="container">
      <table className="table">
        <thead>
          <tr className ="tr"> {/* create the table header, restart button, first player ----- last player */}
            <th><button onClick={this.props.restartGame}><MdRestartAlt></ MdRestartAlt></button></th>
            {this.props.playerNames.map(player => ( 
              <th>{player.name}</th> // add player to table header
            ))}
          </tr> 
        </thead>
        <tbody>
          {rows} 
        </tbody>
      </table>
      </div>
    );
  }
}
