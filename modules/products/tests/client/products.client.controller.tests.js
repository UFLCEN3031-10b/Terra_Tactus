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
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Products_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
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

    /*describe('$scope.remove(article)', function () {
      beforeEach(function () {
        // Create new articles array and include the article
        scope.articles = [mockArticle, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/articles\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockArticle);
      });

      it('should send a DELETE request with a valid articleId and remove the article from the scope', inject(function (Articles) {
        expect(scope.articles.length).toBe(1);
      }));
    });*/

    /*describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.article = mockArticle;

        $httpBackend.expectDELETE(/api\/articles\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to articles', function () {
        expect($location.path).toHaveBeenCalledWith('articles');
      });
    });*/
  });
}());
