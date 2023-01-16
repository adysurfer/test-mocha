import { navigateTo } from "../support/page_objects/HomePage"
import { basketPage } from "../support/page_objects/BasketPage"

describe('Verify PLZ and Delivery prices after adding products to basket', function () {
  // this code block will execute once before all tests (Task 1)
  before('Open homepage and verify PLZ', function () {
    navigateTo.openHomePage()
    // parametrize PLZ
    navigateTo.enterPlz(13347)
    navigateTo.clickPlz()
    // validate PLZ and user is on home page
    navigateTo.verifyPlz(13347)
    navigateTo.verifyOnHomePage()
  })
  //Task 2
  it('Add product to basket and Verify product delivery charges', function () {
    navigateTo.goToBasketPage()
    navigateTo.verifyOnBasketPage()
    // add product to basket
    basketPage.addProductToBasket()
    // product is added
    basketPage.verifyProductIsAdded()
    /*
      Validate the delivery prices(Liefergebühr) accordingly with the updation of products in basket
     */
    basketPage.validateDeliveryCharges()
  })
})