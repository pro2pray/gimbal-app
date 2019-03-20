<<<<<<< HEAD
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';

=======
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
>>>>>>> 0af1850b6fab6e2f7ef41c356292042f9ec6f387

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

<<<<<<< HEAD
	@ViewChild('map') mapContainer: ElementRef;
	map: any;

  constructor(
  	public navCtrl: NavController,
  	public alertCtrl: AlertController,
  	public geolocation: Geolocation
  	) {
=======
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private geo: Geolocation) {
>>>>>>> 0af1850b6fab6e2f7ef41c356292042f9ec6f387

  	setTimeout(() => {

  		this.getLocations();

  	}, 1000);

  }

  getLocations() {
  	this.geo.getCurrentPosition().then((resp) => {
	 // resp.coords.latitude
	 // resp.coords.longitude
	 
	 this.alertCtrl.create({
	 	title: 'My GPS',
	 	message: 'lat : ' + resp.coords.latitude + ', Lng: ' + resp.coords.longitude,
	 	enableBackdropDismiss : true
	 }).present();

	}).catch((error) => {
	 
	  console.log('Error getting location', error);
	
	});
  }

  ionViewDidEnter() {
		console.log("Load Map");
		this.loadMap();
	}

	loadMap() {
		this.map = leaflet.map('map').fitWorld();

		leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; Rizky Arsyansyah Rinjani',
		    maxZoom: 18
		}).addTo(this.map);

		/*this.map.on('locationfound', (e) => {
			console.log(e.latlng);
		});*/

		this.geolocation.getCurrentPosition().then((resp) => {
			console.log(resp);
			let latlng = [resp.coords.latitude, resp.coords.longitude];
			this.presentAlert(JSON.stringify(latlng));

		 	this.map.setView(latlng, 13);

		 	leaflet.marker(latlng).addTo(this.map)
	          .bindPopup("Posisi Anda").openPopup();
		}).catch((error) => {
		  console.log('Error getting location', error);
		  this.presentAlert(JSON.stringify(error));
		});

		// this.map.flyTo([-7.150975,110.14025939999999], 13);

	    /*this.map.locate({
	    	setView: true,
	    	maxZoom: 18,
	    }).on('locationfound', (e) => {
	    	console.log("Found You..");
	    	console.log(e.latlng);
	    	this.presentAlert(JSON.stringify(e.latlng));
	    	// let radius = e.accuracy / 2;

	    	this.map.setView(e.latlng, 13);

	    	leaflet.marker(e.latlng).addTo(this.map)
	          .bindPopup("Posisi Anda").openPopup();

	        // leaflet.circle(e.latlng, radius).addTo(this.map);
	    });*/
	}

	async presentAlert(message) {
		let alert = await this.alertCtrl.create({
			message: JSON.stringify(message)
		});
		alert.present();
	}

}
