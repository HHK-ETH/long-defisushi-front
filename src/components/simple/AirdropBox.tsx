import Button from './Button';
import { IAirdrop } from '../../constant';
import { Link } from 'react-router-dom';

const AirdropBox = ({ airdrop }: { airdrop: IAirdrop }): JSX.Element => {
  const btnLabel = airdrop.expiry > new Date().getTime() / 1000 ? 'Claim now' : 'Airdrop expired';

  return (
    <div className="text-center rounded-xl bg-gray-50 p-4 shadow-xl">
      <h1 className="text-xl font-bold text-yellow-700 italic">{airdrop.title}</h1>
      <img className="h-36 mx-auto m-4" src={airdrop.img} alt="nft" />
      <Link to={'/claim/' + airdrop.id}>
        <Button label={btnLabel} style="text-lg" action={() => {}} />
      </Link>
    </div>
  );
};

export default AirdropBox;
