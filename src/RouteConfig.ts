module Hkit.RSVP {
  export class RouteConfig {

    public static setupRoutes($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
      $urlRouterProvider.otherwise("/app");

      $stateProvider.state("dashboard", {
        url: "/dashboard",
        views: {
          "root-view": {
            templateUrl: "templates/Dashboard.html",
            controller: Dashboard.DashboardController.ID,
            controllerAs: "dashboard"
          }
        }
      });

      $stateProvider.state("settings", {
        url: "/settings",
        views: {
          "root-view": {
            templateUrl: "templates/Settings.html",
            controller: Settings.SettingsController.ID,
            controllerAs: "settings"
          }
        }
      });

    }
  }
}
