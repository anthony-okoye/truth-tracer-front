export type TVerificationStatus =
  | "True"
  | "False"
  | "Misleading"
  | "Unverified";

export interface IFactResult {
  id?: string;
  claim?: string;
  factCheck?: {
    verdict?: string;
    explanation?: string;
    sources?: {
      title?: string;
      url?: string;
      reliability?: string;
    }[];
  };
  trustChain?: {
    hasTrustChain?: boolean;
    confidence?: number;
    sources?: {
      name?: string;
      url?: string;
      reliability?: number;
    }[];
    explanation?: string;
    gaps?: string[];
    context?: string;
  };
  socratic?: {
    reasoningSteps?: {
      question?: string;
      analysis?: string;
      evidence?: string;
      implications?: string;
    }[];
    conclusion?: {
      logicalValidity?: string;
      keyFlaws?: string[];
      strengths?: string[];
      recommendations?: string;
    };
  };
  status?: {
    factCheck?: string;
    trustChain?: string;
    socratic?: string;
    timestamp?: string;
  };
}