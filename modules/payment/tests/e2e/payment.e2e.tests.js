'use strict';

describe('Payment E2E Tests', function () {
    it('should not have anything in the cart', function () {
        browser.get('http://localhost:3000/cart');
        expect(element.all(by.repeater('prodWrap in cart')).count()).toEqual(0);
    });

    it('should have something in the cart after adding a product', function () {
        browser.get('http://localhost:3000/products');
        element.all(by.repeater('product in products')).first().all(by.css('.text-muted')).last().click();
        //browser.get('http://localhost:3000/cart');
        expect(element.all(by.repeater('prodWrap in cart')).count()).toEqual(1);
    });
});
