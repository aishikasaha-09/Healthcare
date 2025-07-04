// Trial Management Utilities
export interface TrialData {
  startDate: string;
  isActive: boolean;
  hasExpired: boolean;
  daysRemaining: number;
  challengeDaysUsed: number;
}

const TRIAL_DURATION_DAYS = 3;
const TRIAL_KEY = 'wellness_trial_data';

export const initializeTrial = (): TrialData => {
  const existingTrial = localStorage.getItem(TRIAL_KEY);
  
  if (existingTrial) {
    return JSON.parse(existingTrial);
  }

  const newTrial: TrialData = {
    startDate: new Date().toISOString(),
    isActive: true,
    hasExpired: false,
    daysRemaining: TRIAL_DURATION_DAYS,
    challengeDaysUsed: 0
  };

  localStorage.setItem(TRIAL_KEY, JSON.stringify(newTrial));
  return newTrial;
};

export const updateTrialStatus = (): TrialData => {
  const trialData = initializeTrial();
  const startDate = new Date(trialData.startDate);
  const currentDate = new Date();
  const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const updatedTrial: TrialData = {
    ...trialData,
    daysRemaining: Math.max(0, TRIAL_DURATION_DAYS - (trialData.challengeDaysUsed || 0)),
    hasExpired: (trialData.challengeDaysUsed || 0) >= TRIAL_DURATION_DAYS,
    isActive: (trialData.challengeDaysUsed || 0) < TRIAL_DURATION_DAYS,
    challengeDaysUsed: trialData.challengeDaysUsed || 0
  };

  localStorage.setItem(TRIAL_KEY, JSON.stringify(updatedTrial));
  return updatedTrial;
};

export const getTrialStatus = (): TrialData => {
  return updateTrialStatus();
};

export const updateChallengeProgress = (completedDays: number): TrialData => {
  const trialData = getTrialStatus();
  // Lock after 4 completions (trial expires after 4th day)
  const updatedTrial: TrialData = {
    ...trialData,
    challengeDaysUsed: completedDays,
    daysRemaining: Math.max(0, TRIAL_DURATION_DAYS - completedDays),
    hasExpired: completedDays >= 4,
    isActive: completedDays < 4
  };
  localStorage.setItem(TRIAL_KEY, JSON.stringify(updatedTrial));
  return updatedTrial;
};

export const resetTrial = (): void => {
  localStorage.removeItem(TRIAL_KEY);
};