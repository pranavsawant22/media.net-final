interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground" data-testid="text-step-counter">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-muted-foreground" data-testid="text-progress-percentage">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full progress-bar" 
          style={{ width: `${progressPercentage}%` }}
          data-testid="progress-bar"
        />
      </div>
    </div>
  );
}
