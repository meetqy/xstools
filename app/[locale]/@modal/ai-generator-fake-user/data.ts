export interface User {
  id_card: string;
  name: string;
  birth_date: string;
  age: number;
  gender: string;
  // 详细地址
  residence: string;
  email: string;
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
