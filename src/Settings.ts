module Hkit.RSVP.Settings {

  export class SettingsController {
    public static ID = "SettingsController";

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
    }

    protected initialize(): void {

    }

  }

  export class SettingsService {
    public static ID = "SettingsService";

    public positionUpdateInterval = 5000;

    public static get $inject(): string[] {
      return [
      ];
    }

    constructor() { }
  }
}
