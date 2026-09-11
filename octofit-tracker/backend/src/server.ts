import express from 'express';
import { connectDatabase } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ displayName: 1 }).lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'displayName username').sort({ name: 1 }).lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'displayName username').populate('team', 'name').sort({ completedAt: -1 }).lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'displayName username').populate('team', 'name').sort({ rank: 1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exit(1);
});