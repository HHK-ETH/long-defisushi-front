import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, Contract, providers } from 'ethers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AIRDROPS } from '../constant';
import Button from './simple/Button';
import airdropContractAbi from './../airdropContractAbi.json';
import TxPendingModal from './simple/TxPendingModal';

const Claim = (): JSX.Element => {
  const context = useWeb3React<Web3Provider>();
  const { active, connector, account } = context;
  const { id }: { id: string } = useParams();
  const airdrop = AIRDROPS[parseInt(id, 10)];
  const userAirdrop = airdrop.merkle.users[account ? account : ''];
  const [amountToMint, setAmountToMint] = useState(1);
  const [txLink, setTxLink] = useState('');
  const [maxAvailable, setMaxAvailableAmount] = useState(userAirdrop ? userAirdrop.amount : 0);

  const claim = async () => {
    if (!connector || !account || !userAirdrop) return;
    const provider = new providers.Web3Provider(await connector.getProvider(), 'any');
    const contract = new Contract(
      '0xf01a09504b6577aff75023ea4013a7477d856170',
      airdropContractAbi as any,
      provider
    ).connect(provider.getSigner());
    const tx = await contract.claim(id, account, amountToMint, userAirdrop.amount, userAirdrop.proof);
    setTxLink('https://rinkeby.etherscan.io/tx/' + tx.hash);
    await provider.waitForTransaction(tx.hash, 1);
    setTxLink('');
    alert('Airdrop successfully claimed !');
  };

  useEffect(() => {
    const fetchClaimed = async () => {
      if (!connector || !account) return;
      const provider = new providers.Web3Provider(await connector.getProvider(), 'any');
      const contract = new Contract('0xf01a09504b6577aff75023ea4013a7477d856170', airdropContractAbi as any, provider);
      const alreadyClaimed: BigNumber = await contract.claimed(id, account);
      setMaxAvailableAmount((userAirdrop ? userAirdrop.amount : 0) - alreadyClaimed.toNumber());
    };
    fetchClaimed();
  }, [active, account, connector, userAirdrop, id]);

  if (!active) return <div className="text-center">Please connect your wallet.</div>;

  return (
    <>
      <TxPendingModal txPending={txLink} />
      <div className="container mx-auto">
        <div className="text-center rounded-xl bg-gray-50 px-8 py-16 mx-48 my-24 shadow-xl">
          <h1 className="text-3xl italic">{airdrop.title}</h1>
          <div className="grid grid-cols-2 gap-8 mt-16">
            <img className="w-1/2 mx-auto" src={airdrop.img} alt="nft" />
            <div className="text-center text-lg my-auto">
              <h3 className="text-2xl -mt-8">
                Claim expire in {((airdrop.expiry - new Date().getTime() / 1000) / 3600).toFixed(2)} hours
              </h3>
              <h3 className="text-2xl">You are elligible to mint {maxAvailable} NFT(s)</h3>
              <div className="w-1/2 mx-auto mt-16">
                <label>Amount:</label>
                <input
                  className="bg-yellow-100 rounded-full m-2 text-center w-1/2"
                  type={'number'}
                  value={amountToMint}
                  onChange={(e) => {
                    let amount = parseInt(e.target.value, 10);
                    if (amount > maxAvailable) amount = maxAvailable;
                    if (amount < 1) amount = 1;
                    setAmountToMint(amount);
                  }}
                />
              </div>
              <Button style="text-lg w-1/2" action={() => claim()} label="Mint" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
