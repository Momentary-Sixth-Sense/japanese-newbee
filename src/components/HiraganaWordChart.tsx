'use client'

import React, { useState } from 'react';

// 히라가나 기초 단어 40개 (카테고리별로 정리)
const wordCategories = [
  {
    category: '일상 기본',
    words: [
      { word: 'あい', meaning: '사랑' },
      { word: 'いえ', meaning: '집' },
      { word: 'おかね', meaning: '돈' },
      { word: 'なまえ', meaning: '이름' },
      { word: 'わたし', meaning: '나' },
      { word: 'ひと', meaning: '사람' },
      { word: 'ともだち', meaning: '친구' },
      { word: 'かぞく', meaning: '가족' },
    ]
  },
  {
    category: '시간',
    words: [
      { word: 'きょう', meaning: '오늘' },
      { word: 'けさ', meaning: '오늘 아침' },
      { word: 'よる', meaning: '밤' },
      { word: 'らいねん', meaning: '내년' },
    ]
  },
  {
    category: '장소 & 교통',
    words: [
      { word: 'えき', meaning: '역' },
      { word: 'くるま', meaning: '자동차' },
      { word: 'まち', meaning: '거리' },
      { word: 'へや', meaning: '방' },
      { word: 'にほん', meaning: '일본' },
    ]
  },
  {
    category: '자연',
    words: [
      { word: 'うみ', meaning: '바다' },
      { word: 'そら', meaning: '하늘' },
      { word: 'つき', meaning: '달' },
      { word: 'はな', meaning: '꽃' },
      { word: 'やま', meaning: '산' },
      { word: 'ゆき', meaning: '눈' },
      { word: 'もり', meaning: '숲' },
      { word: 'みず', meaning: '물' },
    ]
  },
  {
    category: '음식',
    words: [
      { word: 'さかな', meaning: '생선' },
      { word: 'すし', meaning: '초밥' },
      { word: 'たべもの', meaning: '음식' },
      { word: 'のみもの', meaning: '음료수' },
    ]
  },
  {
    category: '동물',
    words: [
      { word: 'ねこ', meaning: '고양이' },
      { word: 'いぬ', meaning: '개' },
      { word: 'むし', meaning: '벌레' },
    ]
  },
  {
    category: '기타',
    words: [
      { word: 'しごと', meaning: '일' },
      { word: 'せんせい', meaning: '선생님' },
      { word: 'こども', meaning: '아이' },
      { word: 'ちち', meaning: '아버지' },
      { word: 'てがみ', meaning: '편지' },
      { word: 'ふゆ', meaning: '겨울' },
      { word: 'ほん', meaning: '책' },
      { word: 'めがね', meaning: '안경' },
    ]
  }
];

const allWords = wordCategories.flatMap(category => category.words);

interface HiraganaWordChartProps {
  onGoBack: () => void;
}

export const HiraganaWordChart: React.FC<HiraganaWordChartProps> = ({ onGoBack }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
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
            <div className="w-5 h-5 text-lg leading-none">📚</div>
            <span className="font-semibold text-gray-800">히라가나 단어표</span>
          </div>
        </div>

        {/* 제목 및 통계 */}
        <div className="bg-white rounded-lg shadow-md border border-green-200 mb-6">
          <div className="p-6 text-center">
            <h1 className="text-2xl text-green-700 font-bold mb-2">기초 히라가나 단어</h1>
            <p className="text-gray-600 mb-4">퀴즈에 나오는 40개 기본 단어들</p>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                전체: {allWords.length}개
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100'
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
                      <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                        {category.category} ({categoryWords.length}개)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categoryWords.map((word, index) => (
                          <div
                            key={`${category.category}-${index}`}
                            className="p-3 border border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-green-600 leading-none">
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
                    className="p-3 border border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600 leading-none">
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
              <h4 className="text-blue-800 font-semibold mb-1">사용법</h4>
              <p className="text-blue-700 text-sm">
                • 검색창에서 히라가나나 한글 뜻으로 검색할 수 있습니다<br/>
                • 카테고리 버튼을 클릭하여 종류별로 필터링할 수 있습니다<br/>
                • 퀴즈에서는 이 40개 단어가 랜덤으로 출제됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};