import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, Inject, Input } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit{
  constructor(private readonly http: HttpClient, private dataService: DataService) {
  }
  @Input() FilteredRoom;
  center: boolean;
  message: string;
  private booked: boolean;
  private map: any; 
  private UnclickableLayer: any;
  private ClickableLayer: any;
  private basemapLayer: any;
  private url = "/assets/ff1.geojson";
  private basemapUrl = "/assets/build.geojson";
  private bookedStyle = {
    fillColor: 'red',
    fillOpacity: 0.5,
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '3'
  };

  private style = {
    fillColor: 'green',
    fillOpacity: 0.5,
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '3'
  };

  private highlight = {
    'fillColor': 'yellow',
    'weight': 2,
    'opacity': 1
  };

  private forEachFeature(feature, layer, ClickableLayer) {
    layer.on("click", function (e) {
        ClickableLayer.setStyle(this.style);
        layer.setStyle(this.highlight);
        this.dataService.changeMessage(layer.feature.properties.id);
    }.bind(this));
}

  private filterFeature(feature, RoomId) {

    const featureIdString = feature.properties.id.toString();
    if (RoomId.includes(featureIdString)) {
      return null; 
    } else {
      console.log("layer id = ", featureIdString);
      console.log("RoomId = ", RoomId);
      return feature;
    }
  }

  private filterFeature2(feature, RoomId, booked) {
    const featureIdString = feature.properties.id.toString();
    if(booked==true){
      console.log("return booked room")
      if (RoomId.includes(featureIdString)) {
        return feature; 
      } else {
        return null;
      }
    } else {
      console.log("return unbooked room")
      if (RoomId.includes(featureIdString)) {
        return null; 
      } else {
        return feature;
      }
    }
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        this.initializeMap(L);
        this.insertGeojson(L);
        this.addClickableLayerAndCenterMap(this.basemapUrl, this.basemapLayer, this.center=true);
        this.addClickableLayerAndCenterMap(this.url, this.ClickableLayer, this.center=false);
        this.addClickableLayerAndCenterMap(this.url, this.UnclickableLayer, this.center=false);
      }).catch(error => console.error('Error loading Leaflet', error));
    }
  }

  private initializeMap(L: any) {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map'); // set default view
    L.tileLayer(baseMapURl).addTo(this.map);
    console.log("Initialize Map")
  }

  private insertGeojson(L: any) {
    this.basemapLayer =  L.geoJson(null, {
      style: this.style
    });
    this.ClickableLayer = L.geoJson(null, {
      onEachFeature: (feature, layer) => this.forEachFeature(feature, layer, this.ClickableLayer),
      style: this.style,
      filter: (feature) => this.filterFeature2(feature, this.FilteredRoom, this.booked=false)
    });
    this.UnclickableLayer = L.geoJson(null, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup("This room is already booked");
      },
      style: this.bookedStyle,
      filter: (feature) => this.filterFeature2(feature, this.FilteredRoom, this.booked=true)
    });
    console.log("Insert GeoJson")
  }

  private addClickableLayerAndCenterMap(url, layer, center): void {
    this.http.get(url).subscribe(
      (data: any) => {
        layer.addData(data);
        layer.addTo(this.map);
        console.log('Done room layer');
        
        if(center){
          const bound = this.basemapLayer.getBounds();
          this.centerMap(bound);
        }
      },
      (error: any) => {
        console.error('Error loading state layer', error);
      }
    );
  }

  private centerMap(bound: any) {
    this.map.setMaxBounds(bound);
    this.map.on('drag', () => {
      this.map.panInsideBounds(bound, { animate: false });
    });
    this.map.fitBounds(bound);
    this.map.setMinZoom(this.map.getBoundsZoom(bound));
    console.log("Center Map")
  }
}