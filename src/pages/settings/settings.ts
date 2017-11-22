import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  state: string;
  city: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {

    this.storage.get('location').then((val) => {
      if (val != null) {
        let location = JSON.parse(val);
        this.state = location.state;
        this.city = location.city;
      } else {
        this.state = 'NY';
        this.city = 'New York';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm() {
    let location = {
      state: this.state,
      city: this.city
    }
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.push(HomePage);
  }
}