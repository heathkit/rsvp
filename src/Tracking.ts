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

    /**
     * Register a callback to receive status updates.
     * TODO - maybe return a handle or cleanup function.
     */
    onUpdate(callback: StatusCallback): void {
      this.updateCallback = callback;
    }

    private updateCallback;

    update(): void {
      console.log("Updating position");
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position: ", position);
          this.lastPosition = position;
          // TODO convert from meters/s
          this.updateCallback([{
              rider: 'Mike',
              position: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
              speedMPH: position.coords.speed,
              timestampMS: position.timestamp
          }]);

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

  export interface StatusCallback { (statuses: Dashboard.RiderStatus[]): void }
}
