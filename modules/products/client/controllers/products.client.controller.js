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
        title: 'Rocks With Eyes',
        image: 'https://stevengoddard.files.wordpress.com/2011/07/pet-rocks.jpg',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'

    }, {
        title: 'Very Hot Rocks',
        image: 'http://thegrumpymom.com/wp-content/uploads/2015/04/evil-love-1-rocks.jpg',
        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
    },{
        title: 'Shiny Rocks',
        image: 'https://s3.amazonaws.com/rapgenius/tumbled-stones.jpg',
        text: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
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
