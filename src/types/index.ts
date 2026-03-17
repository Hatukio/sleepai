// 用户问卷数据
export interface UserQuestionnaire {
  occupation: string;
  stressors: string[];
  scene: "forest" | "ocean" | "starry" | "hometown";
  voiceStyle: "female" | "male";
  duration: 5 | 10 | 20;
}

// 催眠故事
export interface HypnosisStory {
  id: string;
  userId: string;
  occupation: string;
  stressors: string;
  scene: string;
  voiceStyle: string;
  duration: number;
  script: string;
  audioUrl: string;
  audioLength: number;
  createdAt: Date;
  updatedAt: Date;
}

// 使用记录
export interface UsageRecord {
  id: string;
  storyId: string;
  startTime: Date;
  endTime: Date | null;
  completed: boolean;
}

// 反馈
export interface Feedback {
  id: string;
  storyId: string;
  rating: number;
  completed: string;
  likes?: string;
  dislikes?: string;
  willingness: string;
  moreFeatures?: string;
  createdAt: Date;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
