// Utility function to reset the app state for testing
export const resetAppState = () => {
  localStorage.removeItem('wellness_trial_data');
  localStorage.removeItem('monthly_challenge_progress');
  localStorage.removeItem('isPremium');
  localStorage.removeItem('isSubscribed');
  localStorage.removeItem('last_trial_alert');
  
  console.log('App state reset! Please refresh the page.');
};

// Uncomment to use: resetAppState();