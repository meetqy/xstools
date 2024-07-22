export interface User {
  id_card: string;
  name: string;
  birth_date: string;
  age: number;
  gender: string;
  // 现居地 x 省 x 市 x 区 x 街道 x 号
  residence: string;
  hometown: string;
  phone: string;
  schools: {
    elementary: School;
    middle: School;
    high: School;
    university: School;
  };
}

interface School {
  admission_date: string;
  graduation_date: string;
  name: string;
}
