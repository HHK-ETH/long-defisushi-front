import { useState } from 'react';
import ConnectModal from './wallet/ConnectModal';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import sushichef from '../sushichef.png';
import { Link } from 'react-router-dom';
import Button from './simple/Button';

const Header = (): JSX.Element => {
  const context = useWeb3React<Web3Provider>();
  const { account, active } = context;
  const connectBtnLabel =
    active && account
      ? account.slice(0, 5) + '***' + account?.slice(account.length - 5, account.length)
      : 'Connect wallet';
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectModal open={open} setOpen={setOpen} />
      <nav className="p-6 mb-6">
        <Link className="float-left -mt-2 italic text-md" to={'/'}>
          <img className={'h-10 inline-block mr-2'} alt={'chain-logo'} src={sushichef} />
          long defisushi
        </Link>
        <Button style="text-lg float-right -mt-1" action={() => setOpen(true)} label={connectBtnLabel} />
      </nav>
    </>
  );
};

export default Header;
