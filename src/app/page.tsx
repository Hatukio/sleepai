"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sparkles } from "lucide-react";

type Stressor = "work" | "emotion" | "health" | "money" | "other";

interface Questionnaire {
  occupation: string;
  stressors: Stressor[];
  scene: "forest" | "ocean" | "starry" | "hometown";
  voiceStyle: "female" | "male";
  duration: 5 | 10 | 20;
}

const stressorOptions: { id: Stressor; label: string }[] = [
  { id: "work", label: "工作压力" },
  { id: "emotion", label: "情感问题" },
  { id: "health", label: "健康焦虑" },
  { id: "money", label: "经济压力" },
  { id: "other", label: "其他" },
];

const sceneOptions = [
  { id: "forest", label: "宁静的森林", emoji: "🌲" },
  { id: "ocean", label: "温柔的海浪", emoji: "🌊" },
  { id: "starry", label: "浩瀚的星空", emoji: "✨" },
  { id: "hometown", label: "童年的老家", emoji: "🏠" },
];

const voiceStyleOptions = [
  { id: "female", label: "温柔的女声", emoji: "👩" },
  { id: "male", label: "沉稳的男声", emoji: "👨" },
];

const durationOptions: { id: 5 | 10 | 20; label: string }[] = [
  { id: 5, label: "5分钟快速入睡" },
  { id: 10, label: "10分钟标准时长" },
  { id: 20, label: "20分钟深度放松" },
];

export default function Home() {
  const router = useRouter();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
    occupation: "",
    stressors: [],
    scene: "forest",
    voiceStyle: "female",
    duration: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleStressor = (id: Stressor) => {
    setQuestionnaire((prev) => ({
      ...prev,
      stressors: prev.stressors.includes(id)
        ? prev.stressors.filter((s) => s !== id)
        : [...prev.stressors, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionnaire.occupation.trim()) {
      alert("请填写你的职业");
      return;
    }

    if (questionnaire.stressors.length === 0) {
      alert("请选择至少一个压力源");
      return;
    }

    setIsLoading(true);

    try {
      // 调用 API 生成催眠故事
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionnaire),
      });

      if (!response.ok) {
        throw new Error("生成失败");
      }

      const data = await response.json();

      // 保存到 localStorage，让播放器可以读取
      localStorage.setItem(`story-${data.id}`, JSON.stringify({
        script: data.script,
        audioUrl: data.audioUrl,
        duration: data.duration,
      }));

      router.push(`/player?id=${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("生成失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-dark to-primary text-foreground px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-full mb-6">
            <Moon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">SleepAI</h1>
          <p className="text-lg text-gray-300">
            告诉我你的故事，我为你定制专属催眠音频
          </p>
        </div>

        {/* Questionnaire Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Q1: Occupation */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              你是做什么工作的？
            </label>
            <input
              type="text"
              value={questionnaire.occupation}
              onChange={(e) =>
                setQuestionnaire({ ...questionnaire, occupation: e.target.value })
              }
              placeholder="例如：程序员、教师、医生..."
              className="w-full px-4 py-3 bg-primary-dark border border-primary-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Q2: Stressors */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              最近让你压力最大的是什么？（可多选）
            </label>
            <div className="grid grid-cols-2 gap-3">
              {stressorOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleStressor(option.id)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    questionnaire.stressors.includes(option.id)
                      ? "border-secondary bg-secondary/20 text-white"
                      : "border-primary-light bg-primary-dark text-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Scene */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              你喜欢什么场景？
            </label>
            <div className="grid grid-cols-2 gap-3">
              {sceneOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setQuestionnaire({
                      ...questionnaire,
                      scene: option.id as any,
                    })
                  }
                  className={`px-4 py-4 rounded-lg border-2 transition-all ${
                    questionnaire.scene === option.id
                      ? "border-secondary bg-secondary/20 text-white"
                      : "border-primary-light bg-primary-dark text-gray-400"
                  }`}
                >
                  <div className="text-3xl mb-2">{option.emoji}</div>
                  <div>{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Q4: Voice Style */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              你喜欢什么样的声音？
            </label>
            <div className="grid grid-cols-2 gap-3">
              {voiceStyleOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setQuestionnaire({
                      ...questionnaire,
                      voiceStyle: option.id as any,
                    })
                  }
                  className={`px-4 py-4 rounded-lg border-2 transition-all ${
                    questionnaire.voiceStyle === option.id
                      ? "border-secondary bg-secondary/20 text-white"
                      : "border-primary-light bg-primary-dark text-gray-400"
                  }`}
                >
                  <div className="text-3xl mb-2">{option.emoji}</div>
                  <div>{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Q5: Duration */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              你希望在多久内入睡？
            </label>
            <div className="space-y-3">
              {durationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setQuestionnaire({
                      ...questionnaire,
                      duration: option.id,
                    })
                  }
                  className={`w-full px-4 py-4 rounded-lg border-2 transition-all text-left ${
                    questionnaire.duration === option.id
                      ? "border-secondary bg-secondary/20 text-white"
                      : "border-primary-light bg-primary-dark text-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                生成我的催眠故事
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>免费试用 · 无需注册 · 仅供测试</p>
        </div>
      </div>
    </main>
  );
}
