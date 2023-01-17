export class HomePage {
    openHomePage() {
        // intercept the network request
        // specifying an alias for the request
        cy.intercept('GET', 'https://www.flaschenpost.de/data/zipcodes.json').as('WaitForPlzCodes')
        cy.intercept('POST', 'https://fpt.flaschenpost.de/sb-topic/screen-view').as('WaitForScreenToLoad')
        // visit flaschenpost
        cy.visit('https://www.flaschenpost.de/')
    }
    enterPlz(Plz) {
        // wait for the request to finish by specifying the alias for our intercepted request
        cy.wait('@WaitForPlzCodes')
        // wait for screen items(categories, etc.) to load
        cy.wait('@WaitForScreenToLoad')
        // enter zip code
        cy.get('.zipcode_input_component input').type(Plz)
    }
    clickPlz() {
        // click on button
        cy.contains('.button_wrapper', 'Geht klar').click()
        // wait for screen items(categories, etc.) to load
        cy.wait('@WaitForScreenToLoad')
    }
    verifyPlz(Plz) {
        // verify PIN is applied correctly
        cy.get('.fp-footer-usp').find('.change_zip_code_number').should('have.text', Plz)
    }
    verifyOnHomePage() {
        // verify if user is on home page
        cy.get('.category_tiles').should('exist')
    }
    goToBasketPage() {
        // get category Tile randomly (Wasser, Weine or Bier)
        let products = ['Weine', 'Bier', 'Wasser']
        // index value will change randomly for array <products>
        const randomProductCategory = products[Math.floor(Math.random() * products.length)]
        // click product category (Wasser, Weine or Bier) tile randomly
        cy.get('.category_tile').find('p').each(element => {
            if (element.text() === randomProductCategory) {
                cy.wrap(element).click({ force: true })
                cy.get('.simplebar-content').find('li')
                    .eq(0)
                    .click()
                cy.wait(2000)
            }
        })
    }
    verifyOnBasketPage() {
        cy.get('.headlineSize_M').eq(0).then(function ($el) {
            const txt = $el.text().trim()
            expect(txt).to.equal('Dein Warenkorb')
        })
    }
}

export const navigateTo = new HomePage()