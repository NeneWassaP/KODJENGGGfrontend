'use client'
import React, { useEffect, useState } from 'react';

export default function Todsoft({reservid : string}) {
    const [image , setImage ] = useState("") ;

    function convertToBase64(e) {
      console.log(e) ;
      var reader = new FileReader() ;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log(reader.result) ; //base64encoded string
        setImage(reader.result) ;
      } ;
      reader.onerror = error => {
        console.log("Error: " , error) ;
      } ;
    }
    function uploadImage() {
      fetch("http://localhost:5000/api/v1/payment" , {
        method : "POST" ,
        crossDomain : true ,
        headers : {
          "Content-Type" : "application/json" ,
          Accept : "application/json" ,
          "Access-Control-Allow-Origin" : "*" ,
        },
        body : JSON.stringify({
          reservid : "662c70cf2806eeb2f4e59343" ,
          image : image
        })
      }).then((res) => res.json()).then((data) => console.log(data))
    }


  return (
    <div className='auth-wrapper'>
      <div className='auth-inner' style={{width : "auto"}}>
        Let's Upload Image 
        <input 
        accept='image/*'
        type='file'
        onChange={convertToBase64}
        />
      </div>
      {image == "" || image == null ? "" :<img width={100} height={150} src={image}/>}
      <button onClick={uploadImage} className='text-black'>Upload</button>
    </div>
  );
}

 
 