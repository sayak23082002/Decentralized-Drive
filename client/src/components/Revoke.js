import React from 'react'
import "./Revoke.css";

export default function Revoke({setRevvokeOpen, contract}) {
    const revoking = async () => {
        try {
            const address = document.querySelector(".address").value;
            await contract.disAllow(address);
            console.log("Sharing is revoked")
        } catch (error) {
            alert("You don't have accesss");
        }
    }
  return (
    <div className='revokeBackground'>
      <div className="revokeContainer">
        <div className="title"></div>
        <div className="body">
          <input type="text" className="address" placeholder="Enter Address" />
        </div>
        <form id="myForm">
        </form>
        <div className="footer">
          <button onClick={() => {setRevvokeOpen(false)}} id="cancleBtn"> Cancle </button>
          <button onClick={() => revoking()} > Revoke </button>
        </div>
      </div>
    </div>
  )
}
