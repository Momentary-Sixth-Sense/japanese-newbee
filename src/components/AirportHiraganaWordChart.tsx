'use client'

import React, { useState } from 'react';

// 공항에서 쓰이는 히라가나 단어 100개 (카테고리별로 정리)
const wordCategories = [
  {
    category: '공항 기본',
    words: [
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
      { word: 'えれべーたー', meaning: '엘리베이터' }
    ]
  },
  {
    category: '이동 & 시간',
    words: [
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
      { word: 'ていじ', meaning: '정시' }
    ]
  },
  {
    category: '수속 & 서류',
    words: [
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
      { word: 'しゅっこく', meaning: '출국' }
    ]
  },
  {
    category: '안전 & 주의',
    words: [
      { word: 'あんぜん', meaning: '안전' },
      { word: 'きけん', meaning: '위험' },
      { word: 'きんし', meaning: '금지' },
      { word: 'けいこく', meaning: '경고' },
      { word: 'ちゅうい', meaning: '주의' },
      { word: 'きゅうきゅう', meaning: '응급' },
      { word: 'びょういん', meaning: '병원' },
      { word: 'くすり', meaning: '약' },
      { word: 'けが', meaning: '부상' },
      { word: 'ひじょうぐち', meaning: '비상구' }
    ]
  },
  {
    category: '장소 & 방향',
    words: [
      { word: 'でぐち', meaning: '출구' },
      { word: 'いりぐち', meaning: '입구' },
      { word: 'となり', meaning: '옆' },
      { word: 'まえ', meaning: '앞' },
      { word: 'うしろ', meaning: '뒤' },
      { word: 'みぎ', meaning: '오른쪽' },
      { word: 'ひだり', meaning: '왼쪽' },
      { word: 'うえ', meaning: '위' },
      { word: 'した', meaning: '아래' },
      { word: 'なか', meaning: '안' }
    ]
  },
  {
    category: '서비스 & 소통',
    words: [
      { word: 'れんらく', meaning: '연락' },
      { word: 'あんない', meaning: '안내' },
      { word: 'しつもん', meaning: '질문' },
      { word: 'たすけ', meaning: '도움' },
      { word: 'でんわ', meaning: '전화' },
      { word: 'いんたーねっと', meaning: '인터넷' },
      { word: 'つうやく', meaning: '통역' },
      { word: 'ほんやく', meaning: '번역' }
    ]
  },
  {
    category: '편의시설',
    words: [
      { word: 'かふぇ', meaning: '카페' },
      { word: 'れすとらん', meaning: '레스토랑' },
      { word: 'みせ', meaning: '가게' },
      { word: 'おみやげ', meaning: '선물' },
      { word: 'かいもの', meaning: '쇼핑' },
      { word: 'ぎんこう', meaning: '은행' },
      { word: 'りょうがえ', meaning: '환전' },
      { word: 'といれ', meaning: '화장실' },
      { word: 'きっさてん', meaning: '다방' },
      { word: 'ほてる', meaning: '호텔' }
    ]
  },
  {
    category: '교통수단',
    words: [
      { word: 'でんしゃ', meaning: '전차' },
      { word: 'ばす', meaning: '버스' },
      { word: 'たくしー', meaning: '택시' },
      { word: 'ちかてつ', meaning: '지하철' },
      { word: 'しんかんせん', meaning: '신칸센' },
      { word: 'ふね', meaning: '배' },
      { word: 'じてんしゃ', meaning: '자전거' },
      { word: 'あるき', meaning: '걷기' }
    ]
  },
  {
    category: '음식 & 음료',
    words: [
      { word: 'みず', meaning: '물' },
      { word: 'おちゃ', meaning: '차' },
      { word: 'こーひー', meaning: '커피' },
      { word: 'おさけ', meaning: '술' },
      { word: 'べんとう', meaning: '도시락' },
      { word: 'おにぎり', meaning: '주먹밥' },
      { word: 'すし', meaning: '초밥' },
      { word: 'らーめん', meaning: '라면' }
    ]
  },
  {
    category: '날씨 & 시간',
    words: [
      { word: 'てんき', meaning: '날씨' },
      { word: 'あめ', meaning: '비' },
      { word: 'ゆき', meaning: '눈' },
      { word: 'あさ', meaning: '아침' },
      { word: 'ひる', meaning: '낮' },
      { word: 'よる', meaning: '밤' }
    ]
  },
  {
    category: '상태 & 감정',
    words: [
      { word: 'つかれた', meaning: '피곤한' },
      { word: 'げんき', meaning: '건강한' },
      { word: 'いそがしい', meaning: '바쁜' },
      { word: 'うれしい', meaning: '기쁜' },
      { word: 'しんぱい', meaning: '걱정' },
      { word: 'だいじょうぶ', meaning: '괜찮은' }
    ]
  },
  {
    category: '기타 필수',
    words: [
      { word: 'おかね', meaning: '돈' },
      { word: 'かばん', meaning: '가방' },
      { word: 'かぎ', meaning: '열쇠' },
      { word: 'けいたい', meaning: '휴대폰' },
      { word: 'かめら', meaning: '카메라' },
      { word: 'ちず', meaning: '지도' },
      { word: 'くに', meaning: '나라' },
      { word: 'ことば', meaning: '언어' }
    ]
  }
];

const allWords = wordCategories.flatMap(category => category.words);

interface AirportHiraganaWordChartProps {
  onGoBack: () => void;
}

export const AirportHiraganaWordChart: React.FC<AirportHiraganaWordChartProps> = ({ onGoBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredWords = allWords.filter(word => {
    const matchesSearch = word.word.includes(searchTerm) || word.meaning.includes(searchTerm);
    const matchesCategory = selectedCategory === '전체' || 
      wordCategories.find(cat => cat.category === selectedCategory)?.words.includes(word);
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['전체', ...wordCategories.map(cat => cat.category)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로가기
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-lg leading-none">✈️</div>
            <span className="font-semibold text-gray-800">공항 히라가나 단어표</span>
          </div>
        </div>

        {/* 제목 및 통계 */}
        <div className="bg-white rounded-lg shadow-md border border-blue-200 mb-6">
          <div className="p-6 text-center">
            <h1 className="text-2xl text-blue-700 font-bold mb-2">공항 히라가나 단어</h1>
            <p className="text-gray-600 mb-4">일본 공항 &amp; 여행에서 자주 쓰이는 100개 기본 용어</p>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                전체: {allWords.length}개
              </span>
              <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full">
                표시: {filteredWords.length}개
              </span>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4">
            {/* 검색 바 */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="단어나 뜻을 검색하세요..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 단어 목록 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            {selectedCategory === '전체' ? (
              // 카테고리별로 표시
              <div className="space-y-6">
                {wordCategories.map((category) => {
                  const categoryWords = category.words.filter(word => 
                    word.word.includes(searchTerm) || word.meaning.includes(searchTerm)
                  );
                  
                  if (categoryWords.length === 0) return null;
                  
                  return (
                    <div key={category.category}>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                        <span className="text-blue-600">
                          {category.category === '공항 기본' && '🏢'}
                          {category.category === '이동 & 시간' && '⏰'}
                          {category.category === '수속 & 서류' && '📋'}
                          {category.category === '안전 & 주의' && '⚠️'}
                          {category.category === '장소 & 방향' && '🧭'}
                          {category.category === '서비스 & 소통' && '💬'}
                          {category.category === '편의시설' && '🏪'}
                          {category.category === '교통수단' && '🚌'}
                          {category.category === '음식 & 음료' && '🍜'}
                          {category.category === '날씨 & 시간' && '🌤️'}
                          {category.category === '상태 & 감정' && '😊'}
                          {category.category === '기타 필수' && '💼'}
                        </span>
                        {category.category} ({categoryWords.length}개)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categoryWords.map((word, index) => (
                          <div
                            key={`${category.category}-${index}`}
                            className="p-3 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-blue-600 leading-none">
                                {word.word}
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-800 font-medium">
                                  {word.meaning}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // 선택된 카테고리만 표시
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredWords.map((word, index) => (
                  <div
                    key={index}
                    className="p-3 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600 leading-none">
                        {word.word}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-800 font-medium">
                          {word.meaning}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredWords.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl text-gray-300 mb-2">🔍</div>
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 text-lg leading-none">💡</div>
            <div>
              <h4 className="text-blue-800 font-semibold mb-1">공항 여행 가이드</h4>
              <p className="text-blue-700 text-sm">
                • 일본 공항 &amp; 여행 이용시 필수적인 히라가나 용어들입니다<br/>
                • 12개 카테고리로 상황에 맞는 단어를 찾아보세요<br/>
                • 퀴즈를 통해 실제 여행 전 미리 연습해보세요<br/>
                • 공항뿐만 아니라 일반 여행에서도 유용한 표현들입니다
              </p>
            </div>
          </div>
        </div>

        {/* 여행 팁 */}
        <div className="mt-4 bg-sky-50 border border-sky-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-sky-500 text-lg leading-none">🧳</div>
            <div>
              <h4 className="text-sky-800 font-semibold mb-1">일본 여행 완벽 가이드</h4>
              <p className="text-sky-700 text-sm">
                • 나리타/하네다 공항에서는 한국어 안내도 제공됩니다<br/>
                • 긴급상황시 "たすけ (도움)"을 외치면 도움을 받을 수 있습니다<br/>
                • "すみません (스미마센)" - 실례합니다/죄송합니다 (기본 예의)<br/>
                • JR패스 사용시 "しんかんせん (신칸센)" 등 교통 용어를 알아두세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};