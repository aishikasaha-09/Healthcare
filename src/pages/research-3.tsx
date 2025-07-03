import React from 'react';

const Research3 = () => {
  const [step, setStep] = React.useState(0);
  const steps = [
    'Early diagnosis is key: New tools help identify ASD sooner.',
    'Therapies are becoming more personalized for each individual.',
    'Support networks and education improve outcomes for families.',
    'Ongoing research is making a difference every year.'
  ];
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Understanding Autism Spectrum Disorders</h1>
      <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Autism research" className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" />
      <p className="text-lg text-gray-800 mb-4">New diagnostic tools and therapies are improving the lives of individuals with Autism Spectrum Disorders (ASD). Early intervention, personalized support, and ongoing research are helping more people reach their full potential.</p>
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">Explore ASD Progress</h2>
        <div className="mb-2 text-gray-700">{steps[step]}</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous</button>
          <button className="px-3 py-1 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors" onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}>Next</button>
        </div>
        <div className="mt-2 text-sm text-gray-500">Step {step + 1} of {steps.length}</div>
      </div>
      <p className="text-lg text-gray-800">Awareness and support are growing, making a real difference for individuals and families affected by ASD.</p>
    </div>
  );
};

export default Research3;
