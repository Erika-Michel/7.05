module.exports = {
    clickElement: async function (page, selector) {
        try { 
            await page.waitForSelector(selector);
            await page.click(selector);           
        } catch (error) {
            throw new Error(`Selector is not clickable ${selector}`) 
        }
    },

   getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, (link) => link.textContent); 
        } catch (error) {
            throw new Error(`Text is not available for selector ${selector}`)
        }
    },

   bookTicket: async function(page, selector1) {
       try {
        await clickElement(page, selector1);
        disabled = await page.$eval("button", (button) => button.disabled);
        if (!disabled) {
          await clickElement(page, "button");
          await clickElement(page, "button");
    
       } else {
    
        await clickElement(page, selector1);
        await clickElement(page, "button");
        await clickElement(page, "button");
       }

       } catch (error){
           throw new Error("All chairs are already booked")
       }
   }
}