require('dotenv').config()
const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))