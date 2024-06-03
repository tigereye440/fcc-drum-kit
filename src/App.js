import './App.css';
import React from 'react';

class Drumkit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: null,
      power: null,
      volume: 0.5,
      bank: 'drumsOne',
      display: ''
    };

    this.playAudio = this.playAudio.bind(this);
    this.handlePowerChange = this.handlePowerChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this)    
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBankChange = this.handleBankChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  playAudio(event) {
    if (!this.state.power) return;
    const audio = event.target.querySelector('.clip');
    if (audio) {
      audio.currentTime = 0;
      audio.volume = this.state.volume;
      audio.play();
      this.setState({
        display: event.target.id
      });
    }  
  }

  handleKeyPress(event) {
    if (!this.state.power) return;
    const key = event.key.toUpperCase();
    const audioElement = document.getElementById(key);
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.volume = this.state.volume;
      audioElement.play();
      this.setState({
        display: audioElement.parentElement.id 
    });
    }
  }


  handlePowerChange() {
    this.setState((state) => ({
      power: !state.power,
      display: state.power ? 'Power Off' : 'Power On'
    }));
  }

  handleVolumeChange(event) {
    const volume = event.target.value
    this.setState({
      volume, 
      display: `Volume: ${Math.round(volume * 100)}`
    })
  }

  handleBankChange() {
    this.setState((state) => ({
      bank: state.bank === 'drumsOne' ? 'drumsTwo' : 'drumsTwo',
      display: state.bank === 'drumsOne' ? 'Bank Two' : 'Bank One'
    }))
  }



  render() {
    const drumsOne = [
        { "key": "Q", "soundName": "Heater-1", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
        { "key": "W", "soundName": "Heater-2", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" },
        { "key": "E", "soundName": "Heater-3", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" },
        { "key": "A", "soundName": "Heater-4_1", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" },
        { "key": "S", "soundName": "Heater-6", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" },
        { "key": "D", "soundName": "Dsc_Oh", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" },
        { "key": "Z", "soundName": "Kick_n_Hat", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" },
        { "key": "X", "soundName": "RP4_KICK_1", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" },
        { "key": "C", "soundName": "Cev_H2", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" }
    ]

    const drumsTwo = [
      { "key": "Q", "soundName": "Chord-1", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Chord_1.mp3" },
      { "key": "W", "soundName": "Chord-2", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Chord_2.mp3" },
      { "key": "E", "soundName": "Chord-3", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Chord_3.mp3" },
      { "key": "A", "soundName": "Shaker", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Give_us_a_light.mp3" },
      { "key": "S", "soundName": "Open-HH", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dry_Ohh.mp3" },
      { "key": "D", "soundName": "Closed-HH", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Bld_H1.mp3" },
      { "key": "Z", "soundName": "Punchy-Kick", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/punchy_kick_1.mp3" },
      { "key": "X", "soundName": "Side-Stick", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/side_stick_1.mp3" },
      { "key": "C", "soundName": "Snare", "soundUrl": "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Brk_Snr.mp3" }
    ];
    

    const currentDrums = this.state.bank === 'drumsOne' ? drumsOne : drumsTwo;

   
    const pads = currentDrums.map((pad, i) => (
      <div 
        className='drum-pad bg-secondary' 
        id={pad.soundName} 
        key={i}
        onClick={this.playAudio}
      >
        <audio className='clip' id={pad.key} src={pad.soundUrl}></audio>
        {pad.key}
      </div>
    ));

    return (
      <div className='container'>
        <div id='drum-machine'>
          <div className='buttons'>
            {pads}
          </div>
          <div className='properties'>
            <div className="power">
              <label className="switch">
              <input type="checkbox" onClick={this.handlePowerChange} checked={this.state.power}/>
              <span className="slider"></span>
              </label>
              <span>Power</span>
            </div>
            <div id='display'>
              {this.state.display}
            </div>
            <div id='volume'>
              <input 
                max="1" 
                min="0" 
                step="0.01" 
                type="range" 
                value={this.state.volume} 
                onChange={this.handleVolumeChange}
              />
              <span>Volume</span>
            </div>
            <div className="bank">
              <label className="switch">
              <input 
                type="checkbox" 
                checked={this.state.bank}
                onChange={this.handleBankChange}
              />
              <span className="slider"></span>
              </label>
              <span>Bank</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Drumkit;
