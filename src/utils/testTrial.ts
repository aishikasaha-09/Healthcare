// Simple test utility to verify trial functionality
import { initializeTrial, updateChallengeProgress, getTrialStatus, resetTrial } from './trialManager';

export const testTrialFlow = () => {
  console.log('Testing Trial Flow...');
  
  // Reset trial
  resetTrial();
  
  // Initialize trial
  const trial = initializeTrial();
  console.log('Initial trial:', trial);
  
  // Simulate completing 1 day
  const trial1 = updateChallengeProgress(1);
  console.log('After 1 day:', trial1);
  
  // Simulate completing 2 days
  const trial2 = updateChallengeProgress(2);
  console.log('After 2 days:', trial2);
  
  // Simulate completing 3 days (trial should expire)
  const trial3 = updateChallengeProgress(3);
  console.log('After 3 days:', trial3);
  
  // Simulate completing 4 days (trial should be expired)
  const trial4 = updateChallengeProgress(4);
  console.log('After 4 days:', trial4);
  
  // Get current status
  const currentStatus = getTrialStatus();
  console.log('Current status:', currentStatus);
};

// Uncomment to test
// testTrialFlow();