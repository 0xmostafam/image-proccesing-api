import express from 'express';
import routes from './routes/routes';

const app = express();
const port = 8000;

app.use('/api', routes);

app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});

export default app;
