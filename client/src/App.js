import DDrive from "./artifacts/contracts/DDrive.sol/DDrive.json";
import {useState, useEffect} from "react";
import { ethers } from 'ethers';
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Revoke from "./components/Revoke";
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);
  const [revvokeOpen, setRevvokeOpen] = useState(null);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    const loadProvider = async() => {
      if(provider){

        window.ethereum.on("chainCchanged", () => {
          window.location.reload();
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })

        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress, DDrive.abi, signer
        )
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask is not installed.");
      }
    }
    provider && loadProvider()
  }, [])
  return (
    <>
      {!modalOpen && (<button className="share" onClick={() => setModalOpen(true)} > Share </button>)}{" "}
      {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract} />)}
      {!revvokeOpen && (<button className="revoke" onClick={() => setRevvokeOpen(true)} > Revoke </button>)}{" "}
      {revvokeOpen && (<Revoke setRevvokeOpen={setRevvokeOpen} contract={contract} />)}
      <div className="App">
        <h1 style={{color: "white"}}>DDrive 3.0</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <p style={{color: "white"}}>Account : {account ? account : "Not connected"}</p>

        <FileUpload account={account} provider={provider} contract={contract} />
        <Display account={account} contract={contract} />
      </div>
    </>
  );
}

export default App;
