import React, {useState,useContext} from 'react'
import { NavLink, useParams } from 'react-router-dom'
// import client from '../utils/ipfs'
import {createNFT} from '../contexts/useContract/writeContract'
import {sellerId} from '../contexts/useContract/readContract'
import Web3Context from '../contexts'
import './CreateWarranty.css'

const CreateWarranty = () => {
  const {account,Contract,sellerI} = useContext(Web3Context)
  const{add} = useParams();
    const [show, setshow] = useState('')
    const[productId,setProductId]=useState("")
    const[customer,setCustomer]= useState("")
    const[expiry,setExpiry]=useState("")
    const[coverImageURI,setCoverImageURI] = useState("")
    const[Coverimage,setCoverImage] = useState("")

    //const [pic,setPic]=useState()
    const showPhoto = async(e) => {
        //console.log(e.target.files[0]);
        setCoverImage(e.target.files[0]);
        setshow(URL.createObjectURL(e.target.files[0]));
       
    }
    const handleProductId= (event) => {
        setProductId(() => ([event.target.name] = event.target.value));
      };
      const handleExpiry= (event) => {
        setExpiry(() => ([event.target.name] = event.target.value));
      };
      const handleCustomer= (event) => {
        setCustomer(() => ([event.target.name] = event.target.value));
      };
    const UploadImage = async (e) => {
      //let uri="" ;
      // console.log(Coverimage)
      console.log("started");
     e.preventDefault()
        const data = new FormData();
        data.append('file', Coverimage);
        data.append('upload_preset', 'mystiq');
        data.append('cloud_name', 'doybtqm8h');
        await fetch('https://api.cloudinary.com/v1_1/doybtqm8h/image/upload', {
          method: 'post',
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            const res = data.url
            setCoverImageURI(res);
            // console.log(res)
           // uri = data.url
            //console.log('Image Uploaded')
            alert("Image Uploaded");
             handleData(res)
           
          
          })
          .catch((err) => console.log(err));
      };
    
      const handleData = async (res) => {
        const obj = {
        
          name:"NFT Warranty",
          description:"This a NFT Warranty and Proof of Ownership of the following product",
          image: res,
          attributes: [
            {
                "display_type": "date", 
                "trait_type": "expiry", 
                "value":Math.floor(Date.now() /1000)+expiry+20

            },
            {
                "trait_type":"productId",
                "value":productId
            }
          ],
        };
      //   console.log(client);
      //   const result = await client.add(JSON.stringify(obj));
      //   const str = 'ipfs://';
      //   const finalResult = str.concat(String(result.path));
      //   console.log(result)
      // //  console.log(finalResult);
      // alert('NFT Data added');
      //  await createNFT(Contract,finalResult,sellerI,productId,customer.toLowerCase(),expiry,res,account.currentAccount);
      //   alert('NFT created')
        setTimeout(function () {
          window.location.href = `/seller/${account.currentAccount}`;
        }, 4000);
      
      };  
      return (
    <div className="createcontain">
      <div className="createinnercontain">
        <p className="createtext">Create Warranty</p>
        <p className="createtextsmall">Wallet Address</p>
        <input className="textboxcreate" type="text" />
        <p className="createtextsmall2">Order ID</p>
        <input className="textbox2create" type="text" onChange={handleProductId} />
        <p className="createtextsmall3">Buyer Wallet ID</p>
        <input className="textbox3create" type="text" onChange={handleCustomer}/>
        <p className="createtextsmall4">Validity</p>
        <input className="textbox4create" type="text" onChange={handleExpiry}/>
        <div>
          <h1 className="imagewarranty">Upload Image</h1>
          <input className="buttonimage" type="file" accept='image/*' onChange={showPhoto} />
        </div>
        <div className="buttontextcreate">
          <button className="buttoncreate" type="submit" onClick={UploadImage}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWarranty;
