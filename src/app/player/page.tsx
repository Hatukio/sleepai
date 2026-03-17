"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Play, Pause, Volume2, Download, BookOpen, RotateCcw } from "lucide-react";

export default function PlayerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showScript, setShowScript] = useState(false);
  const [script, setScript] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);

  // 加载故事数据
  useEffect(() => {
    if (!storyId) {
      router.push("/");
      return;
    }

    // 模拟加载数据（实际应该从 API 获取）
    setTimeout(() => {
      // 这里应该调用 API 获取故事详情
      // const response = await fetch(`/api/stories/${storyId}`);
      // const data = await response.json();

      // 使用 localStorage 获取生成的脚本
      const storedStory = localStorage.getItem(`story-${storyId}`);
      if (storedStory) {
        const story = JSON.parse(storedStory);
        setScript(story.script);
        setAudioUrl(story.audioUrl);
        setDuration(story.duration);
      } else {
        // 默认模拟数据
        setScript("这是你的专属催眠故事...（测试模式）");
        setAudioUrl("/audio/mock.mp3");
        setDuration(600);
      }
      setLoading(false);
    }, 500);
  }, [storyId, router]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setVolume(vol);
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = `hypnosis-${storyId}.mp3`;
      link.click();
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-all"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-dark to-primary text-foreground px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">你的专属催眠故事</h1>
          <p className="text-gray-400">放松身心，进入梦乡</p>
        </div>

        {/* Script Preview */}
        <div className="mb-8">
          <button
            onClick={() => setShowScript(!showScript)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-surface rounded-lg text-white hover:bg-primary-light transition-all"
          >
            <BookOpen className="w-5 h-5" />
            {showScript ? "隐藏脚本" : "查看脚本"}
          </button>

          {showScript && (
            <div className="mt-4 p-6 bg-surface rounded-lg">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {script}
              </p>
            </div>
          )}
        </div>

        {/* Audio Player */}
        <div className="bg-surface rounded-2xl p-8">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Play Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-secondary hover:bg-secondary-light rounded-full flex items-center justify-center transition-all hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-primary-dark rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-primary-dark rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReplay}
              className="flex-1 py-3 bg-primary-dark hover:bg-primary-light text-white rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              重播
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-3 bg-primary-dark hover:bg-primary-light text-white rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              下载
            </button>
          </div>
        </div>

        {/* Feedback Prompt */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            听完了吗？请给我们反馈，帮助我们改进
          </p>
          <button
            onClick={() => router.push(`/feedback?storyId=${storyId}`)}
            className="px-8 py-3 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-lg transition-all"
          >
            填写反馈
          </button>
        </div>
      </div>
    </main>
  );
}
