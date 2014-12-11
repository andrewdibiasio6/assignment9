/*
Andrew DiBiasio andrew_dibiasio@student.uml.edu 
I am a Computer Science Major at the University of Massachusetts Lowell and I adapted this file as part of an
assignment for my course 91.461 GUI Programming I. This is my main.js page. It helps populate my table using 
angular js.
Created: December 10th, 2014

Original Author: Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 
*/

"use strict"; // to ensure that all variables are declared before use

// the number of the last column sorted, initialized to the Account Holder column
var lastSortColumnNo = 2;
// a flag indicating whether the last sort was ascending (true) or descending (false)
var lastSortDescending = false;

// set up AngularJS module, note that name must be the same as that in the
//    ng-app attribute of the html tag above
var myApp = angular.module('DataApp', []);

// set a constant to the JSON file path
myApp.constant("jsonUrl", "mockBankData.json");

// add business logic to the app controller
myApp.controller('DataInfo',
  /** Read JSON data using Ajax - adapted from Pro AngularJS, p. 149.
   *  @param $scope  the standard AngularJS model scope
   *  @param $http   the built-in AngularJS http object containing the get function
   *  @param jsonURL the app constant containing the JSON file path (defined above)
   */
  function ($scope, $http, jsonUrl) {
    $scope.jsonData = {}; // initialize an object in the model's scope
    $http.get(jsonUrl) // perform the Ajax call
      .success(function (data) { // execute this function if the Ajax succeeds
        $scope.jsonData.data = data; // set the model's jsonData.data property to the
      }) //    data returned by the Ajax call
      .error(function (error) { // execute this function if the Ajax fails
        $scope.jsonData.error = error; // set the model's jsonData.error property to the
      }); //    error returned by the Ajax call

    // the following data is not used in the current version of this app
    $scope.date = new Date(); // get the current date and time
    // see http://stackoverflow.com/questions/22962468/angularjs-display-current-date

    // set the initial sort field (student name) and sort order (ascending)
    $scope.sortField = "name";
    $scope.sortDescending = false;

    /**
     *  Sort column clicked in either ascending or descending order.
     *  Note that this could also be accomplished using the built-in AngularJS orderBy
     *    filter and manipulating the sort field and reverse parameters.
     *  Also note that this code could also have been incorporated into the ng-click
     *    directives on the table's th elements, but doing it here gave me more central
     *    control, and I think that this function makes what's going on clearer and
     *    therefore easier to maintain.
     *  @param colNo the number of the column header clicked
     */
    $scope.sortColumn = function (colNo) {
      $scope.sortDescending = lastSortColumnNo === colNo && !lastSortDescending;
      // true to sort in descending order, false to sort in ascending order
      // will be false if sorting a new column or last sort was descending
      if (colNo === 2) {
        // this is the Student Name column
        $scope.sortField = "fullName";
        // the following statement was used in a previous version of this app
        // before adding the orderBy filter to the ng-repeat directive
        //    $scope.jsonData.data.RECORDS.sort( sort_by( "student_name", boolSortAscending ) ) ;

      } else if (colNo === 3) {
        $scope.sortField = "creditCardType";

      } else if (colNo === 4) {
        $scope.sortField = "creditCardNum";

      } else if (colNo === 5) {
        $scope.sortField = "funds";

      } else if (colNo === 6) {
        $scope.sortField = "password";

      }

      lastSortDescending = $scope.sortDescending;
      lastSortColumnNo = colNo;
    }
  }
);

/**
 * Custom filter to slice link for only domain name.
 * This code is taken from: http://stackoverflow.com/questions/14594965/how-to-shorten-url-to-show-domain-only-with-angular-js-filter
 */
//myApp.filter('domain', function () {
//  return function (input) {
//    var matches,
//      output = '',
//      /**
//       * This code is taken from http://stackoverflow.com/questions/569137/how-to-get-domain-name-from-url
//       */

//    urls = /^(?:www\.)?(.*?)\.(?:com|net|jp|edu|org|gov|de|cn|cz|hk|me|ru|ch|uk|gl|br|fr|fm|au\.uk|co\.in)$/;
//    matches = urls.exec(input);
//    if (matches != null) output = matches[1];

//    return output;
//  };
//});