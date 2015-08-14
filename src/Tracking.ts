module Hkit.RSVP.Tracking {
  export class RiderStatusService {
    public static ID = "RiderStatusService";

    public lastPosition: Position;
    private updateID: any;

    private updater: RiderStatusService;
    private posOptions = {
      timeout: 75000,
      enableHighAccuracy: true,
      maximumAge: 75000
    };

    public static get $inject(): string[] {
      return [
        Settings.SettingsService.ID
      ];
    }

    constructor(private settingsService: Settings.SettingsService) {
    }

    startUpdating(): void {
      window.clearTimeout(this.updateID);
      this.updateID = this.update();
    }

    update(): void {
      console.log("Updating position");
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position: ", position);
          this.lastPosition = position;
          this.updateID = window.setTimeout(() => { this.update() }, this.settingsService.positionUpdateIntervalMS);
        },
        (error) => {
          console.warn("Error getting position: ", error);
          this.updateID = window.setTimeout(() => { this.update() }, this.settingsService.positionUpdateIntervalMS);
        },
        this.posOptions);
      // TODO broadcast the update to firebase
    }
  }
}
