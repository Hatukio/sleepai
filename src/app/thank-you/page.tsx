"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Home, Share2 } from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-dark to-primary text-foreground px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary/20 rounded-full mb-6">
            <CheckCircle2 className="w-16 h-16 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">感谢你的反馈！</h1>
          <p className="text-lg text-gray-300">
            你的意见对我们非常重要，我们会认真听取每一条建议
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-surface rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">接下来</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-2xl">😴</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">好好休息</h3>
                <p className="text-gray-400">希望今晚能有一个好的睡眠</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">持续改进</h3>
                <p className="text-gray-400">我们会根据反馈优化产品体验</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">未来福利</h3>
                <p className="text-gray-400">产品正式上线时，我们会给早期测试用户提供优惠</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/")}
            className="w-full py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            返回首页，再试一次
          </button>

          <button
            onClick={() => {
              // 复制当前页面链接
              navigator.clipboard.writeText(window.location.href);
              alert("链接已复制，可以分享给朋友了！");
            }}
            className="w-full py-4 bg-primary-dark hover:bg-primary-light text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            分享给朋友
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>免费试用 · 无需注册 · 仅供测试</p>
          <p className="mt-2">
            有问题或建议？联系我们：<span className="text-secondary">help@sleepai.com</span>
          </p>
        </div>
      </div>
    </main>
  );
}
