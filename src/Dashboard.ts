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
      $scope['statuses'] = this.statuses;
    }

    public statuses = [
      {
        rider: 'Sharene',
        position: { lat: 1, long: 1 },
        speedMPH: 12,
        timestampMS: 1439539703750
      },
      {
        rider: 'Stephen',
        position: { lat: 1, long: 1 },
        speedMPH: 12,
        timestampMS: 1439539703750
      }
    ];

    public messages = [
    ];
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
