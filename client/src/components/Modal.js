import React from 'react';
import { useEffect } from 'react';
import "./Modal.css";

export default function Modal({setModalOpen, contract}) {
  const sharing = async () => {
    try {
      const address = document.querySelector(".address").value;
      await contract.allow(address);
      console.log("Sharing is allowed")
    } catch (error) {
      alert("You don't have accesss");
    }
  };
  useEffect(() => {
    const accessList = async() => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for(let i = 0; i < options.length; i++){
        let opt = options[i];
        let ei = document.createElement("option");
        ei.textContent = opt;
        ei.value = opt;
        select.appendChild(ei);
      }
    }
    contract && accessList();
  });
  return (
    <div className='modalBackground'>
      <div className="modalContainer">
        <div className="title"></div>
        <div className="body">
          <input type="text" className="address" placeholder="Enter Address" />
        </div>
        <form id="myForm">
          <select id="selectNumber">
            <option className="address">People With Access</option>
          </select>
        </form>
        <div className="footer">
          <button onClick={() => {setModalOpen(false)}} id="cancleBtn"> Cancle </button>
          <button onClick={() => sharing()} > Share </button>
        </div>
      </div>
    </div>
  )
}