import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import sushichef from './../sushichef.png';
import { AIRDROPS, IAirdrop } from '../constant';
import AirdropBox from './simple/AirdropBox';

const Home = (): JSX.Element => {
  const context = useWeb3React<Web3Provider>();
  const { active } = context;

  return (
    <>
      <div className="container mx-auto">
        <div className="text-center my-36">
          <img className="h-36 mx-auto" src={sushichef} alt="sushichef" />
          <h1 className="text-2xl italic text-black">Collect DefiSushi Genesis NFTs and claim exclusive airdrops!</h1>
          {!active && <div>Please connect your wallet.</div>}
          {active && (
            <div className="grid grid-cols-4 gap-6 p-16">
              {AIRDROPS.map((drop: IAirdrop) => {
                return <AirdropBox airdrop={drop} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
