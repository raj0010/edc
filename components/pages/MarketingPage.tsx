import React from 'react';
import { ClubDashboard } from '../ui/ClubDashboard';
import { Club } from '../../types';

interface Props {
  club: Club;
  onBack: () => void;
  onJoin: () => void;
}

export const MarketingPage: React.FC<Props> = ({ club, onBack, onJoin }) => {
  return <ClubDashboard club={club} onBack={onBack} onJoin={onJoin} />;
};