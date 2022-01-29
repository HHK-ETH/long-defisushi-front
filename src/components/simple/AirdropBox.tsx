import Button from './Button';
import { IAirdrop } from '../../constant';

const AirdropBox = ({ data }: { data: IAirdrop }): JSX.Element => {
  const btnLabel = data.expiry > new Date().getTime() / 1000 ? 'Claim now' : 'Airdrop expired';

  return (
    <div className="text-center rounded-xl bg-gray-50 p-4 shadow-xl">
      <h1 className="text-xl font-bold text-yellow-700 italic">{data.title}</h1>
      <img className="h-36 mx-auto m-4" src={data.img} alt="nft" />
      <Button label={btnLabel} style="text-lg" action={() => {}} />
    </div>
  );
};

export default AirdropBox;
