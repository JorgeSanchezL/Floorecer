import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import mapRoutes from './src/routes/map.routes.js';
import userVerificationRoutes from './src/routes/userVerification.routes.js';
import authenticationRoutes from './src/routes/authentication.routes.js';
import morgan from 'morgan';

const app = express();
const PORT = 5000;

app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
	res.send('Floorecer API v1.0.1');
});

// Routes

app.use('/map', mapRoutes);
app.use('/user-verification', userVerificationRoutes)
app.use('/user-authe',authenticationRoutes)

app.listen(PORT, (error) => {
	if(!error) { console.log("Server running on port " + PORT); }
	else {
		console.log("Error occurred, server can't start", error);
	}
});
