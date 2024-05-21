import { ABI, smartContractAddr } from "./config.js"
let web3;
let yourAddress
const init = async () => {
    btnConnect.addEventListener("click", async () => {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            // si on continue => user a accepte
            console.log("user accepted");
            yourAddress=(await window.ethereum.request({ method: "eth_accounts" }))[0]
            yourAddressEle.innerText = yourAddress

            // queries
            web3 = new Web3(window.ethereum) // initialisation en specifiant le provider a web3 constructor
            let contract = new web3.eth.Contract(ABI, smartContractAddr)
            let owner = await contract.methods.owner().call() // call c est juste pour query
            console.log("owner : ", owner);
            let status = await contract.methods.status().call() // call c est juste pour query
            console.log("status : ", status);
            targetSpan.innerText = await contract.methods.seuil().call()

            //balance
            balanceSpan.innerText = await web3.eth.getBalance(smartContractAddr)

            donateBtn.addEventListener("click", async () => {
                //transactions
                //payable
                try {
                   let resultat= await contract.methods.donate().send({
                         from: yourAddress,
                        value: valueDonation.value
                    })
                    console.log(resultat);
                    alert("donation reussi")

                }
                catch (e) {
                    console.log(e);
                    alert("error on donation")
                }
            })

        } catch (e) {
            console.log(e)
        }
    })

    if (window.ethereum == undefined)
        return alert("please install metamask or any other comptabile ethereum provider")

}


init();