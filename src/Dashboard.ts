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
        }

        protected initialize(): void {
        }
  }
}
