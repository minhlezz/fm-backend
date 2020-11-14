

const PORT = 3001;
const API_URL = `http://localhost:${PORT}/graphql`;
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbname = process.env.MONGO_DB;
const uri = `mongodb+srv://${username}:${password}@cluster0.ek2re.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

module.exports = {
    PORT,
    API_URL,
    uri,
    JWT_SECRET_KEY
}