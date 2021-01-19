import { captureConsoleLogs, traceExpress } from '@recap.dev/client'
import express, { Application } from 'express'
import { config } from 'dotenv'

config()

console.log(process.env.RECAP_DEV_SYNC_ENDPOINT)

traceExpress(express)
captureConsoleLogs()

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/employees', require('./routes/employees'));

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`);
});
