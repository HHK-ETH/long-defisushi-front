import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, Contract, providers } from 'ethers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AIRDROPS, AIRDROP_CONTRACT } from '../constant';
import Button from './simple/Button';
import airdropContractAbi from './../airdropContractAbi.json';
import TxPendingModal from './simple/TxPendingModal';
import { formatEther, parseUnits } from 'ethers/lib/utils';

const Claim = (): JSX.Element => {
  const context = useWeb3React<Web3Provider>();
  const { active, connector, account } = context;
  const { id }: { id: string } = useParams();
  const airdrop = AIRDROPS[id];
  const userAirdrop = airdrop.merkle.users[account ? account.toLocaleLowerCase() : ''];
  const [amountToMint, setAmountToMint] = useState(1);
  const [txLink, setTxLink] = useState('');
  const [maxAvailable, setMaxAvailableAmount] = useState(userAirdrop ? userAirdrop.amount : 0);
  const [balance, setBalance] = useState(BigNumber.from(0));

  const claim = async () => {
    if (!connector || !account || !userAirdrop) return;
    if (parseFloat(formatEther(balance)) < airdrop.price * amountToMint) {
      alert("You don't have enough ETH to pay.");
      return;
    }
    const provider = new providers.Web3Provider(await connector.getProvider(), 'any');
    const contract = new Contract(AIRDROP_CONTRACT, airdropContractAbi as any, provider).connect(provider.getSigner());
    const tx = await contract.claim(id, account, amountToMint, userAirdrop.amount, userAirdrop.proof, {
      value: parseUnits((0.02 * amountToMint).toString(), 'ether'),
    });
    setTxLink('https://rinkeby.etherscan.io/tx/' + tx.hash);
    await provider.waitForTransaction(tx.hash, 1);
    setTxLink('');
    alert('Airdrop successfully claimed !');
  };

  useEffect(() => {
    const fetchClaimed = async () => {
      if (!connector || !account || txLink !== '') return;
      const provider = new providers.Web3Provider(await connector.getProvider(), 'any');
      setBalance(await provider.getBalance(account));
      const contract = new Contract(AIRDROP_CONTRACT, airdropContractAbi as any, provider);
      const alreadyClaimed: BigNumber = await contract.claimed(id, account);
      setMaxAvailableAmount((userAirdrop ? userAirdrop.amount : 0) - alreadyClaimed.toNumber());
    };
    fetchClaimed();
  }, [active, account, connector, userAirdrop, id, txLink]);

  if (!active) return <div className="text-center">Please connect your wallet.</div>;

  return (
    <>
      <TxPendingModal txPending={txLink} />
      <div className="container mx-auto">
        <div className="px-8 py-16 mx-48 my-24 text-center shadow-xl bg-gray-50 rounded-xl">
          <h1 className="text-3xl italic">{airdrop.title}</h1>
          <h1 className="text-xl">Airdrop Criteria: {airdrop.criteria}</h1>
          <div className="grid grid-cols-2 gap-8 mt-16">
            <img className="w-1/2 mx-auto" src={airdrop.img} alt="nft" />
            <div className="my-auto text-lg text-center">
              <h3 className="-mt-8 text-2xl">
                {((airdrop.expiry - new Date().getTime() / 1000) / 3600).toFixed(2)} hours left to claim!
              </h3>
              <h3 className="text-2xl">You are eligible to mint {maxAvailable} NFT(s)</h3>
              <div className="w-1/2 mx-auto mt-16">
                <label>Amount:</label>
                <input
                  className="w-1/2 m-2 text-center bg-yellow-100 rounded-full"
                  type={'number'}
                  value={amountToMint}
                  onChange={(e) => {
                    let amount = parseInt(e.target.value, 10);
                    //if (amount > maxAvailable) amount = maxAvailable;
                    if (amount < 1) amount = 1;
                    setAmountToMint(amount);
                  }}
                />
              </div>
              <Button style="text-lg w-1/2" action={() => claim()} label="Mint" />
              <p className="mt-2 text-sm">Total cost (excluding gas): {airdrop.price * amountToMint} ETH</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
