import Button from './Button';
import { IAirdrop } from '../../constant';
import { Link } from 'react-router-dom';

const AirdropBox = ({ airdrop }: { airdrop: IAirdrop }): JSX.Element => {
  const timeLeft = (airdrop.expiry - new Date().getTime() / 1000) / 3600;
  const btnLabel = timeLeft > 0 ? 'Claim now' : 'Claim expired';

  return (
    <div className="p-4 text-center shadow-xl rounded-xl bg-gray-50">
      <h1 className="text-xl italic font-bold text-yellow-700">{airdrop.title}</h1>
      <img className="m-4 mx-auto h-36" src={airdrop.img} alt="nft" />
      {timeLeft > 0 && (
        <Link to={'/claim/' + airdrop.id}>
          <Button label={btnLabel} style="text-lg" action={() => {}} />
        </Link>
      )}
      {timeLeft < 0 && <Button label={btnLabel} style="text-lg" action={() => {}} />}
    </div>
  );
};

export default AirdropBox;
