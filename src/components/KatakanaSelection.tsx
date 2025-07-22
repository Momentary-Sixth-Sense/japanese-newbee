'use client'

import React, { useState, useEffect } from 'react';

// 가타카나 데이터를 행별로 정리
const katakanaRows = [
  { 
    row: 'ア행', 
    characters: [
      { char: 'ア', reading: '아' },
      { char: 'イ', reading: '이' },
      { char: 'ウ', reading: '우' },
      { char: 'エ', reading: '에' },
      { char: 'オ', reading: '오' }
    ]
  },
  { 
    row: 'カ행', 
    characters: [
      { char: 'カ', reading: '카' },
      { char: 'キ', reading: '키' },
      { char: 'ク', reading: '쿠' },
      { char: 'ケ', reading: '케' },
      { char: 'コ', reading: '코' }
    ]
  },
  { 
    row: 'サ행', 
    characters: [
      { char: 'サ', reading: '사' },
      { char: 'シ', reading: '시' },
      { char: 'ス', reading: '스' },
      { char: 'セ', reading: '세' },
      { char: 'ソ', reading: '소' }
    ]
  },
  { 
    row: 'タ행', 
    characters: [
      { char: 'タ', reading: '타' },
      { char: 'チ', reading: '치' },
      { char: 'ツ', reading: '츠' },
      { char: 'テ', reading: '테' },
      { char: 'ト', reading: '토' }
    ]
  },
  { 
    row: 'ナ행', 
    characters: [
      { char: 'ナ', reading: '나' },
      { char: 'ニ', reading: '니' },
      { char: 'ヌ', reading: '누' },
      { char: 'ネ', reading: '네' },
      { char: 'ノ', reading: '노' }
    ]
  },
  { 
    row: 'ハ행', 
    characters: [
      { char: 'ハ', reading: '하' },
      { char: 'ヒ', reading: '히' },
      { char: 'フ', reading: '후' },
      { char: 'ヘ', reading: '헤' },
      { char: 'ホ', reading: '호' }
    ]
  },
  { 
    row: 'マ행', 
    characters: [
      { char: 'マ', reading: '마' },
      { char: 'ミ', reading: '미' },
      { char: 'ム', reading: '무' },
      { char: 'メ', reading: '메' },
      { char: 'モ', reading: '모' }
    ]
  },
  { 
    row: 'ヤ행', 
    characters: [
      { char: 'ヤ', reading: '야' },
      { char: 'ユ', reading: '유' },
      { char: 'ヨ', reading: '요' }
    ]
  },
  { 
    row: 'ラ행', 
    characters: [
      { char: 'ラ', reading: '라' },
      { char: 'リ', reading: '리' },
      { char: 'ル', reading: '루' },
      { char: 'レ', reading: '레' },
      { char: 'ロ', reading: '로' }
    ]
  },
  { 
    row: 'ワ행', 
    characters: [
      { char: 'ワ', reading: '와' },
      { char: 'ヲ', reading: '오' }
    ]
  },
  { 
    row: 'ン', 
    characters: [
      { char: 'ン', reading: '은' }
    ]
  }
];

// 전체 문자 배열 생성
const allCharacters = katakanaRows.flatMap(row => 
  row.characters.map(char => ({ katakana: char.char, pronunciation: char.reading }))
);

interface KatakanaSelectionProps {
  onStartQuiz: (selectedCharacters: Array<{katakana: string, pronunciation: string}>) => void;
  onGoBack: () => void;
}

export const KatakanaSelection: React.FC<KatakanaSelectionProps> = ({ onStartQuiz, onGoBack }) => {
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(true);

  // 초기에 모든 문자 선택
  useEffect(() => {
    setSelectedCharacters(new Set(allCharacters.map(char => char.katakana)));
  }, []);

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCharacters(new Set());
      setSelectAll(false);
    } else {
      setSelectedCharacters(new Set(allCharacters.map(char => char.katakana)));
      setSelectAll(true);
    }
  };

  // 행별 선택/해제
  const handleRowSelect = (rowCharacters: Array<{char: string, reading: string}>) => {
    const rowChars = rowCharacters.map(c => c.char);
    const isRowSelected = rowChars.every(char => selectedCharacters.has(char));
    
    const newSelected = new Set(selectedCharacters);
    if (isRowSelected) {
      rowChars.forEach(char => newSelected.delete(char));
    } else {
      rowChars.forEach(char => newSelected.add(char));
    }
    setSelectedCharacters(newSelected);
    setSelectAll(newSelected.size === allCharacters.length);
  };

  // 개별 문자 선택/해제
  const handleCharacterToggle = (character: string) => {
    const newSelected = new Set(selectedCharacters);
    if (newSelected.has(character)) {
      newSelected.delete(character);
    } else {
      newSelected.add(character);
    }
    setSelectedCharacters(newSelected);
    setSelectAll(newSelected.size === allCharacters.length);
  };

  // 퀴즈 시작
  const handleStartQuiz = () => {
    const selected = allCharacters.filter(char => selectedCharacters.has(char.katakana));
    onStartQuiz(selected);
  };

  const selectedCount = selectedCharacters.size;
  const totalCount = allCharacters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 p-4">
      <div className="max-w-lg mx-auto">
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
          
          <button
            onClick={handleStartQuiz}
            disabled={selectedCount === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${selectedCount > 0
                ? 'bg-gradient-to-r from-purple-200 to-orange-200 hover:from-purple-300 hover:to-orange-300 text-purple-800 shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <span className="text-sm leading-none">🚀</span>
            <span className="text-sm leading-none">시작 ({selectedCount})</span>
          </button>
        </div>

        {/* 제목 및 선택 상태 */}
        <div className="bg-white rounded-lg shadow-md border border-purple-200 mb-6">
          <div className="p-6 text-center">
            <h1 className="text-xl text-purple-700 font-bold mb-2">학습할 문자 선택</h1>
            <p className="text-sm text-gray-600 mb-4">퀴즈에 포함할 가타카나를 선택하세요</p>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                선택됨: {selectedCount}개
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                전체: {totalCount}개
              </span>
            </div>
          </div>
        </div>

        {/* 전체 선택 버튼 */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 mb-4">
          <div className="p-4">
            <button
              onClick={handleSelectAll}
              className="flex items-center justify-between w-full p-3 border-2 border-purple-200 rounded-lg hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  selectAll ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                }`}>
                  {selectAll && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-semibold text-gray-800">전체 선택/해제</span>
              </div>
              <span className="text-2xl text-purple-500 leading-none">ア</span>
            </button>
          </div>
        </div>

        {/* 문자 선택 영역 */}
        <div className="space-y-3 mb-6">
          {katakanaRows.map((row, rowIndex) => {
            const isRowSelected = row.characters.every(char => selectedCharacters.has(char.char));
            const isRowPartial = row.characters.some(char => selectedCharacters.has(char.char)) && !isRowSelected;
            
            return (
              <div key={rowIndex} className="bg-white rounded-lg shadow-sm border border-purple-100">
                <div className="p-4">
                  {/* 행 헤더 */}
                  <button
                    onClick={() => handleRowSelect(row.characters)}
                    className="flex items-center justify-between w-full mb-3 p-2 border rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        isRowSelected ? 'bg-purple-500 border-purple-500' :
                        isRowPartial ? 'bg-purple-200 border-purple-300' : 'border-gray-300'
                      }`}>
                        {isRowSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isRowPartial && (
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-purple-700">{row.row}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {row.characters.filter(char => selectedCharacters.has(char.char)).length}/{row.characters.length}
                    </div>
                  </button>

                  {/* 문자 그리드 */}
                  <div className="grid grid-cols-5 gap-2">
                    {row.characters.map((char, charIndex) => {
                      const isSelected = selectedCharacters.has(char.char);
                      
                      return (
                        <button
                          key={charIndex}
                          onClick={() => handleCharacterToggle(char.char)}
                          className={`
                            aspect-square border-2 rounded-lg flex flex-col items-center justify-center
                            transition-all duration-200 p-2 relative
                            ${isSelected 
                              ? 'bg-purple-100 border-purple-300 shadow-sm' 
                              : 'bg-gray-50 border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                            }
                          `}
                        >
                          <div className={`text-lg font-bold mb-1 leading-none ${
                            isSelected ? 'text-purple-600' : 'text-gray-600'
                          }`}>
                            {char.char}
                          </div>
                          <div className="text-xs text-gray-500 leading-none">
                            {char.reading}
                          </div>
                          
                          {/* 선택 표시 */}
                          <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border ${
                            isSelected 
                              ? 'bg-purple-500 border-purple-500' 
                              : 'bg-transparent border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-2 h-2 text-white mx-auto mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 퀴즈 시작 버튼 */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
          <button
            onClick={handleStartQuiz}
            disabled={selectedCount === 0}
            className={`
              w-full h-12 text-lg rounded-lg font-semibold transition-all duration-200
              ${selectedCount > 0
                ? 'bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedCount > 0 ? `퀴즈 시작하기 (${selectedCount}문제)` : '최소 1개 이상 선택해주세요'}
          </button>

          {selectedCount > 0 && (
            <p className="text-xs text-center text-gray-500 mt-2">
              💡 틀린 문제는 자동으로 반복 출제됩니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
};