import express from "express";
import routes from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };

const app = express();

// Express
app.use(express.json());
app.use('/api', routes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});