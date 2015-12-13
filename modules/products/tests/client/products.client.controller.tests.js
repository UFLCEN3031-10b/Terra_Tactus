'use strict';

(function () {
  // Articles Controller Spec
  describe('Products Controller Tests', function () {
    // Initialize global variables
    var ProductsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      $window,
      Authentication,
      Products,
      mockProduct;

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
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$window_,_$stateParams_, _$httpBackend_, _Authentication_, _Products_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $window = _$window_;
      Authentication = _Authentication_;
      Products = _Products_;

      // create mock product
      mockProduct = new Products({
        _id: '525a8422f6d0f87f0e407a33',
        proTitle: 'An Article about MEAN',
        longDes: 'long description',
        shortDes: 'description',
        indvPrice: '1.00',
        eduPrice: '2.00',
        wholePrice: '3.00',
        curriculum: [],
        features: []
      });

      // Mock logged in admin
      Authentication.user = {
        roles: ['admin']
      };

      // Initialize the Products controller.
      ProductsController = $controller('ProductsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one product object fetched from XHR', inject(function (Products) {
      // Create a sample products array that includes the new product
      var sampleProducts = [mockProduct];

      // Set GET response
      $httpBackend.expectGET('api/products').respond(sampleProducts);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.products).toEqualData(sampleProducts);
    }));

    it('$scope.findOne() should create an array with one product object fetched from XHR using a productId URL parameter', inject(function (Products) {
      // Set the URL parameter
      $stateParams.productId = mockProduct._id;

      // Set GET response
      $httpBackend.expectGET(/api\/products\/([0-9a-fA-F]{24})$/).respond(mockProduct);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.product).toEqualData(mockProduct);
    }));

    describe('$scope.create()', function () {
      var sampleProductPostData;

      beforeEach(function () {
        // Create a sample product object
        sampleProductPostData = new Products({
          proTitle: 'A Product about MEAN',
          longDes: 'long description',
          shortDes: 'description',
          indvPrice: '1.00',
          eduPrice: '2.00',
          wholePrice: '3.00',
          curriculum: [],
          features: []
        });

        // Fixture mock form input values
        scope.proTitle = 'A Product about MEAN';
        scope.longDes = 'long description';
        scope.shortDes = 'description';
        scope.indvPrice = '1.00';
        scope.eduPrice = '2.00';
        scope.wholePrice = '3.00';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to general products URL', inject(function (Products) {
        // Set POST response
        $httpBackend.expectPOST('api/products', sampleProductPostData).respond(mockProduct);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are not reset
        expect(scope.proTitle).toEqual('A Product about MEAN');
        expect(scope.longDes).toEqual('long description');
        expect(scope.shortDes).toEqual('description');
        expect(scope.indvPrice).toEqual('1.00');
        expect(scope.eduPrice).toEqual('2.00');
        expect(scope.wholePrice).toEqual('3.00');


        // Test URL redirection after the product was created
        expect($location.path.calls.mostRecent().args[0]).toBe('products');
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/products', sampleProductPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock product in scope
        scope.product = mockProduct;
      });

      it('should update a valid product', inject(function (Products) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/products\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.updateProd(mockProduct,true);
        $httpBackend.flush();

        // Test URL location to general products page
        expect($location.path()).toBe('/products');
      }));

      it('should set scope.error to error response message', inject(function (Products) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/products\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.updateProd(mockProduct,true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.delete(productID)', function () {
      beforeEach(function () {
        //whenever we are deleting we get a confirm, so we must simulate accepting
        spyOn($window,'confirm').and.callFake(function () {
          return true;
          });

        // Create new articles array and include the article
        scope.products = [mockProduct, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/products\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality

        scope.delete(mockProduct);

      });

      it('should send a DELETE request with a valid productId and remove the product from the scope', inject(function (Products) {
        expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this product?");
        expect(scope.products.length).toBe(1);
      }));
    });

    describe('scope.delete()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        //whenever we are deleting we get a confirm, so we must simulate accepting
        spyOn($window,'confirm').and.callFake(function () {
          return true;
          });
        scope.product = mockProduct;

        $httpBackend.expectDELETE(/api\/products\/([0-9a-fA-F]{24})$/).respond(204);

        scope.delete();
        $httpBackend.flush();
      });

      it('should redirect to products', function () {
        expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this product?");
        expect($location.path).toHaveBeenCalledWith('products');
      });
    });
  });
}());
