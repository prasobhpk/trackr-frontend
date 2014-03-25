define(['angular', 'modules/trackr/employee/controllers'], function(angular, controllers) {
    'use strict';
    var employee = angular.module('trackr.employee', []);

    employee.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('trackr.employee', {
                url: '/employee',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/employee.tpl.html'
                    }
                }
            })
            .state('trackr.employee.self', {
                url: '/self',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/self.tpl.html',
                        controller: 'trackr.employee.controllers.self'
                    }
                }
            })
            .state('trackr.employee.timesheet', {
                url: '/timesheet',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/timesheet/timesheet.tpl.html',
                        controller: 'trackr.employee.controllers.timesheet'
                    }
                }
            })
            .state('trackr.employee.timesheet.overview', {
                url: '/overview',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/timesheet/timesheetOverview.tpl.html',
                        controller: 'trackr.employee.controllers.timesheet-overview'
                    }
                }
            })
            .state('trackr.employee.vacation', {
                url: '/vacation',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/employee/vacation/list.tpl.html',
                        controller: 'trackr.employee.controllers.vacation-list'
                    },
                    'new@trackr.employee.vacation': {
                        templateUrl: 'src/modules/trackr/employee/vacation/new.tpl.html',
                        controller: 'trackr.employee.controllers.vacation-new'
                    }
                }
            });
    }]);

    controllers.init(employee);
    return employee;
});