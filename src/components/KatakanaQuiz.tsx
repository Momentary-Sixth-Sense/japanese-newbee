'use client'

import React, { useState, useEffect } from 'react';

// 가타카나 데이터 (기본 46문자)
const katakanaData = [
  { katakana: 'ア', pronunciation: '아' },
  { katakana: 'イ', pronunciation: '이' },
  { katakana: 'ウ', pronunciation: '우' },
  { katakana: 'エ', pronunciation: '에' },
  { katakana: 'オ', pronunciation: '오' },
  { katakana: 'カ', pronunciation: '카' },
  { katakana: 'キ', pronunciation: '키' },
  { katakana: 'ク', pronunciation: '쿠' },
  { katakana: 'ケ', pronunciation: '케' },
  { katakana: 'コ', pronunciation: '코' },
  { katakana: 'サ', pronunciation: '사' },
  { katakana: 'シ', pronunciation: '시' },
  { katakana: 'ス', pronunciation: '스' },
  { katakana: 'セ', pronunciation: '세' },
  { katakana: 'ソ', pronunciation: '소' },
  { katakana: 'タ', pronunciation: '타' },
  { katakana: 'チ', pronunciation: '치' },
  { katakana: 'ツ', pronunciation: '츠' },
  { katakana: 'テ', pronunciation: '테' },
  { katakana: 'ト', pronunciation: '토' },
  { katakana: 'ナ', pronunciation: '나' },
  { katakana: 'ニ', pronunciation: '니' },
  { katakana: 'ヌ', pronunciation: '누' },
  { katakana: 'ネ', pronunciation: '네' },
  { katakana: 'ノ', pronunciation: '노' },
  { katakana: 'ハ', pronunciation: '하' },
  { katakana: 'ヒ', pronunciation: '히' },
  { katakana: 'フ', pronunciation: '후' },
  { katakana: 'ヘ', pronunciation: '헤' },
  { katakana: 'ホ', pronunciation: '호' },
  { katakana: 'マ', pronunciation: '마' },
  { katakana: 'ミ', pronunciation: '미' },
  { katakana: 'ム', pronunciation: '무' },
  { katakana: 'メ', pronunciation: '메' },
  { katakana: 'モ', pronunciation: '모' },
  { katakana: 'ヤ', pronunciation: '야' },
  { katakana: 'ユ', pronunciation: '유' },
  { katakana: 'ヨ', pronunciation: '요' },
  { katakana: 'ラ', pronunciation: '라' },
  { katakana: 'リ', pronunciation: '리' },
  { katakana: 'ル', pronunciation: '루' },
  { katakana: 'レ', pronunciation: '레' },
  { katakana: 'ロ', pronunciation: '로' },
  { katakana: 'ワ', pronunciation: '와' },
  { katakana: 'ヲ', pronunciation: '오' },
  { katakana: 'ン', pronunciation: '은' },
];

interface KatakanaQuizProps {
  onGoHome: () => void;
}

export const KatakanaQuiz: React.FC<KatakanaQuizProps> = ({ onGoHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof katakanaData>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // 문제 섞기
  const shuffleQuestions = () => {
    const shuffled = [...katakanaData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setTotalQuestions(0);
  };

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const currentKatakana = shuffledQuestions[currentQuestion];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const correct = userAnswer.trim() === currentKatakana.pronunciation;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTotalQuestions(totalQuestions + 1);

    // 1.5초 후 다음 문제로
    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(null);
      setUserAnswer('');
      
      // 다음 문제로 이동 (마지막 문제면 다시 섞기)
      if (currentQuestion + 1 >= shuffledQuestions.length) {
        shuffleQuestions();
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1500);
  };

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  if (!currentKatakana) {
    return <div className="flex justify-center items-center h-64">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onGoHome}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            메뉴로
          </button>
          
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              정답률: {accuracy}%
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {score}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* 퀴즈 카드 */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
          <div className="p-6 text-center">
            <h2 className="text-sm text-gray-600 mb-4">
              다음 가타카나의 발음을 한글로 입력하세요
            </h2>
            
            {/* 가타카나 표시 */}
            <div className="text-8xl font-bold text-center py-8 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
              {currentKatakana.katakana}
            </div>
          </div>
          
          <div className="p-6 pt-0">
            {!showFeedback ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="발음을 한글로 입력하세요"
                  className="w-full text-center text-lg h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!userAnswer.trim()}
                >
                  확인
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {isCorrect ? (
                    <div className="w-16 h-16 text-green-500 text-6xl">✅</div>
                  ) : (
                    <div className="w-16 h-16 text-red-500 text-6xl">❌</div>
                  )}
                </div>
                
                <div className="text-lg">
                  {isCorrect ? (
                    <p className="text-green-600">정답입니다! 🎉</p>
                  ) : (
                    <div className="text-red-600">
                      <p>틀렸습니다 😅</p>
                      <p className="text-sm mt-2">
                        정답: <span className="font-semibold">{currentKatakana.pronunciation}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">진행 상황</span>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} / {shuffledQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};