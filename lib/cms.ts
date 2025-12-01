import { clubsData } from '../data/clubs';
import { featuresData } from '../data/features';
import { Club, FeatureItem } from '../types';

// Simulate a Headless CMS API Delay
const DELAY = 800;

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
    }, DELAY - 200); // Features might load slightly faster
  });
};