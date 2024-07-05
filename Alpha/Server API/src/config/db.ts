import mysql from 'mysql';

const db = mysql.createConnection({
    host: "10.10.135.100",
    user: "adm",
    password: "",
    database:"unity_teste" 
})

export default db;