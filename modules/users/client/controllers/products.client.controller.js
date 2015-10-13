'use strict';

angular.module('core').controller('cltProductsController', function ($scope) {

    $scope.cltproducts = [{
        title: 'Exploring The Swamp',
        image: 'http://1.bp.blogspot.com/-QuICtWHygN0/UoAlMMR9UNI/AAAAAAABYfc/rfcld52y97M/s1600/Gaineville+Trip+136.JPG',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat. Integer a diam eu sem fringilla hendrerit non eget mi. Praesent mattis ultrices interdum. Phasellus vestibulum metus quis pulvinar dapibus. '

    }, {
        title: 'Exploring Gator Football',
        image: 'http://www.gatortailgating.com/files/imagecache/gt7_full_580/mike/2012/03/gators-usf.jpg',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat.'
    },{
        title: 'Taking a look at Century Tower',
        image: 'http://cdn.webservices.ufhealth.org/wp-content/blogs.dir/350/files/2012/05/UFCampus.jpg',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat.'
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
        title: 'Rocks With Eyes',
        image: 'https://stevengoddard.files.wordpress.com/2011/07/pet-rocks.jpg',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat. Integer a diam eu sem fringilla hendrerit non eget mi. Praesent mattis ultrices interdum. Phasellus vestibulum metus quis pulvinar dapibus. '

    }, {
        title: 'Very Hot Rocks',
        image: 'http://thegrumpymom.com/wp-content/uploads/2015/04/evil-love-1-rocks.jpg',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat.'
    },{
        title: 'Shiny Rocks',
        image: 'https://s3.amazonaws.com/rapgenius/tumbled-stones.jpg',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat.'
    },{
        title: 'THE ROCK',
        image: 'http://robbinsmedia.com/wp-content/uploads/2012/12/10_Dwayne_Johnson.jpg',
        text: 'Dwayne Douglas Johnson (born May 2, 1972), also known by his ring name The Rock, is an American and Canadian actor, producer and professional wrestler. Johnson was a college football player for the University of Miami, winning a national championship on the 1991 Miami Hurricanes football team. He later played for the Calgary Stampeders in the Canadian Football League, and was cut two months into the 1995 season. '
    }];

    $scope.addGeoProduct = function (newTitle,newImage, newText) {
        $scope.products.push({
            title: newTitle,
            image: newImage,
            text: newText
        });
    };
});


angular.module('core').controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'Cultural Products',
            url: 'one.tpl.html'
        }, {
            title: 'Geological Products',
            url: 'two.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl === $scope.currentTab;
    };
}]);
