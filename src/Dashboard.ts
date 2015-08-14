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
            speedMPH: 12,
            timestampMS: 1439539703750
          },
        {
          rider: 'Stephen',
            position: {lat: 1, long: 1},
            speedMPH: 12,
            timestampMS: 1439939903750
          }
      ];
      //this.updateDisplay(test_statuses);
      riderStatus.onUpdate((statuses) => this.updateDisplay(statuses))
    }

    public statuses: { [key: string]:StatusDisplay } = {};

    public updateDisplay(riderStatuses: RiderStatus[]) {
      console.log("Updating statuses");
      riderStatuses.forEach((status) => {
        var rider = status.rider;
        console.log(status);
        if (this.statuses[rider] == undefined) {
          this.statuses[rider] = new StatusDisplay(status);
        } else {
          this.statuses[rider].updateStatus(status);
        }
      });
      console.log(this.statuses);
    }

    public messages = [ ];
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
