import merkleCNY from './merkles/CNY.json';

export interface IAirdrop {
  id: string;
  title: string;
  criteria: string;
  expiry: number;
  img: string;
  merkle: any;
}

const AIRDROP_CONTRACT = '0x7a2c64626DD1379f3B556543bcEfa00291ED36a0';

const AIRDROPS: { [id: string]: IAirdrop } = {
  '63924037405401073795402369854177288236567119759998004639706615144753819287750': {
    id: '63924037405401073795402369854177288236567119759998004639706615144753819287750',
    title: 'Huat Ah',
    criteria: 'Must own genesis NFT',
    expiry: 1643799600,
    img: 'https://lh3.googleusercontent.com/iNRU9N9dgyC-XkUsv1vd1DlI2qirj1M6RHQZYafun6ny_mVSN5ApLNrRCrgVOdEkICKMGgLbpNepkLd--Yd-oY5N6ETc6AHKl9g2=w600',
    merkle: merkleCNY,
  },
};

export { AIRDROPS, AIRDROP_CONTRACT };
