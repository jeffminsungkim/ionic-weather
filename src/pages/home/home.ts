import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location: {
    state: string,
    city: string
  }

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {
  }

  ionViewWillEnter() {

    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val);

      } else {
        this.location = {
          state: 'NY',
          city: 'New York'
        }
      }
      this.weatherProvider.getWeather(this.location.state, this.location.city).subscribe((weather: any) => {
        this.weather = weather.current_observation;
      });
    });
  }
}
