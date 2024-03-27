import {Component, ViewChild, ElementRef, HostListener, Input} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {STATE_BILL} from 'src/app/utils/constant/index';
import {GlobalService} from 'src/app/services/Common/global.service';
import {MapService} from 'src/app/services/Business/map.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tracking-journey',
  templateUrl: './tracking-journey.component.html',
  styleUrls: ['./tracking-journey.component.scss'],
})
export class TrackingJourneyComponent {
  @Input() showMap: boolean = false;
  @Input() batchCode: string = '';
  STATE_BILL = STATE_BILL;
  showHistory: boolean = false;
  toggleHistory(value: boolean) {
    this.showHistory = value;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = `${this.containerMapRef.nativeElement.offsetWidth}px`;
  }
  private map!: google.maps.Map;
  @ViewChild('map') mapRef!: ElementRef;
  @ViewChild('containerMap') containerMapRef!: ElementRef;

  vehicleCode: string = '';
  listVehicle: any = [];
  selectedStates: any = [];
  openMenu: boolean = true;
  width: string = '';
  selected: any = {};
  checkActive: any = null;

  private mapStyles = [
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  showLocation: any = {
    vjc: false,
    tien_sa: false,
    drive_online: true,
  };

  dataLocation: any = null;

  markerVjc: any = null;
  markerTienSa: any = null;
  markerLocationOnline: any = null;
  historyInfo: any = null;
  vehicleLocation: any = [];

  orderReleaseCodeSelected: string = '';

  listData: any = {
    being_transported: [],
    finished: [],
  };

  vehicleKeyword: string = '';

  polylines: any = [];
  directions: any = [];

  startMarker: any = null;
  endMarker: any = null;

  truck: any = null;
  markerMove: any = null;

  constructor(
    private mapService: MapService,
    private dropdownService: DropdownService,
    private globalService: GlobalService,
    public utils: utils,
  ) {
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.width =
        window.innerWidth <= 767
          ? `${this.containerMapRef?.nativeElement?.offsetWidth - 250}px`
          : value
          ? `${this.containerMapRef?.nativeElement?.offsetWidth - 250}px`
          : `${this.containerMapRef?.nativeElement?.offsetWidth + 250}px`;
    });
    this.globalService.setBreadcrumb([
      {
        name: 'Giám sát hành trình',
        path: 'business/payment-voucher',
      },
    ]);
    this.mapService.initiateSignalrConnection();
  }

  ngOnInit(): void {
    this.loadInit();
  }

  ngOnChanges() {
    if (this.containerMapRef) {
      this.width = `${this.containerMapRef?.nativeElement?.offsetWidth}px`;
      this.getTrackingLocation(true);
      this.initMap();
      this.checkActive = setInterval(() => {
        this.checkActiveVehicle();
      }, 600000);
    }
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
    if (this.checkActive) {
      clearInterval(this.checkActive);
    }
  }

  checkActiveVehicle() {
    if (this.vehicleLocation?.length > 0) {
      this.vehicleLocation.forEach((element: any) => {
        const duration = moment.duration(moment().diff(moment(element?.time)));
        const minutes = Math.round(duration.asMinutes());
        if (minutes > 5) {
          element.marker.setIcon({
            anchor: new google.maps.Point(15, 15),
            scaledSize: new google.maps.Size(30, 30),
            url: 'assets/img/un-active.png',
          });
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.mapService.hubLocation.subscribe((message: any) => {
      console.log('hubLocation: ', message);
      if (message && message != '') {
        this.updateLocation(message);
      }
    });
    this.mapService.hubTracking.subscribe((message: any) => {
      console.log('hubTracking: ', message);
      if (message && message != '') {
        this.getOrderTracking();
      }
    });
  }

  getOrderTracking(VehicleCode: string = '') {
    this.removeHistory();
    this.mapService
      .getOrderTracking({
        VehicleCode: VehicleCode,
        CompanyCode: '',
        BatchCode: this.batchCode,
      })
      .subscribe(({data}: any) => {
        this.listData = data?.reduce(
          (result: any, element: any) => {
            if (element?.state == this.STATE_BILL.CAN_LAN_2 || element?.state == this.STATE_BILL.RA_CONG) {
              return {
                ...result,
                being_transported: [...result?.being_transported, element],
              };
            }
            if (element?.state == this.STATE_BILL.DO_HANG || element?.state == this.STATE_BILL.DEN_CANG) {
              return {
                ...result,
                finished: [...result?.finished, element],
              };
            }
            return result;
          },
          {
            being_transported: [],
            finished: [],
          },
        );
      });
  }

  checkTimeExceeded(timeString: string): boolean {
    const time = moment(timeString);
    const now = moment();
    const duration = moment.duration(now.diff(time));
    const minutesPassed = duration.asMinutes();
  
    return minutesPassed <= 20;
  }

  getTrackingLocation(first: boolean = false) {
    this.mapService
      .getTrackingLocation({
        State: [this.STATE_BILL.CAN_LAN_2, this.STATE_BILL.RA_CONG],
        BatchCode: this.batchCode,
      })
      .subscribe(({data}: any) => {
        if (this.vehicleLocation?.length > 0) {
          this.vehicleLocation.forEach((element: any) => {
            element?.marker?.setMap(null);
          });
          this.vehicleLocation = [];
        }
        const dataLocation = data?.reduce((result:any, element: any) => {
          return this.checkTimeExceeded(element?.trackingDatas[0]?.timeStamp) ? 
          [
            ...result,
            {
              ...element?.trackingDatas[0],
              name: element?.vehicle,
              code: element?.orderCode,
            }
          ] : result;
        }, []);
        this.vehicleLocation = this.drawMarker(dataLocation, 'assets/img/active.gif');
        if (
          this.selected &&
          this.selected?.state != this.STATE_BILL.DO_HANG &&
          this.selected?.state != this.STATE_BILL.DEN_CANG
        ) {
          this.vehicleLocation.forEach((element: any) => {
            if (element?.code === this.selected?.code) {
              element?.marker?.setMap(null);
            }
          });
        }
        if (this.vehicleLocation?.length > 0 && first) {
          this.optimizeMapZoomLevel();
        }
      });
  }

  getTrackingStationLocation() {
    this.mapService.getTrackingStationLocation().subscribe(({data}: any) => {
      if (data?.length > 0) {
        this.dataLocation = {
          tien_sa: {
            ...data[0],
            lat: data[0]?.latitude,
            lng: data[0]?.longitude,
          },
          vjc: {
            ...data[1],
            lat: data[0]?.latitude,
            lng: data[0]?.longitude,
          },
        };
      }
    });
  }

  getHistory(params: any, selected: boolean = false) {
    if (this.markerLocationOnline && !selected) {
      this.vehicleLocation.forEach((element: any) => {
        if (element?.code === this.historyInfo?.code) {
          const mapMarker = new google.maps.Marker({
            map: this.map,
            draggable: false,
            icon: {
              anchor: new google.maps.Point(30, 30),
              scaledSize: new google.maps.Size(60, 60),
              url: 'assets/img/active.gif',
            },
            position: {
              lat: this.markerLocationOnline.getPosition().lat(),
              lng: this.markerLocationOnline.getPosition().lng(),
            },
          });
          element.marker = mapMarker;
          const contentHtml = document.createElement('div');
          contentHtml.innerHTML = `<span style="color: black">${this.historyInfo?.name} heheh</span>`;
          const infoWindow = new google.maps.InfoWindow({
            content: contentHtml,
          });
          google.maps.event.addListener(mapMarker, 'click', () => {
            infoWindow.open(this.map, mapMarker);
          });
        }
      });
    }
    this.removeHistory();
    if (selected) {
      if (this.showLocation.drive_online) {
        this.vehicleLocation.forEach((element: any) => {
          if (element?.code === params?.code) {
            const mapMarker = new google.maps.Marker({
              map: this.map,
              draggable: false,
              icon: {
                anchor: new google.maps.Point(30, 30),
                scaledSize: new google.maps.Size(60, 60),
                url: 'assets/img/active.gif',
              },
              position: element?.position,
            });
            element.marker = mapMarker;
            const contentHtml = document.createElement('div');
            contentHtml.innerHTML = `<span style="color: black">${element.name}</span>`;
            const infoWindow = new google.maps.InfoWindow({
              content: contentHtml,
            });
            google.maps.event.addListener(mapMarker, 'click', () => {
              infoWindow.open(this.map, mapMarker);
            });
          }
        });
      }
      this.selected = {};
      return;
    }
    this.selected = {...params};
    this.mapService
      .getTrackingLocation({
        State: [params.state],
        VehicleCode: params?.vehicleCode,
        OrderCode: params?.code,
        BatchCode: this.batchCode,
      })
      .subscribe(({data}: any) => {
        if (params?.state === this.STATE_BILL.DO_HANG || params?.state === this.STATE_BILL.DEN_CANG) {
          this.createPolyline(data[0]?.trackingDatas);
          this.optimizeMapZoomLevel();
        } else {
          if (this.showLocation.drive_online) {
            this.vehicleLocation.forEach((element: any) => {
              if (element?.code === params?.code) {
                element?.marker?.setMap(null);
              }
            });
          }
          this.historyInfo = {
            ...this.historyInfo,
            code: params?.code,
            name: data[0]?.vehicle,
          };
          this.markerLocationOnline = new google.maps.Marker({
            map: this.map,
            draggable: false,
            icon: {
              anchor: new google.maps.Point(30, 30),
              scaledSize: new google.maps.Size(60, 60),
              url: 'assets/img/active_red.gif',
            },
            position: {
              lat: data[0]?.trackingDatas[0]?.latitude,
              lng: data[0]?.trackingDatas[0]?.longitude,
            },
          });
          const contentHtml = document.createElement('div');
          contentHtml.innerHTML = `<span style="color: black">${data[0]?.vehicle}</span>`;
          const infoWindow = new google.maps.InfoWindow({
            content: contentHtml,
          });

          google.maps.event.addListener(this.markerLocationOnline, 'click', () => {
            infoWindow.open(this.map, this.markerLocationOnline);
          });

          this.createPolyline(data[0]?.trackingDatas, '#ef4e65', false);
        }
      });
  }

  removeLocation(key: string = 'vjc') {
    if (this.markerVjc && key === 'vjc') {
      this.markerVjc.setMap(null);
      this.markerVjc = null;
    }
    if (this.markerTienSa && key === 'tien_sa') {
      this.markerTienSa.setMap(null);
      this.markerTienSa = null;
    }
    if (this.vehicleLocation?.length > 0 && key === 'drive_online') {
      this.vehicleLocation.forEach((vehicle: any) => {
        if (vehicle?.marker) {
          vehicle.marker.setMap(null);
        }
      });
      this.vehicleLocation = [];
    }
  }

  removeHistory() {
    if (this.truck) {
      this.truck.setMap(null);
      this.truck = null;
    }
    if (this.polylines?.length > 0) {
      this.polylines.forEach((polyline: any) => {
        polyline.setMap(null);
      });
      this.polylines = [];
    }
    if (this.directions?.length > 0) {
      this.directions.forEach((direction: any) => {
        direction.setMap(null);
      });
      this.directions = [];
    }
    if (this.markerLocationOnline) {
      this.historyInfo = null;
      this.markerLocationOnline.setMap(null);
      this.markerLocationOnline = null;
    }
    if (this.startMarker) {
      this.startMarker.setMap(null);
      this.startMarker = null;
    }
    if (this.endMarker) {
      this.endMarker.setMap(null);
      this.endMarker = null;
    }
    if (this.markerMove) {
      clearInterval(this.markerMove);
    }
  }

  async createPolyline(data?: any, color: string = '#0c67b2', effect: boolean = true) {
    if (!data || data?.length == 0) {
      return;
    }

    const waypoints = data?.map((item: any) => {
      return {
        lat: item?.latitude,
        lng: item?.longitude,
      };
    });

    let listArray: any = [];

    let prevIndex = 0;
    waypoints.forEach((item: any, index: number) => {
      if (index != waypoints?.length - 1) {
        const pointA = new google.maps.LatLng(item.lat, item.lng);
        const pointB = new google.maps.LatLng(waypoints[index + 1].lat, waypoints[index + 1].lng);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
        if (distance > 200) {
          listArray = [...listArray, waypoints.slice(prevIndex, index + 1)];
          prevIndex = index + 1;
        }
      }
    });

    if (listArray?.length == 0) {
      listArray = [waypoints];
    }

    let newWaypoints: any = [];

    if (listArray?.length > 0) {
      for (let [index, item] of listArray.entries()) {
        const polyline = new google.maps.Polyline({
          path: item,
          geodesic: true,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 4,
        });

        polyline.setMap(this.map);

        this.polylines = [...this.polylines, polyline];

        newWaypoints = [...newWaypoints, ...item];

        if (index !== listArray?.length - 1) {
          const allPointDirection: any = await this.drawDirections(item[item.length - 1], listArray[index + 1][0]);
          newWaypoints = [...newWaypoints, ...allPointDirection];
        }
      }
    }

    this.setMarker(newWaypoints);
    if (effect) {
      this.setEffectMove(newWaypoints);
    }
    const dataFormat = newWaypoints.map((element: any) => {
      return {
        ...element,
        latlng: true,
      };
    });
    this.optimizeMapZoomLevel(dataFormat);
  }

  setMarker(allPoints: any = []) {
    this.startMarker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      icon: {
        scaledSize: new google.maps.Size(60, 60),
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      },
      position: allPoints[0],
    });
    this.endMarker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      icon: {
        scaledSize: new google.maps.Size(60, 60),
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      },
      position: allPoints[allPoints?.length - 1],
    });
  }

  setEffectMove(allPoints: any = []) {
    let index = allPoints?.length - 1;
    this.markerMove = setInterval(() => {
      if (index == allPoints?.length - 1) {
        this.truck = new google.maps.Marker({
          map: this.map,
          draggable: false,
          icon: {
            anchor: new google.maps.Point(25, 25),
            scaledSize: new google.maps.Size(50, 50),
            url: 'assets/img/active_red.gif',
          },
          position: allPoints[0],
        });
      } else {
        this.truck.setPosition(allPoints[index]);
      }
      if (index == 0) {
        clearInterval(this.markerMove);
      } else {
        index--;
      }
    }, 80);
  }

  async drawDirections(startLocation: any, endLocation: any) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {strokeColor: '#807b7b', strokeWeight: 4, strokeOpacity: 0.8},
      preserveViewport: true,
    });
    directionsRenderer.setMap(this.map);

    this.directions = [...this.directions, directionsRenderer];

    const start = new google.maps.LatLng(startLocation.lat, startLocation.lng);
    const end = new google.maps.LatLng(endLocation.lat, endLocation.lng);

    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    return await new Promise((resolve) => {
      directionsService.route(request, function (result: any, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          const res =
            result?.routes?.length > 0
              ? result?.routes[0]?.overview_path?.map((element: any) => {
                  return {
                    lat: element.lat(),
                    lng: element.lng(),
                  };
                })
              : [];
          resolve(res);
        } else {
          resolve([]);
        }
      });
    });
  }

  updateLocation(data: any) {
    if(data[0]?.order?.orderBatchCode !== this.batchCode) {
      return
    }
    if (
      this.selected &&
      this.selected.state != this.STATE_BILL.DO_HANG &&
      this.selected.state != this.STATE_BILL.DEN_CANG &&
      this.selected.code == data[0]?.orderCode
    ) {
      this.markerLocationOnline.setPosition({
        lat: data[0]?.trackingDatas[0]?.latitude,
        lng: data[0]?.trackingDatas[0]?.longitude,
      });
      this.markerLocationOnline.setIcon({
        anchor: new google.maps.Point(30, 30),
        scaledSize: new google.maps.Size(60, 60),
        url: 'assets/img/active_red.gif',
      });
    } else {
      let check = false;
      this.vehicleLocation.forEach((item: any) => {
        if (item.code === data[0]?.orderCode) {
          check = true;
          item.marker.setPosition({
            lat: data[0]?.trackingDatas[0]?.latitude,
            lng: data[0]?.trackingDatas[0]?.longitude,
          });
          item.marker.setIcon({
            anchor: new google.maps.Point(30, 30),
            scaledSize: new google.maps.Size(60, 60),
            url: 'assets/img/active.gif',
          });
          item.time = data[0]?.trackingDatas[0]?.timeStamp;
        }
      });
      if (!check) {
        const position:any = {
          lat: data[0]?.trackingDatas[0]?.latitude,
          lng: data[0]?.trackingDatas[0]?.longitude,
        }
        const marker:any = new google.maps.Marker({
          map: this.map,
          draggable: false,
          icon: {
            anchor: new google.maps.Point(30, 30),
            scaledSize: new google.maps.Size(60, 60),
            url: 'assets/img/active.gif',
          },
          position: position,
        });
  
        const contentHtml = document.createElement('div');
        contentHtml.innerHTML = `<span style="color: black">${data[0]?.order?.vehicleCode}</span>`;
        const infoWindow = new google.maps.InfoWindow({
          content: contentHtml,
        });
  
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });

        this.vehicleLocation = [
          ...this.vehicleLocation,
          {
            marker: marker,
            time: data[0]?.trackingDatas[0]?.timeStamp || null,
            code: data[0]?.orderCode || null,
            position: position || null,
            name: data[0]?.order?.vehicleCode || null,
          }
        ]
      }
    }
  }

  loadInit() {
    this.GetAllVehicle();
    this.getTrackingStationLocation();
    this.getOrderTracking();
  }

  drawMarkerLocation(key: string) {
    if (this.showLocation[key]) {
      this.removeLocation(key);
    } else {
      if (key === 'drive_online') {
        this.getTrackingLocation();
      } else if (key === 'vjc') {
        this.markerVjc = new google.maps.Marker({
          map: this.map,
          draggable: false,
          icon: {
            anchor: new google.maps.Point(15, 15),
            scaledSize: new google.maps.Size(30, 30),
            url: 'assets/img/factory.png',
          },
          position: this.dataLocation[key],
        });
      } else {
        this.markerTienSa = new google.maps.Marker({
          map: this.map,
          draggable: false,
          icon: {
            anchor: new google.maps.Point(15, 15),
            scaledSize: new google.maps.Size(30, 30),
            url: 'assets/img/factory.png',
          },
          position: this.dataLocation[key],
        });
      }

      if (this.dataLocation[key] && key !== 'drive_online') {
        const newCenter = new google.maps.LatLng(this.dataLocation[key].lat, this.dataLocation[key].lng);
        this.map.setCenter(newCenter);
      }
    }
    this.showLocation = {
      ...this.showLocation,
      [key]: !this.showLocation[key],
    };
  }

  drawMarker(
    data: any,
    iconUrl: string,
    markerScale: google.maps.Size = new google.maps.Size(60, 60),
    anchor: google.maps.Point = new google.maps.Point(30, 30),
  ) {
    if (!data) return;
    data = data.filter((element: any) => {
      return element?.latitude && element?.longitude;
    });
    return data?.map((item: any) => {
      const position: any = {
        lat: item.latitude,
        lng: item.longitude,
      };

      const markerOption: any = {
        map: this.map,
        draggable: false,
        icon: {
          anchor: anchor,
          scaledSize: markerScale,
          url: iconUrl,
        },
        position: position,
      };

      const marker = new google.maps.Marker(markerOption);

      const contentHtml = document.createElement('div');
      contentHtml.innerHTML = `<span style="color: black">${item.name}</span>`;
      const infoWindow = new google.maps.InfoWindow({
        content: contentHtml,
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });

      return {
        marker: marker,
        time: item?.timeStamp || null,
        code: item?.code || null,
        position: position || null,
        name: item?.name || null,
      };
    });
  }

  optimizeMapZoomLevel(data: any = []) {
    const bounds = new google.maps.LatLngBounds();
    let location: any = [];
    if (this.startMarker && this.endMarker) {
      location = [...location, this.startMarker, this.endMarker];
    }
    if (this.markerVjc) {
      location = [...location, this.markerVjc];
    }
    if (this.markerTienSa) {
      location = [...location, this.markerTienSa];
    }
    if (this.markerLocationOnline) {
      location = [...location, this.markerLocationOnline];
    }
    [...location, ...this.vehicleLocation, ...data].forEach((element: any) => {
      if (element?.marker && bounds.extend(element?.marker?.getPosition())) {
        bounds.extend(element?.marker?.getPosition());
      } else if (element?.latlng) {
        bounds.extend(element);
      } else {
        try {
          bounds.extend(element.getPosition());
        } catch (e) {}
      }
    });
    this.map.fitBounds(bounds);
  }

  toggleMenuMap() {
    this.openMenu = !this.openMenu;
  }

  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  async initMap(): Promise<void> {
    const center = new google.maps.LatLng(18.6867831, 105.6768638);
    const mapOptions: google.maps.MapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: center,
      zoom: 5,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: this.mapStyles,
    };
    this.map = new google.maps.Map(this.mapRef?.nativeElement, mapOptions);
  }
}
