module Hkit.RSVP.Tracking {
  export class RiderStatusService {
    public static ID = "RiderStatusService";

    public lastPosition: Position;
    private updateID: any;

    private updater: RiderStatusService;
    private posOptions = {
      timeout: 20000,
      enableHighAccuracy: true
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
          this.lastPosition = position;
          window.setTimeout(() => { this.update() }, this.settingsService.positionUpdateInterval);
        },
        (error) => {
          console.warn("Error getting position: ", error);
          window.setTimeout(() => { this.update() }, this.settingsService.positionUpdateInterval);
        },
        this.posOptions);
      // TODO broadcast the update to firebase
    }
  }
}
