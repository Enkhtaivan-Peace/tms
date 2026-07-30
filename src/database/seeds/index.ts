import { AppDataSource } from '../data-source';

import { seedWorkTypes } from './work-type.seed';

async function runSeed() {
  await AppDataSource.initialize();

  console.log('Database connected');

  await seedWorkTypes(AppDataSource);

  console.log('Seed completed');

  await AppDataSource.destroy();
}

runSeed();
