'use client'

import React, { useState, useEffect } from 'react';

// 공항에서 쓰이는 히라가나 단어 100개
const airportWords = [
  // 공항 기본 (12개)
  { word: 'くうこう', meaning: '공항' },
  { word: 'ひこうき', meaning: '비행기' },
  { word: 'たーみなる', meaning: '터미널' },
  { word: 'ろびー', meaning: '로비' },
  { word: 'げーと', meaning: '게이트' },
  { word: 'かうんたー', meaning: '카운터' },
  { word: 'きゃびん', meaning: '객실' },
  { word: 'しーと', meaning: '좌석' },
  { word: 'まどがわ', meaning: '창가' },
  { word: 'つうろがわ', meaning: '통로 쪽' },
  { word: 'かいだん', meaning: '계단' },
  { word: 'えれべーたー', meaning: '엘리베이터' },

  // 이동 & 시간 (12개)
  { word: 'しゅっぱつ', meaning: '출발' },
  { word: 'とうちゃく', meaning: '도착' },
  { word: 'じかん', meaning: '시간' },
  { word: 'ちこく', meaning: '지각' },
  { word: 'おくれ', meaning: '지연' },
  { word: 'きゅうこう', meaning: '급행' },
  { word: 'とまり', meaning: '정지' },
  { word: 'てんこう', meaning: '환승' },
  { word: 'はやい', meaning: '빠른' },
  { word: 'おそい', meaning: '늦은' },
  { word: 'きゅうきゅう', meaning: '급행' },
  { word: 'ていじ', meaning: '정시' },

  // 수속 & 서류 (12개)
  { word: 'けんさ', meaning: '검사' },
  { word: 'てにもつ', meaning: '수하물' },
  { word: 'きっぷ', meaning: '표' },
  { word: 'よやく', meaning: '예약' },
  { word: 'ちけっと', meaning: '티켓' },
  { word: 'てつづき', meaning: '수속' },
  { word: 'かくにん', meaning: '확인' },
  { word: 'ばんごう', meaning: '번호' },
  { word: 'ぱすぽーと', meaning: '여권' },
  { word: 'びざ', meaning: '비자' },
  { word: 'にゅうこく', meaning: '입국' },
  { word: 'しゅっこく', meaning: '출국' },

  // 안전 & 주의 (10개)
  { word: 'あんぜん', meaning: '안전' },
  { word: 'きけん', meaning: '위험' },
  { word: 'きんし', meaning: '금지' },
  { word: 'けいこく', meaning: '경고' },
  { word: 'ちゅうい', meaning: '주의' },
  { word: 'きゅうきゅう', meaning: '응급' },
  { word: 'びょういん', meaning: '병원' },
  { word: 'くすり', meaning: '약' },
  { word: 'けが', meaning: '부상' },
  { word: 'ひじょうぐち', meaning: '비상구' },

  // 장소 & 방향 (10개)
  { word: 'でぐち', meaning: '출구' },
  { word: 'いりぐち', meaning: '입구' },
  { word: 'となり', meaning: '옆' },
  { word: 'まえ', meaning: '앞' },
  { word: 'うしろ', meaning: '뒤' },
  { word: 'みぎ', meaning: '오른쪽' },
  { word: 'ひだり', meaning: '왼쪽' },
  { word: 'うえ', meaning: '위' },
  { word: 'した', meaning: '아래' },
  { word: 'なか', meaning: '안' },

  // 서비스 & 소통 (8개)
  { word: 'れんらく', meaning: '연락' },
  { word: 'あんない', meaning: '안내' },
  { word: 'しつもん', meaning: '질문' },
  { word: 'たすけ', meaning: '도움' },
  { word: 'でんわ', meaning: '전화' },
  { word: 'いんたーねっと', meaning: '인터넷' },
  { word: 'つうやく', meaning: '통역' },
  { word: 'ほんやく', meaning: '번역' },

  // 편의시설 (10개)
  { word: 'かふぇ', meaning: '카페' },
  { word: 'れすとらん', meaning: '레스토랑' },
  { word: 'みせ', meaning: '가게' },
  { word: 'おみやげ', meaning: '선물' },
  { word: 'かいもの', meaning: '쇼핑' },
  { word: 'ぎんこう', meaning: '은행' },
  { word: 'りょうがえ', meaning: '환전' },
  { word: 'といれ', meaning: '화장실' },
  { word: 'きっさてん', meaning: '다방' },
  { word: 'ほてる', meaning: '호텔' },

  // 교통수단 (8개)
  { word: 'でんしゃ', meaning: '전차' },
  { word: 'ばす', meaning: '버스' },
  { word: 'たくしー', meaning: '택시' },
  { word: 'ちかてつ', meaning: '지하철' },
  { word: 'しんかんせん', meaning: '신칸센' },
  { word: 'ふね', meaning: '배' },
  { word: 'じてんしゃ', meaning: '자전거' },
  { word: 'あるき', meaning: '걷기' },

  // 음식 & 음료 (8개)
  { word: 'みず', meaning: '물' },
  { word: 'おちゃ', meaning: '차' },
  { word: 'こーひー', meaning: '커피' },
  { word: 'おさけ', meaning: '술' },
  { word: 'べんとう', meaning: '도시락' },
  { word: 'おにぎり', meaning: '주먹밥' },
  { word: 'すし', meaning: '초밥' },
  { word: 'らーめん', meaning: '라면' },

  // 날씨 & 시간 (6개)
  { word: 'てんき', meaning: '날씨' },
  { word: 'あめ', meaning: '비' },
  { word: 'ゆき', meaning: '눈' },
  { word: 'あさ', meaning: '아침' },
  { word: 'ひる', meaning: '낮' },
  { word: 'よる', meaning: '밤' },

  // 상태 & 감정 (6개)
  { word: 'つかれた', meaning: '피곤한' },
  { word: 'げんき', meaning: '건강한' },
  { word: 'いそがしい', meaning: '바쁜' },
  { word: 'うれしい', meaning: '기쁜' },
  { word: 'しんぱい', meaning: '걱정' },
  { word: 'だいじょうぶ', meaning: '괜찮은' },

  // 기타 필수 (8개)
  { word: 'おかね', meaning: '돈' },
  { word: 'かばん', meaning: '가방' },
  { word: 'かぎ', meaning: '열쇠' },
  { word: 'けいたい', meaning: '휴대폰' },
  { word: 'かめら', meaning: '카메라' },
  { word: 'ちず', meaning: '지도' },
  { word: 'くに', meaning: '나라' },
  { word: 'ことば', meaning: '언어' }
];

interface AirportHiraganaWordQuizProps {
  onGoHome: () => void;
}

export const AirportHiraganaWordQuiz: React.FC<AirportHiraganaWordQuizProps> = ({ onGoHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof airportWords>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<typeof airportWords>([]);
  const [isRetryRound, setIsRetryRound] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);

  // 문제 섞기
  const shuffleQuestions = (questions: typeof airportWords = airportWords) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 p-4">
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
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {score}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-2xl">✈️</span>
            <h1 className="text-xl font-bold text-blue-700">공항 히라가나 퀴즈</h1>
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
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  라운드 {roundNumber}
                  <span className="text-blue-600 text-xs">(100문제)</span>
                </span>
              )}
            </span>
          </div>
        </div>

        {/* 퀴즈 카드 */}
        <div className="bg-white rounded-lg shadow-lg border border-blue-200 mb-6">
          <div className="p-6 text-center">
            <h2 className="text-sm text-gray-600 mb-4">
              다음 공항 용어의 뜻을 한글로 입력하세요
            </h2>
            
            {/* 히라가나 단어 표시 */}
            <div className="text-6xl font-bold text-center py-8 bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
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
                  className="w-full text-center text-lg h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  : 'bg-gradient-to-r from-blue-500 to-sky-500'
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

        {/* 공항 관련 팁 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 text-lg leading-none">🛂</div>
            <div>
              <h4 className="text-blue-800 font-semibold mb-1">공항 여행 팁</h4>
              <p className="text-blue-700 text-sm">
                일본 공항과 여행에서 자주 쓰이는 100개 기본 용어들을 익혀두면 여행이 한결 수월해집니다!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};