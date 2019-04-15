import { Gout } from './constants';

enum Juice {
  ORANGE,
  CITRON,
  ANANAS,
  POMME,
  LAIT_COCO
}

interface IJuice {
  id: number;
  name: string;
  gout: Gout;
}

function getJuice(juice: Juice): IJuice {
  switch (juice) {
    case Juice.ORANGE: return { id: 1, name: 'Jus d\'orange',  'gout': Gout.ACIDE};
    case Juice.CITRON: return { id: 2, name: 'Jus de citron', 'gout': Gout.ACIDE};
    case Juice.ANANAS: return { id: 3, name: 'Jus d\'ananas',  'gout': Gout.ACIDE};
    case Juice.POMME: return { id: 4, name: 'Jus de pomme',  'gout': Gout.SUCRE};
    case Juice.LAIT_COCO: return { id: 5, name: 'Lait de coco',  'gout': Gout.SUCRE};
  }
}

function getJuices(): Juice[] {
  return [Juice.ORANGE, Juice.CITRON, Juice.ANANAS, Juice.POMME, Juice.LAIT_COCO];
}

export { Juice, getJuice, getJuices };
