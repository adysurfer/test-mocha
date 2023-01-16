export class BasketPage {
    addProductToBasket() {
        // click on first product basket to add product
        cy.get('.fp_article_basket_add').eq(0).click()
        cy.wait(2000)
    }
    verifyProductIsAdded() {
        // validate if product is added to the basket
        cy.get('.fp_article_quantity').eq(0).should('have.text', 1)
    }
    validateDeliveryCharges() {
        function recurseProductBasket() {
            cy.get('.fp-basket_summary').then(function ($el) {
                const getProductData = $el.find('div span')
                // get total product price(warenwert) in string and convert to float
                let getProductPrice = parseFloat((getProductData.eq(1).text()).replace(',', '.')).toFixed(2)
                // get total delivery price(Liefergebühr) in string format
                let getDeliveryPrice = getProductData.eq(5).text().trim()

                let deliveryFromPrc1 = 29.00
                let deliveryFromPrc2 = 39.00
                let freeDeliveryFromPrc = 49.00
                let expectDeliveryPrc1 = '2,90'
                let expectDeliveryPrc2 = '1,80'
                let expectFreeDelivery = 'kostenlos'
                // assert delivery prices (Liefergebühr)
                if (getProductPrice < deliveryFromPrc1) {
                    expect(getDeliveryPrice).to.contain(expectDeliveryPrc1)
                } else if (getProductPrice >= deliveryFromPrc1 && getProductPrice < deliveryFromPrc2) {
                    expect(getDeliveryPrice).to.contain(expectDeliveryPrc1)
                } else if (getProductPrice >= deliveryFromPrc2 && getProductPrice < freeDeliveryFromPrc) {
                    expect(getDeliveryPrice).to.contain(expectDeliveryPrc2)
                } else if (getProductPrice >= freeDeliveryFromPrc) {
                    expect(getDeliveryPrice).to.contain(expectFreeDelivery)
                }
                // add more products to update product and delivery prices
                cy.get('.fp-count_plus').then(function ($el) {
                    cy.wrap($el).click()
                    cy.wrap($el).wait(2000)
                })
                // call the recursive function until we reach the free delivery price i.e 49 EUR
                if (getProductPrice < freeDeliveryFromPrc) {
                    recurseProductBasket()
                }
            })
        }
        recurseProductBasket()
    }
}

export const basketPage = new BasketPage()