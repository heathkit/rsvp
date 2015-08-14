module Hkit.RSVP.Dashboard {
  export class DashboardController {
    public static ID = "DashboardController";

    public static get $inject(): string[] {
      return [
        "$scope",
        "$location",
        "$http",
      ];
    }

    constructor(
      $scope: ng.IScope,
      private $location: ng.ILocationService,
      private $http: ng.IHttpService) {
      console.log("Constructed");

      // Test fixture
      var statuses = [
        {  
          rider: 'Sharene',
            position: {lat: 1, long: 1},
            speedMPH: 12,
            timestampMS: 1439539703750
          },
        {
          rider: 'Stephen',
            position: {lat: 1, long: 1},
            speedMPH: 12,
            timestampMS: 1439539703750
          }
      ];
      this.updateDisplay(statuses);
    }

    public statuses: { [key: string]:StatusDisplay };

    public updateDisplay(riderStatuses: RiderStatus[]) {
      for(var status in riderStatuses) { 
      }
    }

    public messages = [
    ];
  }

  export class StatusDisplay {
    public rider: string;
    private status: RiderStatus;

    constructor(status: RiderStatus) {
      this.rider = status.rider;
      this.updateStatus(status);
    }

    public updateStatus(status: RiderStatus) {
      // Check for rider match here? 
      this.status = status;
    }

    public get age(): string {
      return moment(this.status.timestampMS).fromNow();
    }

    public get distance(): number {
      // Need to get current location
      return 100;
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
