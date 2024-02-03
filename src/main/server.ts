import express from 'express'

export const app = express()
app.listen(5050, () => { console.log('Server running at http://localhost:5050') })
