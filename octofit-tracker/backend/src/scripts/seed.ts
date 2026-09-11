import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya-chen', email: 'maya@example.com', displayName: 'Maya Chen', goal: 'Build endurance' },
      { username: 'leo-martin', email: 'leo@example.com', displayName: 'Leo Martin', goal: 'Increase strength' },
      { username: 'sofia-rivera', email: 'sofia@example.com', displayName: 'Sofia Rivera', goal: 'Improve mobility' },
    ]);

    const teams = await Team.create([
      { name: 'Summit Seekers', description: 'Consistent training for ambitious goals', members: [users[0]._id, users[1]._id] },
      { name: 'Morning Motion', description: 'Short workouts that start the day well', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, team: teams[0]._id, type: 'Run', durationMinutes: 35, calories: 320, completedAt: new Date('2026-09-08') },
      { user: users[1]._id, team: teams[0]._id, type: 'Strength', durationMinutes: 45, calories: 410, completedAt: new Date('2026-09-09') },
      { user: users[2]._id, team: teams[1]._id, type: 'Yoga', durationMinutes: 25, calories: 140, completedAt: new Date('2026-09-10') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 1240, rank: 1, streakDays: 12 },
      { user: users[1]._id, team: teams[0]._id, points: 980, rank: 2, streakDays: 8 },
      { user: users[2]._id, team: teams[1]._id, points: 760, rank: 3, streakDays: 6 },
    ]);

    await Workout.create([
      { title: 'Steady State Run', category: 'Cardio', difficulty: 'beginner', durationMinutes: 30, target: 'Endurance', equipment: [] },
      { title: 'Full Body Foundation', category: 'Strength', difficulty: 'intermediate', durationMinutes: 40, target: 'Strength', equipment: ['Dumbbells'] },
      { title: 'Reset and Restore', category: 'Mobility', difficulty: 'beginner', durationMinutes: 20, target: 'Flexibility', equipment: ['Yoga mat'] },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
