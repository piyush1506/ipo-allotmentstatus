
// const axios = require('axios');

// async function checkIPO(pan, clientId) {
//   try {
//     const res = await axios.get(
//       'https://0uz601ms56.execute-api.ap-south-1.amazonaws.com/prod/api/query',
//       {
//         params: {
//           type: 'pan',
//           issue_id: clientId 
//         },
//         headers: {
//           client_id: clientId,
//           reqparam: pan,
//           origin: 'https://ipostatus.kfintech.com',
//           referer: 'https://ipostatus.kfintech.com/',
//           'user-agent': 'Mozilla/5.0'
//         }
//       }
//     );

//     console.log(res);
//   } catch (err) {
//     console.log(err.response?.data || err.message || 'her her mahadev');
//   }
// }

// // Example:
// checkIPO('CZZPC6921B', '35015605280');




const axios = require('axios');
const getCompanies = require('./puppeteer')
const express = require('express')
const app  = express()
const cors = require('cors');

app.use(cors()); // ✅ ADD THIS (VERY IMPORTANT)
app.use(express.json());


app.post('/ipo-allot',(req,res)=>{
  const {pan,clientId} = req.body;
 console.log(pan,clientId)
const  Checkipo = async(pan,clientId)=>{
  try {
     const res  = await axios.get('https://0uz601ms56.execute-api.ap-south-1.amazonaws.com/prod/api/query',{
    params:{
      type:'pan',
        issue_id:clientId 
    },
    headers:{
     client_id:clientId,
     reqparam:pan,
     origin:'https://ipostatus.kfintech.com',
     referer:'https://ipostatus.kfintech.com/',
     'User-agent':'Mozilla/5.0'
    }
   })
   res.json(res.data)
   console.log(data);
  } catch (error) {
    console.error(error)
  }
 
}
Checkipo(pan,clientId);


})

app.get('/companies',async(req,res)=>{
  try {
    const data = await getCompanies()
    res.json(data)
  } catch (error) {
      res.status(500).json({ success:false,
       message: error.message });
  }
})
app.listen(8000,()=>{
  console.log('server is running at port 8000 ')
})

