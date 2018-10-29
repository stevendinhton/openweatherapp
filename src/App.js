import React, { Component } from 'react';
import './App.css';

const API = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const KEY = '4b708f1c1b3b771b1e5c408ae251188f';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCity: 'Toronto',
      data: null
    }

    this.setToronto = this.setToronto.bind(this);
    this.setWaterloo = this.setWaterloo.bind(this);
  }

  setToronto() {
    this.setState(
      {selectedCity: 'Toronto'},
      this.getWeatherData
    );
  }

  setWaterloo() {
    this.setState(
      {selectedCity: 'Waterloo'},
      this.getWeatherData
    );
  }

  getWeatherData() {
    fetch(API + this.state.selectedCity + '&APPID=' + KEY)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  componentDidMount() {
    this.getWeatherData();
  }

  render() {
    return (
      <div className="App">
        <div className="app-header">
          Current weather for {this.state.selectedCity}:
        </div>
        <div className="weather-container">
          {this.state.data ? this.state.data.main.temp + '°C, ' + this.state.data.weather[0].main : ''}
        </div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary">
            <input type="radio" id="option1" autoComplete="off" onClick={this.setToronto}/> Toronto
          </label>
          <label className="btn btn-secondary">
            <input type="radio" id="option2" autoComplete="off" onClick={this.setWaterloo}/> Waterloo
          </label>
        </div>
        <div>
          Clicking again will refresh
        </div>
      </div>
    );
  }
}

export default App;
