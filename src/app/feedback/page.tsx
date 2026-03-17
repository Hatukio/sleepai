"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, Check, Send } from "lucide-react";

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const [rating, setRating] = useState(0);
  const [completed, setCompleted] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [willingness, setWillingness] = useState("");
  const [moreFeatures, setMoreFeatures] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("请选择评分");
      return;
    }

    if (!completed) {
      alert("请选择你是否听完了音频");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyId,
          rating,
          completed,
          likes,
          dislikes,
          willingness,
          moreFeatures,
        }),
      });

      if (!response.ok) {
        throw new Error("提交失败");
      }

      // 显示感谢页面
      router.push("/thank-you");
    } catch (error) {
      console.error("Error:", error);
      alert("提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completedOptions = [
    { id: "full", label: "完整听完" },
    { id: "half", label: "听了一半" },
    { id: "short", label: "听了几分钟就关了" },
  ];

  const willingnessOptions = [
    { id: "no", label: "不愿意付费" },
    { id: "5", label: "5元/月" },
    { id: "15", label: "15元/月" },
    { id: "30", label: "30元/月" },
    { id: "50", label: "50元/月或更多" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-dark to-primary text-foreground px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">感谢你的使用</h1>
          <p className="text-lg text-gray-300">
            你的反馈能帮助我们改进，让更多人拥有好睡眠
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Q1: Rating */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-4">
              1. 这个催眠故事对你有帮助吗？
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>完全没用</span>
              <span>非常有帮助</span>
            </div>
          </div>

          {/* Q2: Completion */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-4">
              2. 你听完了整个音频吗？
            </label>
            <div className="space-y-3">
              {completedOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setCompleted(option.id)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    completed === option.id
                      ? "border-secondary bg-secondary/20 text-white"
                      : "border-primary-light bg-primary-dark text-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Likes */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              3. 你最喜欢的地方是什么？
            </label>
            <textarea
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              placeholder="例如：声音很温柔、场景描述很生动..."
              rows={4}
              className="w-full px-4 py-3 bg-primary-dark border border-primary-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
            />
          </div>

          {/* Q4: Dislikes */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              4. 你不喜欢的地方是什么？
            </label>
            <textarea
              value={dislikes}
              onChange={(e) => setDislikes(e.target.value)}
              placeholder="例如：节奏有点慢、某个场景不喜欢..."
              rows={4}
              className="w-full px-4 py-3 bg-primary-dark border border-primary-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
            />
          </div>

          {/* Q5: Willingness */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-4">
              5. 如果这个功能付费，你愿意支付多少钱？
            </label>
            <div className="grid grid-cols-1 gap-3">
              {willingnessOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setWillingness(option.id)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    willingness === option.id
                      ? "border-secondary bg-secondary/20 text-white"
                      : "border-primary-light bg-primary-dark text-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q6: More Features */}
          <div className="bg-surface rounded-2xl p-6">
            <label className="block text-lg font-semibold text-white mb-3">
              6. 你还想要什么功能？
            </label>
            <textarea
              value={moreFeatures}
              onChange={(e) => setMoreFeatures(e.target.value)}
              placeholder="例如：白天放松练习、睡眠数据分析、定制闹钟..."
              rows={4}
              className="w-full px-4 py-3 bg-primary-dark border border-primary-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                提交中...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                提交反馈
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>你的反馈对我们非常重要，谢谢！</p>
        </div>
      </div>
    </main>
  );
}
