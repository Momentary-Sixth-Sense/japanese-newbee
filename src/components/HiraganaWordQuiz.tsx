'use client'

import React, { useState, useEffect } from 'react';

// 히라가나 기초 단어 40개
const hiraganaWords = [
  { word: 'あい', meaning: '사랑' },
  { word: 'いえ', meaning: '집' },
  { word: 'うみ', meaning: '바다' },
  { word: 'えき', meaning: '역' },
  { word: 'おかね', meaning: '돈' },
  { word: 'かぞく', meaning: '가족' },
  { word: 'きょう', meaning: '오늘' },
  { word: 'くるま', meaning: '자동차' },
  { word: 'けさ', meaning: '오늘 아침' },
  { word: 'こども', meaning: '아이' },
  { word: 'さかな', meaning: '생선' },
  { word: 'しごと', meaning: '일' },
  { word: 'すし', meaning: '초밥' },
  { word: 'せんせい', meaning: '선생님' },
  { word: 'そら', meaning: '하늘' },
  { word: 'たべもの', meaning: '음식' },
  { word: 'ちち', meaning: '아버지' },
  { word: 'つき', meaning: '달' },
  { word: 'てがみ', meaning: '편지' },
  { word: 'ともだち', meaning: '친구' },
  { word: 'なまえ', meaning: '이름' },
  { word: 'にほん', meaning: '일본' },
  { word: 'ねこ', meaning: '고양이' },
  { word: 'のみもの', meaning: '음료수' },
  { word: 'はな', meaning: '꽃' },
  { word: 'ひと', meaning: '사람' },
  { word: 'ふゆ', meaning: '겨울' },
  { word: 'へや', meaning: '방' },
  { word: 'ほん', meaning: '책' },
  { word: 'まち', meaning: '거리' },
  { word: 'みず', meaning: '물' },
  { word: 'むし', meaning: '벌레' },
  { word: 'めがね', meaning: '안경' },
  { word: 'もり', meaning: '숲' },
  { word: 'やま', meaning: '산' },
  { word: 'ゆき', meaning: '눈' },
  { word: 'よる', meaning: '밤' },
  { word: 'らいねん', meaning: '내년' },
  { word: 'わたし', meaning: '나' },
  { word: 'いぬ', meaning: '개' }
];

interface HiraganaWordQuizProps {
  onGoHome: () => void;
}

export const HiraganaWordQuiz: React.FC<HiraganaWordQuizProps> = ({ onGoHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof hiraganaWords>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<typeof hiraganaWords>([]);
  const [isRetryRound, setIsRetryRound] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);

  // 문제 섞기
  const shuffleQuestions = (questions: typeof hiraganaWords = hiraganaWords) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setWrongQuestions([]);
  };

  // 새 라운드 시작
  const startNewRound = () => {
    setScore(0);
    setTotalQuestions(0);
    setIsRetryRound(false);
    setRoundNumber(1);
    shuffleQuestions();
  };

  // 틀린 문제들로 재시도 라운드 시작
  const startRetryRound = () => {
    if (wrongQuestions.length > 0) {
      setIsRetryRound(true);
      setRoundNumber(roundNumber + 1);
      shuffleQuestions(wrongQuestions);
      setScore(0);
      setTotalQuestions(0);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const currentWord = shuffledQuestions[currentQuestion];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const correct = userAnswer.trim() === currentWord.meaning;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    } else {
      // 틀린 문제를 wrongQuestions에 추가 (중복 제거)
      const isAlreadyWrong = wrongQuestions.some(q => q.word === currentWord.word);
      if (!isAlreadyWrong) {
        setWrongQuestions([...wrongQuestions, currentWord]);
      }
    }
    
    setTotalQuestions(totalQuestions + 1);

    // 1.5초 후 다음 문제로
    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(null);
      setUserAnswer('');
      
      // 다음 문제로 이동
      if (currentQuestion + 1 >= shuffledQuestions.length) {
        // 라운드 완료
        if (wrongQuestions.length > 0 || (!correct && !wrongQuestions.some(q => q.word === currentWord.word))) {
          // 틀린 문제가 있으면 재시도 라운드
          const finalWrongQuestions = correct ? wrongQuestions : 
            wrongQuestions.some(q => q.word === currentWord.word) ? wrongQuestions : 
            [...wrongQuestions, currentWord];
          
          setTimeout(() => {
            setWrongQuestions(finalWrongQuestions);
            if (finalWrongQuestions.length > 0) {
              startRetryRound();
            } else {
              startNewRound();
            }
          }, 1000);
        } else {
          // 모든 문제를 맞췄으면 새 라운드
          setTimeout(() => {
            startNewRound();
          }, 1000);
        }
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1500);
  };

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  if (!currentWord) {
    return <div className="flex justify-center items-center h-64">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
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
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {score}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* 라운드 정보 */}
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm text-gray-600">
              {isRetryRound ? (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  재도전 라운드 {roundNumber} 
                  <span className="text-orange-600 text-xs">({shuffledQuestions.length}문제)</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  라운드 {roundNumber}
                  <span className="text-green-600 text-xs">(40문제)</span>
                </span>
              )}
            </span>
          </div>
        </div>

        {/* 퀴즈 카드 */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
          <div className="p-6 text-center">
            <h2 className="text-sm text-gray-600 mb-4">
              다음 히라가나 단어의 뜻을 한글로 입력하세요
            </h2>
            
            {/* 히라가나 단어 표시 */}
            <div className="text-6xl font-bold text-center py-8 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              {currentWord.word}
            </div>
          </div>
          
          <div className="p-6 pt-0">
            {!showFeedback ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="뜻을 한글로 입력하세요"
                  className="w-full text-center text-lg h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        정답: <span className="font-semibold">{currentWord.meaning}</span>
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        💡 이 문제는 다음 라운드에서 다시 나옵니다
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
              className={`h-2 rounded-full transition-all duration-300 ${
                isRetryRound 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500'
              }`}
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
          
          {/* 틀린 문제 수 표시 */}
          {wrongQuestions.length > 0 && !isRetryRound && (
            <div className="mt-2 text-center">
              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                틀린 문제: {wrongQuestions.length}개 (다음 라운드에서 재도전)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};