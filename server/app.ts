import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { connectToDB, sequelize } from './src/db/connection';
import { schema } from './src/graphql/schemas/index';
import { Exercise } from './src/models/Exercise';
import { Program } from './src/models/Program';
import { User } from './src/models/User';
import { Workout } from './src/models/Workout';
import { PresetExercises } from './src/data/presets';
dotenv.config();

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://pet-app.com/api/v2',
  issuerBaseURL: `https://petapp.us.auth0.com/`,
  tokenSigningAlg: 'RS256',
});

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>({ schema });

const init = async () => {
  const graphqlUploadExress = (await import('graphql-upload/graphqlUploadExpress.mjs')).default;

  app.use(graphqlUploadExress());

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    })
  );

  connectToDB().then(async () => {
    User.hasMany(Program, { as: 'Programs', foreignKey: 'userId' });

    Program.hasMany(Workout, { as: 'Workouts', foreignKey: 'programId', onDelete: 'CASCADE' });

    Exercise.belongsToMany(Workout, { through: 'WorkoutExercises' });
    Workout.belongsToMany(Exercise, { through: 'WorkoutExercises' });

    await sequelize.sync({});

    await Program.destroy({ where: {} });

    PresetExercises.forEach(async (preset) => {
      await Exercise.findOrCreate({ where: { name: preset.name }, defaults: preset });
    });
  });

  const port = process.env.PORT || 54321;

  await new Promise<void>((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);

  app.get('/health', (req, res) => {
    res.status(200).send('Okay!');
  });

  app.get('/api/v2/private/permissions', checkJwt, (req, res) => {
    if ((req.auth.payload.permissions as string[])?.includes('admin')) {
      res.status(202).send({ message: 'Admin Authorized', permissions: req.auth.payload.permissions, sub: req.auth.payload.sub });
      return;
    }

    res.status(403).send({ message: 'Unauthorized user.' });
  });
};

init();
