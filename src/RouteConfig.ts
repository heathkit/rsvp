module Hkit.RSVP {
  export class RouteConfig {

    public static setupRoutes($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
      $urlRouterProvider.otherwise("/");

      $stateProvider.state("dashboard", {
        url: "/dashboard",
        views: {
          dashboard: {
            templateUrl: "templates/dashboard.html",
            controller: "DashboardController"
          }
        }
      });

      $stateProvider.state("settings", {
        url: "/settings",
        views: {
          settings: {
            templateUrl: "templates/settings.html",
            controller: "SettingsController as settings"
          }
        }
      });

    }
  }
}
