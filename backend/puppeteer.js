const puppeteer = require('puppeteer')

async function getCompanies() {
     const browser = await puppeteer.launch({headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
     });
     const page  = await browser.newPage();
     

     await page.goto('https://ipostatus.kfintech.com/',{
        waitUntil:'networkidle2',
        timeout:0
     })

      await page.click('input')
     await new Promise(resolve=>setTimeout(resolve,5000))

    //  await page.waitForFunction(()=>window.data && window.data.length >0)

     const companies = await page.evaluate(()=>{
   //      const selects = document.querySelectorAll('select')
   //      if(!selects.length) return[]
   
    const items = document.querySelectorAll('li[role="option"]');

        let data = []
         items.forEach(item => {
       const name  = item.textContent.trim()

       const clientId = item.getAttribute('data-value')
      
       

            if ( name && 
              clientId
            ) {
               data.push({
                  name,
                  clientId
               })
            }

         
       })
    
        return data
     })
     await browser.close();
     return companies
}
module.exports = getCompanies;