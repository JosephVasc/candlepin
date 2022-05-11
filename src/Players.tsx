import { ReactElement, useRef, useState } from 'react';
import './Players.css';
import { BsFillPlusSquareFill } from 'react-icons/bs';

export interface PlayerProps {
  Play(players: string[]): void; // this accepts the function bound to StartBowling in App.tsx
}

export default function Players({ Play }: PlayerProps): ReactElement {
  let form = useRef<HTMLFormElement>() as { //create a form reference and set it to the form element
    current: HTMLFormElement & {
      elements: HTMLFormControlsCollection
    }
  };
  
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  function addPlayers(): void { // create a function to add players, ensure the user can not enter more than 8 players and add players to the array
    // loop through the inputs, each input will be sliced (first letter) to replace lower case to upper case. 
    // then call the setPlayerNames function to update the state of 'playerNames'
    // then reset the form to empty indicting the user can enter another player.
    console.log(playerNames.length)
    if(playerNames.length >= 8) {
      alert('You cannot add more than 8 players');
      return;
    }
    for (let currentInput of form.current.elements as HTMLCollectionOf<HTMLInputElement>) {
      if (currentInput.value !== '') {
        currentInput.value = currentInput.value.charAt(0).toUpperCase() + currentInput.value.slice(1);
        setPlayerNames([...playerNames, currentInput.value]);
      }
    }
    form.current.reset();
  }

  function start(): void {
    // call the bound function Play to start the game (when start button is activated.)
    Play(playerNames); // pass the player names to the game
  }


  return (// render the form and start button, if there are no names entered by user,the start button will not render, when user enters a name it will render the start button
    <>
    <div className="container">
      <form className="form" ref={form} onSubmit={(event) => event.preventDefault()}>
        <button className="Button" type="submit" onClick={addPlayers}><BsFillPlusSquareFill></BsFillPlusSquareFill></button>
          <input
            type="text"
            className="form-control"
            placeholder="Add Players Name"
           />
      </form>
      <div>
      <h2 className = "players">
       {playerNames.map((name, index) => (
          <div key={index}>
            {name}
          </div>
        ))}
      </h2>
      </div>  
      <div className = "center">
      {playerNames.length > 0 ? (
        <button className="Button" onClick={start}>Start</button>
      ): (
        <p>You must add at least one player to start the game</p>
      )}
      </div>
    </div>
      </>
      
  );
}