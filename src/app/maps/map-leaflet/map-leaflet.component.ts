import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../marker.service';
import { ShapeService } from '../../shape.service';
import { MessengerNotification } from '../../messenger-notification';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.css']
})


export class MapLeafletComponent implements AfterViewInit {
  private map;
  private states;
  // public form: string;
  public latitude = 39.8282;
  public longitude = -98.5795;
  private options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  };
  private notification = new MessengerNotification();

  constructor(private markerService: MarkerService,private shapeService: ShapeService) { 
    // this.form = "";
    // if('geolocation' in navigator) {
    //   /* geolocation is available */
    // } else {
    //   /* geolocation IS NOT available */
    // }
    navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.map.setView([this.latitude, this.longitude],12,{} );
        this.notification.getDisplayNotification('geolocalización obtenida con exitos!','success');
    }, (err) => {
      this.notification.getDisplayNotification('Opss.. ocurrio un error al momento de obtener la geolocalización: '+err,'danger');
    });
   
  }

  private initMap(): void {
    console.log('Antes');
    this.map = L.map('map', {
      center: [ this.latitude, this.longitude ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    
    
    
    // navigator.geolocation.getCurrentPosition(result=>{
    //   var crd = result.coords;
    //   // this.map = L.map('map', {
    //   //   // center: [ 51.505, -0.09 ],
    //   //   center: [ crd.latitude, crd.longitude ],
    //   //   zoom: 10
    //   // });
    //   console.log('Your current position is:');
    //   console.log(`Latitude : ${crd.latitude}`);
    //   console.log(`Longitude: ${crd.longitude}`);
    //   console.log(`More or less ${crd.accuracy} meters.`);
    // },err => {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    // },{
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // });
  }

  private highlightFeature(e) {
    const layer = e.target;
  
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }
  
  private resetFeature(e) {
    const layer = e.target;
  
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      })
    });
    onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.markerService.makeCapitalCircleMarkers(this.map);
    // this.shapeService.getStateShapes().subscribe(states => {
    //     this.states = states;
    //     this.initStatesLayer();
    //   });
  }
  
  // private success(pos): void {
  //   var crd = pos.coords;
  //   // this.latitude = crd.latitude;
  //   // this.longitude = crd.longitude;

  //   // this.map.setView([crd.latitude, crd.longitude],10,{} );
  //   //   = L.map('map', {
  //   //   // center: [ 51.505, -0.09 ],
  //   //   center: [ crd.latitude, crd.longitude ],
  //   //   zoom: 10
  //   // });
  //   console.log('Your current position is:');
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }
  
  // private error(err): void {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }
}