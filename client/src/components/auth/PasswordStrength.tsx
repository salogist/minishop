import { motion } from 'framer-motion';

interface Requirement {
  met: boolean;
  text: string;
}

interface PasswordStrengthProps {
  password: string;
}

const STRENGTH_LEVELS = ['بسیار ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'] as const;
const STRENGTH_COLORS = ['red', 'orange', 'yellow', 'blue', 'green'] as const;

const PASSWORD_REQUIREMENTS = [
  {
    check: (pwd: string) => pwd.length >= 8,
    text: 'حداقل ۸ کاراکتر',
  },
  {
    check: (pwd: string) => /[A-Z]/.test(pwd),
    text: 'حداقل یک حرف بزرگ انگلیسی',
  },
  {
    check: (pwd: string) => /[a-z]/.test(pwd),
    text: 'حداقل یک حرف کوچک انگلیسی',
  },
  {
    check: (pwd: string) => /[0-9]/.test(pwd),
    text: 'حداقل یک عدد',
  },
  {
    check: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    text: 'حداقل یک کاراکتر خاص (!@#$%^&*)',
  },
] as const;

const checkPasswordStrength = (password: string): {
  score: number;
  requirements: Requirement[];
} => {
  const requirements = PASSWORD_REQUIREMENTS.map(req => ({
    met: req.check(password),
    text: req.text,
  }));

  return {
    score: requirements.filter(req => req.met).length,
    requirements,
  };
};

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const { score, requirements } = checkPasswordStrength(password);
  const strengthColor = score > 0 ? STRENGTH_COLORS[score - 1] : 'gray';
  const strengthText = score > 0 ? STRENGTH_LEVELS[score - 1] : 'وارد نشده';

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
          {score > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / 5) * 100}%` }}
              className={`h-full bg-${strengthColor}-500`}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
        <span className={`text-sm font-medium text-${strengthColor}-500`}>
          {strengthText}
        </span>
      </div>
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center ${
              req.met ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {req.met ? '✓' : '×'}
            </span>
            <span className={req.met ? 'text-green-700' : 'text-gray-500'}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const isPasswordValid = (password: string): boolean => {
  const { score } = checkPasswordStrength(password);
  return score >= 3;
}; 