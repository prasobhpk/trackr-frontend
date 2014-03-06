define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', '$http', function($scope, Restangular, $filter, $http) {
        $scope.openDate = function($event, whichDate) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope[whichDate] = true;
        };

        $scope.loadWorktimes = function() {
            if($scope.project) {
                //Load this via http as it does not return standard items (custom DTOs without links).
                $http.get('/api/workTimes/findEmployeeMappingByProjectAndDateBetween',
                    {params: {project: $scope.project.id,
                        start: $filter('date')($scope.start, 'yyyy-MM-dd'),
                        end: $filter('date')($scope.end, 'yyyy-MM-dd')}})
                    .then(function(response) {
                        $scope.workTimes = response.data;
                    });
            }
        };

        $scope.getProjectLabel = function(project) {
            if(project) {
                return project.name + ' (' + project.identifier + ')';
            } else {
                return undefined;
            }
        };

        $scope.filterProjectsByNameAndIdentifier = function(viewValue) {
            return $scope.projects.filter(function(project) {
                return project.name.indexOf(viewValue) > -1 || project.identifier.indexOf(viewValue) > -1;
            });
        };

        var today = new Date();
        today.setDate(1);
        $scope.start = today;
        $scope.end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); //last day of current month

        //TODO: why?
        $scope.$watch('start', $scope.loadWorktimes);
        $scope.$watch('end', $scope.loadWorktimes);


        Restangular.all('projects').getList({sort: 'identifier,asc'}).then(function(projects) {
            $scope.projects = projects;
        });
    }];
});