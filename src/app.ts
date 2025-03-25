import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import kycRoutes from './routes/kyc.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/kyc', kycRoutes);

app.get('/', (req, res) => {
  res.send('Smile Identity KYC API');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});