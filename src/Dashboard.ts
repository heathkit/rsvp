module Hkit.RSVP.Dashboard {
  export class DashboardController {
    public static ID = "DashboardController";

    public static get $inject(): string[] {
      return [
        "$scope",
        "$location",
        "$http",
        Settings.SettingsService.ID,
        Tracking.RiderStatusService.ID
      ];
    }

    constructor(
      $scope: ng.IScope,
      private $location: ng.ILocationService,
      private $http: ng.IHttpService,
      private settings: Settings.SettingsService,
      private riderStatus: Tracking.RiderStatusService) {

      // Test fixture
      var test_statuses = [
        {  
          rider: 'Sharene',
            position: {lat: 1, long: 1},
            speedMPH: 10,
            timestampMS: 1439539703750
          },
        {
          rider: 'Stephen',
            position: {lat: 1, long: 1},
            speedMPH: 12,
            timestampMS: 1439939903750
          }
      ];
      this.statuses = {};
      this.myStatus = new StatusDisplay();
      this.updateCounter = 0;
      $scope['dashboard'] = this;

      this.updateDisplay(test_statuses);
      riderStatus.onUpdate((statuses) => {
        this.updateDisplay(statuses);
      });
    }

    public statuses: { [key: string]:StatusDisplay } = {};
    public myStatus: StatusDisplay = new StatusDisplay();
    public updateCounter: number;

    public updateDisplay(riderStatuses: RiderStatus[]) {
      this.updateCounter++;
      riderStatuses.forEach((riderStatus) => {
        var rider = riderStatus.rider;
        if (riderStatus.rider === this.settings.myRider) {
          this.myStatus.updateStatus(riderStatus);
          console.log('My new status:' + JSON.stringify(this.myStatus));
        } else {
          if (!this.statuses[riderStatus.rider]) {
            this.statuses[riderStatus.rider] = new StatusDisplay();
          }
          this.statuses[riderStatus.rider].updateStatus(riderStatus);
        }
      });
      console.log(this.statuses);
    }

    public messages = [ ];
  }

  export class StatusDisplay {
    public age: string;
    public distance: string;
    public speed: string;

    private status: RiderStatus = undefined;

    constructor() {
    }

    public updateStatus(status: RiderStatus) {
      this.status = status;
      this.update();
    }
    
    public update() {
      if (!this.status === undefined) {
        return;
      }
      this.age = moment(this.status.timestampMS).fromNow();
      this.distance = `150`;
      if (this.status.speedMPH === null) {
        this.speed = "unk";
      } else {
        this.speed = `${this.status.speedMPH.toPrecision(2)} m/h`;
      }
    }
  }

  export interface Message {
    from: string;
    message: string;
  }

  export interface Coords {
    lat: number;
    long: number;
  }

  export interface RiderStatus {
    rider: string;
    position: Coords;
    speedMPH: number;
    timestampMS: number;
    distress?: string;
    lastRSSI?: number;
  }
}
