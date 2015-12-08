'use strict';

(function () {
  // Announcements Controller Spec
  describe('Announcements Controller Tests', function () {
    // Initialize global variables
    var AnnouncementsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Announcements,
      mockAnnouncement;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Announcements_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Announcements = _Announcements_;

      // create mock announcement
      mockAnnouncement = new Announcements({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'Testing is fun!',
        username: 'test_user',
        content: 'Wow, these tests sure are handy',
        link: 'google.com',
        picture: 'samplepicture.com'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Announcements controller.
      AnnouncementsController = $controller('AnnouncementsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one announcement object fetched from XHR', inject(function (Announcements) {
      // Create a sample announcements array that includes the new announcement
      var sampleAnnouncements = [mockAnnouncement];

      // Set GET response
      $httpBackend.expectGET('api/announcements').respond(sampleAnnouncements);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.announcements).toEqualData(sampleAnnouncements);
    }));

    it('$scope.findOne() should create an array with one announcement object fetched from XHR using a announcementId URL parameter', inject(function (Announcements) {
      // Set the URL parameter
      $stateParams.announcementId = mockAnnouncement._id;

      // Set GET response
      $httpBackend.expectGET(/api\/announcements\/([0-9a-fA-F]{24})$/).respond(mockAnnouncement);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.announcement).toEqualData(mockAnnouncement);
    }));

    describe('$scope.create()', function () {
      var sampleAnnouncementPostData;

      beforeEach(function () {
        // Create a sample announcement object
        sampleAnnouncementPostData = new Announcements({
          title: 'Testing is fun!',
          username: 'test_user',
          content: 'Wow, these tests sure are handy',
          link: 'google.com',
          picture: 'samplepicture.com'
        });

        // Fixture mock form input values
        scope.title = 'Testing is fun!';
        scope.username = 'test_user';
        scope.content = 'Wow, these tests sure are handy';
        scope.link = 'google.com';
        scope.picture = 'samplepicture.com';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Announcements) {
        // Set POST response
        $httpBackend.expectPOST('api/announcements', sampleAnnouncementPostData).respond(mockAnnouncement);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are not changed
        expect(scope.title).toEqual('Testing is fun!');
        expect(scope.username).toEqual('test_user');
        expect(scope.content).toEqual('Wow, these tests sure are handy');
        expect(scope.link).toEqual('google.com');
        expect(scope.picture).toEqual('samplepicture.com');

        // Test URL redirection after the announcement was created
        expect($location.path.calls.mostRecent().args[0]).toBe('');
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/announcements', sampleAnnouncementPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock announcement in scope
        scope.announcement = mockAnnouncement;
      });

      it('should update a valid announcement', inject(function (Announcements) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/announcements\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true, mockAnnouncement);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/');
      }));

      it('should set scope.error to error response message', inject(function (Announcements) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/announcements\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true, mockAnnouncement);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(announcement)', function () {
      beforeEach(function () {
        // Create new announcements array and include the announcement
        scope.announcements = [mockAnnouncement, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/announcements\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockAnnouncement);
      });

      it('should send a DELETE request with a valid announcementId and remove the announcement from the scope', inject(function (Announcements) {
        expect(scope.announcements.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.announcement = mockAnnouncement;

        $httpBackend.expectDELETE(/api\/announcements\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to announcements', function () {
        expect($location.path).toHaveBeenCalledWith('announcements');
      });
    });
  });
}());
