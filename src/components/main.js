import React from 'react';
import $ from 'jquery';
import soundfile from "../assets/Clock-alarm-electronic-beep.mp3"
import{
  Link
} from 'react-router-dom';
import pomo from "../assets/pomo.png"
import pomo2 from "../assets/pomo2.png"
import pomo3 from "../assets/pomo3.png"
var myInterval;
var pomoInterval;

function playAudio(){
  const audioEl = document.getElementById("beep");
    audioEl.play()
    console.log(audioEl.paused)
  }

function resetAudio(){
  const audioEl = document.getElementById("beep");
  if(!audioEl.paused){
    audioEl.pause()
    audioEl.currentTime = 0;
    console.log("hi")
  }
}


class Main extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      time: `${25}:00`,
      seconds: 1500,
      ticking: "no",
      onBreak:"no",
      timerLabel: "Session"
    }
    this.handleIncrement = this.handleIncrement.bind(this)
    this.play = this.play.bind(this)
    this.reset = this.reset.bind(this)
//this.handleChange = this.handleChange.bind(this)
  }

componentDidMount(){

  //PLAY AUDIO FUNCTION


  this.transparent=()=>{
    if($("#pomo2").hasClass("transparent")){
      $("#pomo2").removeClass("transparent");
      $("#pomo3").addClass("transparent");
    }
    else{
      $("#pomo3").removeClass("transparent");
      $("#pomo2").addClass("transparent");
    }
  }
  pomoInterval = setInterval(this.transparent,500)

  this.ticker = () =>{
    this.state.seconds--;
    if(this.state.time == "00:00" && this.state.onBreak == "no"){
      this.setState({
        seconds: this.state.break * 60,
        onBreak: "yes",
        timerLabel: "Break"
      })
      playAudio();
    }
    else if(this.state.time == "00:00" && this.state.onBreak == "yes"){
      this.setState({
        seconds: this.state.session * 60,
        onBreak: "no",
        timerLabel: "Session"
      })
      playAudio();
    }
    let minutes = Math.floor(this.state.seconds / 60);
    let seconds = this.state.seconds % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    this.setState({
      time: `${minutes}:${seconds}`,
    })

    console.log(this.state.time)

    }
}

componentWillUnmount(){
  clearInterval(pomoInterval);
}






play(){
  if(this.state.ticking === "no"){
    myInterval = setInterval(this.ticker,1000)
    this.setState({
      ticking: "yes"
    }, () => console.log(this.state.ticking))
  }
  else{
    clearInterval(myInterval);
    this.setState({
      ticking: "no",
    }, () => console.log(this.state.ticking))
  }
}

reset(){
  resetAudio();

  if(this.state.ticking === "yes"){
    clearInterval(myInterval);
    this.setState({
      ticking: "no",
    }, () => console.log(this.state.ticking))
  }
  this.setState({
    session: 25,
    break: 5,
    ticking: "no",
    onBreak:"no",
    timerLabel: "Session"
  },() => this.setState({seconds: this.state.session * 60, time: `${this.state.session}:00`,}))
}
//ACTUALLY HANDLES INCREMENT AND DECREMENT BUT IM TOO FAR IN THE NAMES SORRY
handleIncrement(event){
    if(this.state.onBreak == "yes" && event.target.id == "session-increment" || this.state.onBreak == "yes" && event.target.id == "session-decrement" ){
      return;
    }
    if(this.state.ticking === "yes"){
      clearInterval(myInterval);
      this.setState({
        ticking: "no",
      }, () => console.log(this.state.ticking))
    }

    switch(event.target.id){
    case "break-increment":
       if(this.state.break < 60 && this.state.onBreak == "yes"){
         if(this.state.break < 9 && this.state.break < 60){
           this.setState({
             session: this.state.break + 1,
           },() =>this.setState({time:"0" + this.state.break.toString()+":00", seconds: this.state.break * 60}))
         }
        else{
          this.setState({
          break: this.state.break + 1,
        },() => this.setState({time: this.state.break.toString()+":00",seconds: this.state.break * 60}));
      }
    }
      else if(this.state.break < 60){
        this.setState({
          break: this.state.break + 1
        })
      }
      break;

    case "session-increment":

     if(this.state.session < 60 && this.state.onBreak != "yes"){
      if(this.state.session < 9 && this.state.session < 60){
        this.setState({
          session: this.state.session + 1,
        },() =>this.setState({time:"0" + this.state.session.toString()+":00", seconds: this.state.session * 60}))
      }
      else{
        this.setState({
        session: this.state.session + 1,
        },() => this.setState({time: this.state.session.toString()+":00",seconds: this.state.session * 60}));
      }
      }
      break;

    case "break-decrement":

      if(this.state.break > 1 && this.state.onBreak == "yes"){
        if(this.state.break <= 10 && this.state.break > 1){
          this.setState({
            session: this.state.break - 1,
          },() =>this.setState({time:"0" + this.state.break.toString()+":00", seconds: this.state.break * 60}))
        }
        else{this.setState({
          break: this.state.break + - 1
        },() => this.setState({time: this.state.break.toString()+":00",seconds: this.state.break * 60}));
      }
    }
      else if(this.state.break > 1){
        this.setState({
          break: this.state.break - 1
        })
      }
      break;

    case "session-decrement":
      if(this.state.session <= 10 && this.state.session > 1){
        this.setState({
          session: this.state.session - 1,
        },() =>this.setState({time:"0" + this.state.session.toString()+":00", seconds: this.state.session * 60}))
      }
      else if(this.state.session > 1 && this.state.onBreak != "yes"){
        this.setState({
          session: this.state.session - 1
        },() => this.setState({time: this.state.session.toString()+":00",seconds: this.state.session * 60}));
      }
      break;

  }
}



render(){


  return (
    <div id= 'container'>

      <div id = "title-container">
        <h1 id = "title">Pomodoro Clock</h1>
        <div id = "about-container">
          <div id = "about">
            <Link to = "/about">About</Link>
          </div>
        </div>
      </div>
      <div id = "clock">
        <img className = "pomo transparent" id = "pomo3" src = {pomo3}/>
        <img className = "pomo" id = "pomo2" src = {pomo2}/>
        <div id = "labels">
          <div id = "break-container" className = "label-container">
            <div id="break-label" className = "label">Break Length</div>
            <div id = "break-increment" className = "increment scale" onClick = {this.handleIncrement}><i className="fa fa-arrow-up noSelect"></i></div>
            <div id = "break-length" className = "lengths">{this.state.break}</div>
            <div id = "break-decrement" className = "decrement scale" onClick = {this.handleIncrement}><i className="fa fa-arrow-down noSelect"></i></div>
          </div>
          <div id = "session-container" className = "label-container">
            <div id ="session-label" className = "label">Session Length</div>
            <div id = "session-increment" className = "increment scale" onClick = {this.handleIncrement}><i className="fa fa-arrow-up noSelect"></i></div>
            <div id = "session-length" className = "lengths">{this.state.session}</div>
            <div id = "session-decrement" className = "decrement scale" onClick = {this.handleIncrement}><i className="fa fa-arrow-down noSelect"></i></div>
          </div>
        </div>
        <div id = "timer">
          <div id = "timer-label">{this.state.timerLabel}</div>
          <div id = "time-left">{this.state.time}</div>
          <audio id = "beep"> <source  src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></source> </audio>
        </div>
        <div id = "buttonContainer">
          <div id = "start_stop" onClick = {this.play} className = "scale">
            <i className="fa fa-play noSelect"></i>
            <i className = "fa fa-pause noSelect"></i>
          </div>
          <div id = "reset" onClick = {this.reset} className = "scale"><i className="fa fa-refresh noSelect"></i></div>
        </div>
      </div>

    </div>

  );

}
}
export default Main;
//
