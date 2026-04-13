import React from 'react'
import { useState,useEffect } from 'react';
// import { useState } from 'react'

// import './App.css'

function App() {

  const [pan,setPan] = useState('')
  const [id,setid] = useState('')
  const [companies,setCompanies] = useState([])
  const [res,setres] = useState([])

  
console.log(id)
useEffect(() => {
  const fethcom = async()=>{
    try {
      const res =await  fetch('http://localhost:8000/companies')
    const data  = await res.json();
    setCompanies(data)


    console.log('data',data)
    } catch (error) {
      console.error(error)
    }
  
  }
  fethcom();
}, []);


  const handlesubmit = async(e)=>{
    e.preventDefault();
    console.log(pan)
    const payload = {
      pan,
      clientId:id
    }
    const res = await fetch('http://localhost:8000/api/ipo-allot',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
             },
             body:JSON.stringify(payload)
    })
  const resdata = await res.json();
   console.log(resdata)
   setres(resdata)
  }


  return (
  <div className='min-h-screen flex items-center justify-center bg-[#e2e0e0a8]'>
     <div className="bg-[#fffefe9c] p-3 rounded-xl flex items-center justify-center  flex-col gap-6">
      <div className="text-3xl font-semibold font-sans flex items-center justify-center text-fuchsia-800">check your ipo allotment status </div>
      <form onSubmit={handlesubmit}>

    
      <div className="">
        <select name='id' onChange={(e)=>setid(e.target.value)}  name='company' className='w-60 outline-0  h-9 rounded-lg bg-[#c9baba38] border-b-gray-900'>
             <option>select company</option>
             {
                companies.map((comp,index)=>(
                     <option value={comp.clientId}>{comp.name}</option>
                ))
             }
            

        </select>
      </div>
      <div className="mt-3">
         <input onChange={(e)=>{setPan(e.target.value.toUpperCase())}} type='text' maxLength={10} className='outline-none uppercase h-9 rounded-lg border-amber-700 bg-[#c9baba38] w-60' placeholder='enter your pan card'/>
      
      </div>
      <button className='mx-auto bg-blue-500 text-white p-2 mt-4 rounded-md w-full'>submit</button>
       </form>
     </div>
     {
      res && (
        <div className=''>
          not data found
          </div>
      )
     }
     
  </div>
  )
}

export default App
