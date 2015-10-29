'use strict';

angular.module('core').controller('cltProductsController', function ($scope) {

    $scope.cltproducts = [{
        title: 'Exploring The Swamp',
        image: 'http://1.bp.blogspot.com/-QuICtWHygN0/UoAlMMR9UNI/AAAAAAABYfc/rfcld52y97M/s1600/Gaineville+Trip+136.JPG',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    }, {
        title: 'Exploring Gator Football',
        image: 'http://www.gatortailgating.com/files/imagecache/gt7_full_580/mike/2012/03/gators-usf.jpg',
        text: 'Solum liber postulant duo ex. Qui id eleifend imperdiet deterruisset, enim reque albucius duo in, ei nostro conceptam eam. Nec te partiendo tincidunt, ne eum cibo nobis oporteat. Ne eos nisl graeco, ex possim periculis nec. Laudem salutatus te mea. Elitr graeci ei nam, vidisse erroribus cum ex, id atqui mundi percipit est.'
    },{
        title: 'Taking a look at Century Tower',
        image: 'http://cdn.webservices.ufhealth.org/wp-content/blogs.dir/350/files/2012/05/UFCampus.jpg',
        text: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
    },{
        title: 'Its Great to be a Florida Gator!',
        image: 'http://thumb.usatodaysportsimages.com/image/thumb/650-510nw/8805035.jpg',
        text: 'Florida, our Alma Mater, thy glorious name we praise. All thy loyal sons and daughters, a joyous song shall raise. Where palm and pine are blowing, where southern seas are flowing, Shine forth thy noble gothic walls, thy lovely vine clad halls.Neath the orange and blue victorious,our love shall never fail. Theres no other name so glorious,all hail, Florida, hail!'
    }];

    $scope.addCltProduct = function (newTitle,newImage, newText) {
        $scope.products.push({
            title: newTitle,
            image: newImage,
            text: newText
        });
    };
});

angular.module('core').controller('geoProductsController', function ($scope) {

    $scope.geoproducts = [{
        title: 'Taking a Look at Mt. Saint Helens',
        image: 'https://volcanoes.usgs.gov/observatories/cvo/Historical/LewisClark/Historical/corps-engineers-archives_mount_st_helens_1978.jpg',
        text: 'Mount St. Helens or Louwala-Clough (known as Lawetlat la to the indigenous Cowlitz people, and Loowit to the Klickitat) is an active stratovolcano located in Skamania County, Washington, in the Pacific Northwest region of the United States. It is 96 miles (154 km) south of Seattle, Washington, and 50 miles (80 km) northeast of Portland, Oregon. Mount St. Helens takes its English name from the British diplomat Lord St Helens, a friend of explorer George Vancouver who made a survey of the area in the late 18th century.'

    }, {
        title: 'Analyzing the Crater in Northern Airzona',
        image: 'http://160knots.com/images/Winslow/mc3.JPG',
        text: 'Meteor Crater is a meteorite impact crater approximately 37 miles (60 km) east of Flagstaff and 18 miles (29 km) west of Winslow in the northern Arizona desert of the United States. Because the United States Board on Geographic Names commonly recognizes names of natural features derived from the nearest post office, the feature acquired the name of "Meteor Crater" from the nearby post office named Meteor.[2] The site was formerly known as the Canyon Diablo Crater and fragments of the meteorite are officially called the Canyon Diablo Meteorite.[3] Scientists refer to the crater as Barringer Crater in honor of Daniel Barringer, who was first to suggest that it was produced by meteorite impact.'
    },{
        title: 'Explore the Grand Canyon',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        text: 'The Grand Canyon (Hopi: Ongtupqa; Yavapai: Wi:kaʼi:la, Spanish: Gran Cañón), is a steep-sided canyon carved by the Colorado River in the state of Arizona in the United States. It is contained within and managed by Grand Canyon National Park, the Kaibab National Forest, Grand Canyon-Parashant National Monument, the Hualapai Tribal Nation, the Havasupai people and the Navajo Nation. President Theodore Roosevelt was a major proponent of preservation of the Grand Canyon area, and visited it on numerous occasions to hunt and enjoy the scenery.'
    },{
        title: 'Discovering Stonehenge',
        image: 'http://www.english-heritage.org.uk/remote/www.english-heritage.org.uk/content/properties/stonehenge/hero-carousel/stonehenge-circle-pink-sky?w=1440&h=750&mode=crop&scale=both&cache=always&quality=60&anchor=bottomcenter',
        text: 'Stonehenge is a prehistoric monument located in Wiltshire, England, about 2 miles (3 km) west of Amesbury and 8 miles (13 km) north of Salisbury. One of the most famous sites in the world, Stonehenge is the remains of a ring of standing stones set within earthworks. It is in the middle of the most dense complex of Neolithic and Bronze Age monuments in England, including several hundred burial mounds'
    }];

    $scope.addGeoProduct = function (newTitle,newImage, newText) {
        $scope.products.push({
            title: newTitle,
            image: newImage,
            text: newText
        });
    };
});


// Products controller
angular.module('core').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($scope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;


    // Find a list of Products
    $scope.find = function () {
      $scope.products = Products.query();
    };

    // Find existing Products
    $scope.findOne = function () {
      $scope.product = Products.get({
        productId: $stateParams.productId
      });
    };
  }
]);
