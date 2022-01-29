import merkle0 from './merkles/0.json';

export interface IAirdrop {
  id: string;
  title: string;
  expiry: number;
  img: string;
  merkle: any;
}

const AIRDROP_CONTRACT = '0xb1907fb94F23b46CC1bdA034B2a60bA4b18A3D84';

const AIRDROPS: { [id: string]: IAirdrop } = {
  '79765734346372138360879254510324577471794138505795133682041904609867652399114': {
    id: '79765734346372138360879254510324577471794138505795133682041904609867652399114',
    title: 'Chinese new year',
    expiry: 1644793200,
    img: 'https://lh3.googleusercontent.com/uCWSiOdAs_dhwS9drY1dtjwBy-ihJG5ay0l31QDmyT4FwFBmsJl1lj32jjM9iCJEB7f5S33-OORePz2FLZXDQ7cgvsxBohQCPYFrZ_Y=w600',
    merkle: merkle0,
  },
};

export { AIRDROPS, AIRDROP_CONTRACT };
