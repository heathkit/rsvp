module Hkit.RSVP.Application {
    var ngModule: ng.IModule;

    /**
     * Used to hold references to several of the Angular-injected services for use within
     * this local scope. These references are populated in angular_initialize().
     */
    var services: {
        $rootScope: ng.IRootScopeService,
        $location: ng.ILocationService,
        $ionicHistory: any,
    };

    /**
     * This is the main entry point for the application. It is used to setup Angular and
     * configure its controllers, services, etc.
     * 
     * It is invoked via the Main.js script included from the index.html page.
     */
    export function main(): void {
        // Set the default error handler for all uncaught exceptions.
        window.onerror = window_onerror;

        ngModule = angular.module("Hkit.RSVP.Application", ["ui.router", "ionic", "firebase"]);

        ngModule.controller(Dashboard.DashboardController.ID, Dashboard.DashboardController);
        ngModule.controller(Settings.SettingsController.ID, Settings.SettingsController);

        ngModule.run(angular_initialize);
        ngModule.config(angular_configure);
    }

    /**
     * The main initialize/run function for Angular; fired once the AngularJs framework is done loading.
     * 
     * The parameters to this method are automatically determined by Angular's dependency injection based
     * on the name of each parameter.
     */
    function angular_initialize(
        $rootScope: ng.IScope,
        $location: ng.ILocationService,
        $ionicHistory: any,
        $ionicPlatform: any
        ): void {

        // Save off references to the modules for use within this application module.
        services = {
            $rootScope: $rootScope,
            $location: $location,
            $ionicHistory: $ionicHistory
        };

        // Once AngularJs has loaded we'll wait for the Ionic platform's ready event.
        // This event will be fired once the device ready event fires via Cordova.
        $ionicPlatform.ready(function () {
            ionicPlatform_ready();
        });
    };

    /**
     * Fired once the Ionic framework determines that the device is ready.
     */
    function ionicPlatform_ready(): void {

        // Subscribe to device events.
        document.addEventListener("pause", device_pause);
        document.addEventListener("resume", device_resume);
        document.addEventListener("menubutton", device_menuButton);

        // Subscribe to Angular events.
        services.$rootScope.$on("$locationChangeStart", angular_locationChangeStart);

        // Now that the platform is ready, we'll delegate to the resume event.
        // We do this so the same code that fires on resume also fires when the
        // application is started for the first time.
        device_resume();
    }

    /**
     * Function that is used to configure AngularJs.
     * 
     * The parameters to this method are automatically determined by Angular's
     * dependency injection based on the name of each parameter.
     */
    function angular_configure(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $provide: ng.auto.IProvideService,
        $httpProvider: ng.IHttpProvider,
        $compileProvider: ng.ICompileProvider
        ): void {

        // Intercept the default Angular exception handler.
        $provide.decorator("$exceptionHandler", function ($delegate: ng.IExceptionHandlerService) {
            return function (exception, cause) {
                // Delegate to our custom handler.
                angular_exceptionHandler(exception, cause);

                // Delegate to the default/base Angular behavior.
                $delegate(exception, cause);
            };
        });

        // Whitelist several URI schemes to prevent Angular from marking them as un-safe.
        // http://stackoverflow.com/questions/19590818/angularjs-and-windows-8-route-error
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0|chrome-extension):/);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);

        // Setup all of the client side routes and their controllers and views.
        RouteConfig.setupRoutes($stateProvider, $urlRouterProvider);
    };


    /**
     * Fired when the OS decides to minimize or pause the application. This usually
     * occurs when the user presses the device's home button or switches applications.
     */
    function device_pause(): void {
      console.log("Device pause");
    }

    /**
     * Fired when the OS restores an application to the foreground. This usually occurs
     * when the user launches an app that is already open or uses the OS task manager
     * to switch back to the application.
     */
    function device_resume(): void {
      console.log("Device resume");
    }

    /**
     * Fired when the menu hard (or soft) key is pressed on the device (eg Android menu key).
     * This isn't used for iOS devices because they do not have a menu button key.
     */
    function device_menuButton(): void {
      console.log("Menu pressed");
    }

    /**
     * Fired when Angular's route/location (eg URL hash) is changing.
     */
    function angular_locationChangeStart(event: ng.IAngularEvent, newRoute: string, oldRoute: string): void {
        console.log("Location change, old Route: " + oldRoute);
        console.log("Location change, new Route: " + newRoute);
    };

    /**
     * Fired when an unhandled JavaScript exception occurs outside of Angular.
     */
    function window_onerror(message: any, uri: string, lineNumber: number, columnNumber?: number): void {

        console.error("Unhandled JS Exception", message, uri, lineNumber, columnNumber);
    }

    /**
     * Fired when an exception occurs within Angular.
     * 
     * This includes uncaught exceptions in ng-click methods for example.
     */
    function angular_exceptionHandler(exception: Error, cause: string): void {
        var message = exception.message;

        if (!cause) {
            cause = "[Unknown]";
        }

        console.error("AngularJS Exception", exception, cause);

    }
}
