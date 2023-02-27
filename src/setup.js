import dotenv from 'dotenv';

console.log(process.env.NODE_ENV);

const path = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
console.log(path)

dotenv.config({ path });