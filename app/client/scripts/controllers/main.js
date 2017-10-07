'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
	.service('trackAPIService', ['$http', '$q', function($http, $q){

		return {
		 
		 	// Get request method to retrieve all track data
			getAllTracks: function()
			{
			    return $http({
			    	url: 'http://localhost:3000/api/tracks',
			    	method: 'GET'
				}).then(function successCallback(response) {
					    return response.data;
				}, function errorCallback(response) {
					    console.error('Error while getting Tracks');
			            return $q.reject(response);
				});
			},
			// Post Request method exposing API method for adding new tracks
			createTracks: function(tracks){
			    return $http.post('http://localhost:3000/api/tracks/new', tracks)
			    .then(function(response){
			                return response.data;
			            }, 
			            function(errorResponse){
			                console.error('Error while creating tracks');
			                return $q.reject(errorResponse);
			            }
			    );
			}
		};

	}])
	.controller('MainCtrl', ['$scope', 'trackAPIService', function ($scope, trackAPIService) {
		var markers = [];
		// Create a single infowindow for all markers to use
		var infowindow = new google.maps.InfoWindow;
		// Removes the markers with the specified mmsid from the map, but keeps them in the array.
		function clearMarkersByMmsid(mmsid) {
			for (var i = 0; i < markers.length; i++) {
				if(markers[i].title === mmsid){
					markers[i].setMap(null);
				}
			}
		}

		// Get all the track data from API
		trackAPIService.getAllTracks()
		.then(function(response){ 
			$scope.tracks = response;
			initMap($scope);
		}, function(err){
			alert("Error retreiving track data!");
		});

		// Initialize the map
		function initMap($scope){
			console.log($scope.tracks);
			// Get most recently added track to set map location
			var mostRecent = $scope.tracks[$scope.tracks.length-1];
			console.log(mostRecent);
			var latitude = parseFloat(mostRecent["latitude"]);
			var longitude = parseFloat(mostRecent["longitude"]);
			// Set map start location to most recently added marker
			var location = new google.maps.LatLng(latitude, longitude);

			var mapCanvas = document.getElementById('map');
			var mapOptions = {
			    center: location,
			    zoom: 5,
			    panControl: true,
			    mapTypeId: google.maps.MapTypeId.TERRAIN
			}
			var map = new google.maps.Map(mapCanvas, mapOptions);
			addMarkers($scope, map);
		}

		// Add Markers representing each track
		function addMarkers($scope, map)
		{
			var uniqueId = 0;
			var uniqueTitle = "";
			var image = {
			  url: '../../images/ship.svg',
			  size: new google.maps.Size(500, 500),
			  scaledSize: new google.maps.Size(36, 36),
			  origin: new google.maps.Point(0, 0),
			  anchor: new google.maps.Point(0, 0)
			};
			var missingInfo = 0;
			var successCount = 0;
			for (var i = $scope.tracks.length - 1; i >= 0; i--) 
			{
				var name = $scope.tracks[i]["name"];
				var latitude = $scope.tracks[i]["latitude"];
				var longitude = $scope.tracks[i]["longitude"];
				var callsign = $scope.tracks[i]["callsign"];
				var mmsid = $scope.tracks[i]["mmsid"];
				var heading = $scope.tracks[i]["heading"];
				var course = $scope.tracks[i]["course"];
				var speed = $scope.tracks[i]["speed"];
				if(name === '' || name == null){
					console.log("Missing name value for track with mmsid "
					 + mmsid + "\nSkipping this track.");
					missingInfo += 1;
					continue;
				}
				if(mmsid === '' || mmsid == null){
					console.log("Missing mmsid value for track with name "
					 + name + "\nSkipping this track.");
					missingInfo += 1;
					continue;
				}
				if(latitude === '' || latitude == null){
					console.log("Missing latitude value for track with mmsid "
					 + mmsid + "\nSkipping this track.");
					missingInfo += 1;
					continue;
				}
				if(longitude === '' || longitude == null){
					console.log("Missing longitude value for track with mmsid "
					 + mmsid + "\nSkipping this track.");
					missingInfo += 1;
					continue;
				}
				
				latitude = parseFloat(latitude);
				longitude = parseFloat(longitude);
				speed += " kn";
				heading += " degrees";
				course += " degrees";
				uniqueId += 1;
				var uniqueMmsid = mmsid + "-" + uniqueId;

				// Hide other track icons associated with this mmsid
				clearMarkersByMmsid(mmsid);
				var marker = new google.maps.Marker({
				                position: new google.maps.LatLng(latitude, longitude),
				                map: map,
				                icon: image,
				                title: name,
				                name: name,
				                latitude: latitude,
				                longitude: longitude,
				                mmsid: mmsid,
				                callsign: callsign,
				                speed: speed,
				                course: course,
				                heading: heading,
				                uniqueMmsid: uniqueMmsid,
				                uniqueId: uniqueId
				             });

				// Add click event to marker to display track properties in infowindow
				marker.addListener('click', function (event) {

					// Marker window overlay content
					var contentString = 
						'<div class="info-window" id="' + this.uniqueMmsid + '">\n' +
						'<h3>' + this.name + '</h3>\n' +
						'<div class="info-content">\n' +
						'<table class="table">\n' +
						'<tr>\n' +
						'<th>Name' +
						'</th>\n' +
						'<th>MMSID' +
						'</th>\n' +
						'<th>Callsign' +
						'</th>\n' +
						'<th>Latitude' +
						'</th>\n' +
						'<th>Longitude' +
						'</th>\n' +
						'<th>Speed' +
						'</th>\n' +
						'<th>Heading' +
						'</th>\n' +
						'<th>Course' +
						'</th>\n' +
						'</tr>\n' +
						'<tr>\n' +
						'<td>' + this.name +
						'</td>\n' +
						'<td>' + this.mmsid +
						'</td>\n' +
						'<td>' + this.callsign +
						'</td>\n' +
						'<td>' + this.latitude +
						'</td>\n' +
						'<td>' + this.longitude +
						'</td>\n' +
						'<td>' + this.speed +
						'</td>\n' +
						'<td>' + this.heading +
						'</td>\n' +
						'<td>' + this.course +
						'</td>\n' +
						'</tr>\n' +
						'</table>\n' +
						'</div>\n' +
						'</div>';
					console.log(this);
					infowindow.setContent(contentString);
					infowindow.open(map, this);
				});
				
				// Push new marker onto markers array
				markers.push(marker);
				successCount += 1;
			}

			if(missingInfo > 0){
				console.log("Missing required information in " 
				+ missingInfo + " tracks.\nThese tracks were skipped.");	
			}

			if(successCount > 0){
				console.log("Imported " + successCount + " tracks successfully.");	
			} else {
				console.log("There were no tracks successfully imported.\nPlease send \
					a POST request containing JSON data of track data objects to \
					http://localhost:3000/api/tracks/new\nEach object in the array \
					should contain the following properties:\nname, latitude, longitude, \
					mmsid, callsign, speed, heading, course.");
			}
		}
	}]);
