import merkle0 from './merkles/0.json';

export interface IAirdrop {
  id: number;
  title: string;
  expiry: number;
  img: string;
  merkle: any;
}

const AIRDROP_CONTRACT = '0xb1907fb94F23b46CC1bdA034B2a60bA4b18A3D84';

const AIRDROPS: IAirdrop[] = [
  {
    id: 0,
    title: 'Chinese new year',
    expiry: 1644793200,
    img: 'https://lh3.googleusercontent.com/SVHvcHJNLweNf5Pv0OxAi9aqfDZSMkZBHvPS7OOWHvCy4X_pnNogzivftvI97_12qKsDZ7D_RAYPNs4k2zbD5DkfnQGN0BeoN-sE=w600',
    merkle: merkle0,
  },
];

export { AIRDROPS, AIRDROP_CONTRACT };
