import { Component, ReactElement } from 'react';
import { FakeServer } from './FakeServer';
import { Frame, Player } from './model';
import Players from './Players';
import BowlingLane from './BowlingLane';
import BowlingGame from './BowlingGame';
import { ApiClient, ClientEventData } from './ApiClient';

import './App.css';



export interface AppState {
  // The current players in the game
  // The current lane
  // Start time
  // active or not
  // setting this to '?' so we can choose which state variable to modify
  isStarted?: boolean;
  isActive?: boolean;
  lane?: number;
  startingTime?: number;
  players?: Player[]
 }

export default class App extends Component<{}, AppState> {
  state: AppState = {
    // declare the state
    players: [],
    isStarted: false,
    lane: 0,
    isActive: false,
    startingTime: 0,
  };

  #apiClient?: ApiClient;
  #fakeServer?: FakeServer;

  componentDidMount(): void {
    // create a new fake server and api client that we can use to send data
    this.#fakeServer = FakeServer.create();
    this.#apiClient = ApiClient.create('', this.#fakeServer);
    this.#fakeServer.attach(); 
    // activate the api client set the state to active, lane and start time
    this.#apiClient.on('activate', (event: ClientEventData.Activate) => {
        this.setState({
          lane: event.lane, 
          startingTime: Date.now() 
        });
      });
  

    this.#apiClient.on('update', (event: ClientEventData.Update) => {
      let frameRef = this.state.players?.find(({ name }) => name === event.player)?.frames[event.frame]; // find the player with the name that matches the event player
      Object.assign(frameRef, {
        downed: event.downed,
        active: event.active,
      } as Frame);
      // why do we need to assign the frame to the state? because we are using the state to render the frame
      this.setState({
        players: this.state.players?.slice(0) // create a new array and copy the old one set the sstate here to the new array
      });
    }); 
  }

  restart(_event: MouseEvent) { // use a popup to confirm the restart. if confirmed then set the state to the default
    if (window.confirm('Are you sure you want to restart?')) {
      this.setState({
        players: [],
        isStarted: false,
        isActive: false,
        lane: 0,
        startingTime: 0,
      });
      this.#apiClient?.emit('restart');
    }
  }

  startBowling(playerNames: string[]): void { // function to start the game, accepts a list of player names sets the state to started and creates a new player for each name. 
    this.setState({
      isStarted: true, 
      players: playerNames.map(Player.create),
      
    });
     this.#apiClient?.start(playerNames); // send the player names to the api client
     console.log("the games started with state players: ", this.state.players);
  }

  render(): ReactElement {
    return (
      <div className = "App"> 
          <BowlingLane  startingTime={this.state.startingTime as number} bowlingLane={this.state.lane as number}/> {/* pass the states starting time and lane to the bowling lane component */}
          {this.state.isStarted ? ( // if this is started then render the game, else call Players passing the play start function (bound to this class)
            <BowlingGame
              playerNames={this.state.players as Player[]}
              apiclient={this.#apiClient as ApiClient}
              restartGame={this.restart.bind(this)}
            />):(<Players Play={this.startBowling.bind(this)} />)}
      </div>
    );
  }
}
