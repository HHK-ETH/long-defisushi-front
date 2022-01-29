export interface IAirdrop {
  id: number;
  title: string;
  expiry: number;
  img: string;
}

const AIRDROPS: IAirdrop[] = [
  {
    id: 0,
    title: 'Chinese new year',
    expiry: 1644793200,
    img: 'https://lh3.googleusercontent.com/SVHvcHJNLweNf5Pv0OxAi9aqfDZSMkZBHvPS7OOWHvCy4X_pnNogzivftvI97_12qKsDZ7D_RAYPNs4k2zbD5DkfnQGN0BeoN-sE=w600',
  },
];

export { AIRDROPS };
