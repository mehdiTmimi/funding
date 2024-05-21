import {ABI,smartContractAddr} from "./config.js"
let web3;
const init = async () => {
    btnConnect.addEventListener("click",async ()=>{
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            // si on continue => user a accepte
            console.log("user accepted");
            yourAddress.innerText= (await window.ethereum.request({method:"eth_accounts"}))[0]
            
            web3 = new Web3(window.ethereum) // initialisation en specifiant le provider a web3 constructor
            let contract = new web3.eth.Contract(ABI , smartContractAddr)
            let owner = await contract.methods.owner().call() // call c est juste pour query
            console.log("owner : ",owner);
            let status = await contract.methods.status().call() // call c est juste pour query
            console.log("status : ",status);
        } catch (e) {
            console.log(e)
        }
    })

    if (window.ethereum == undefined)
        return alert("please install metamask or any other comptabile ethereum provider")
  
}


init();