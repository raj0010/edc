import { clubsData } from './data/clubs';
import { featuresData } from './data/features';
import { Club, FeatureItem } from '../types';

// Simulate a Headless CMS API Delay
// Reduced from 800ms to 100ms for faster load
const DELAY = 100;

export const getClubs = (): Promise<Club[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clubsData);
    }, DELAY);
  });
};

export const getFeatures = (): Promise<FeatureItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(featuresData);
    }, DELAY); // Removed the arbitrary offset
  });
};