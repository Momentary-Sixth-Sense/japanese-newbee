import React, { useState, useEffect } from 'react';

// 히라가나 데이터를 행별로 정리
const hiraganaRows = [
  { 
    row: 'あ행', 
    characters: [
      { char: 'あ', reading: '아' },
      { char: 'い', reading: '이' },
      { char: 'う', reading: '우' },
      { char: 'え', reading: '에' },
      { char: 'お', reading: '오' }
    ]
  },
  { 
    row: 'か행', 
    characters: [
      { char: 'か', reading: '카' },
      { char: 'き', reading: '키' },
      { char: 'く', reading: '쿠' },
      { char: 'け', reading: '케' },
      { char: 'こ', reading: '코' }
    ]
  },
  { 
    row: 'さ행', 
    characters: [
      { char: 'さ', reading: '사' },
      { char: 'し', reading: '시' },
      { char: 'す', reading: '스' },
      { char: 'せ', reading: '세' },
      { char: 'そ', reading: '소' }
    ]
  },
  { 
    row: 'た행', 
    characters: [
      { char: 'た', reading: '타' },
      { char: 'ち', reading: '치' },
      { char: 'つ', reading: '츠' },
      { char: 'て', reading: '테' },
      { char: 'と', reading: '토' }
    ]
  },
  { 
    row: 'な행', 
    characters: [
      { char: 'な', reading: '나' },
      { char: 'に', reading: '니' },
      { char: 'ぬ', reading: '누' },
      { char: 'ね', reading: '네' },
      { char: 'の', reading: '노' }
    ]
  },
  { 
    row: 'は행', 
    characters: [
      { char: 'は', reading: '하' },
      { char: 'ひ', reading: '히' },
      { char: 'ふ', reading: '후' },
      { char: 'へ', reading: '헤' },
      { char: 'ほ', reading: '호' }
    ]
  },
  { 
    row: 'ま행', 
    characters: [
      { char: 'ま', reading: '마' },
      { char: 'み', reading: '미' },
      { char: 'む', reading: '무' },
      { char: 'め', reading: '메' },
      { char: 'も', reading: '모' }
    ]
  },
  { 
    row: 'や행', 
    characters: [
      { char: 'や', reading: '야' },
      { char: 'ゆ', reading: '유' },
      { char: 'よ', reading: '요' }
    ]
  },
  { 
    row: 'ら행', 
    characters: [
      { char: 'ら', reading: '라' },
      { char: 'り', reading: '리' },
      { char: 'る', reading: '루' },
      { char: 'れ', reading: '레' },
      { char: 'ろ', reading: '로' }
    ]
  },
  { 
    row: 'わ행', 
    characters: [
      { char: 'わ', reading: '와' },
      { char: 'を', reading: '오' }
    ]
  },
  { 
    row: 'ん', 
    characters: [
      { char: 'ん', reading: '은' }
    ]
  }
];

// 전체 문자 배열 생성
const allCharacters = hiraganaRows.flatMap(row => 
  row.characters.map(char => ({ hiragana: char.char, pronunciation: char.reading }))
);

// 기본으로 선택될 문자들 (키 쿠 케 코 사 타 치 누 네 노 하 호 마 메 루 레 로 와)
const defaultSelectedCharacters = ['き', 'く', 'け', 'こ', 'さ', 'た', 'ち', 'ぬ', 'ね', 'の', 'は', 'ほ', 'ま', 'め', 'る', 'れ', 'ろ', 'わ'];

interface HiraganaSelectionProps {
  onStartQuiz: (selectedCharacters: Array<{hiragana: string, pronunciation: string}>) => void;
  onGoBack: () => void;
}

export const HiraganaSelection: React.FC<HiraganaSelectionProps> = ({ onStartQuiz, onGoBack }) => {
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // 초기에 기본 선택 문자들 설정
  useEffect(() => {
    const defaultSet = new Set(defaultSelectedCharacters);
    setSelectedCharacters(defaultSet);
    setSelectAll(defaultSet.size === allCharacters.length);
  }, []);

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCharacters(new Set());
      setSelectAll(false);
    } else {
      setSelectedCharacters(new Set(allCharacters.map(char => char.hiragana)));
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
    const selected = allCharacters.filter(char => selectedCharacters.has(char.hiragana));
    onStartQuiz(selected);
  };

  const selectedCount = selectedCharacters.size;
  const totalCount = allCharacters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-4">
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
                ? 'bg-gradient-to-r from-pink-200 to-red-200 hover:from-pink-300 hover:to-red-300 text-pink-800 shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <span className="text-sm leading-none">🚀</span>
            <span className="text-sm leading-none">시작 ({selectedCount})</span>
          </button>
        </div>

        {/* 제목 및 선택 상태 */}
        <div className="bg-white rounded-lg shadow-md border border-pink-200 mb-6">
          <div className="p-6 text-center">
            <h1 className="text-xl text-pink-700 font-bold mb-2">학습할 문자 선택</h1>
            <p className="text-sm text-gray-600 mb-4">퀴즈에 포함할 히라가나를 선택하세요</p>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                선택됨: {selectedCount}개
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                전체: {totalCount}개
              </span>
            </div>
            
            {/* 기본 선택 안내 */}
            {selectedCount === defaultSelectedCharacters.length && 
             defaultSelectedCharacters.every(char => selectedCharacters.has(char)) && (
              <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-full">
                💡 추천 기본 문자로 설정되어 있습니다
              </div>
            )}
          </div>
        </div>

        {/* 전체 선택 버튼 */}
        <div className="bg-white rounded-lg shadow-sm border border-pink-100 mb-4">
          <div className="p-4">
            <button
              onClick={handleSelectAll}
              className="flex items-center justify-between w-full p-3 border-2 border-pink-200 rounded-lg hover:border-pink-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  selectAll ? 'bg-pink-500 border-pink-500' : 'border-gray-300'
                }`}>
                  {selectAll && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-semibold text-gray-800">전체 선택/해제</span>
              </div>
              <span className="text-2xl text-pink-500 leading-none">あ</span>
            </button>
          </div>
        </div>

        {/* 문자 선택 영역 */}
        <div className="space-y-3 mb-6">
          {hiraganaRows.map((row, rowIndex) => {
            const isRowSelected = row.characters.every(char => selectedCharacters.has(char.char));
            const isRowPartial = row.characters.some(char => selectedCharacters.has(char.char)) && !isRowSelected;
            
            return (
              <div key={rowIndex} className="bg-white rounded-lg shadow-sm border border-pink-100">
                <div className="p-4">
                  {/* 행 헤더 */}
                  <button
                    onClick={() => handleRowSelect(row.characters)}
                    className="flex items-center justify-between w-full mb-3 p-2 border rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        isRowSelected ? 'bg-pink-500 border-pink-500' :
                        isRowPartial ? 'bg-pink-200 border-pink-300' : 'border-gray-300'
                      }`}>
                        {isRowSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isRowPartial && (
                          <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-pink-700">{row.row}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {row.characters.filter(char => selectedCharacters.has(char.char)).length}/{row.characters.length}
                    </div>
                  </button>

                  {/* 문자 그리드 */}
                  <div className="grid grid-cols-5 gap-2">
                    {row.characters.map((char, charIndex) => {
                      const isSelected = selectedCharacters.has(char.char);
                      const isDefaultSelected = defaultSelectedCharacters.includes(char.char);
                      
                      return (
                        <button
                          key={charIndex}
                          onClick={() => handleCharacterToggle(char.char)}
                          className={`
                            aspect-square border-2 rounded-lg flex flex-col items-center justify-center
                            transition-all duration-200 p-2 relative
                            ${isSelected 
                              ? 'bg-pink-100 border-pink-300 shadow-sm' 
                              : 'bg-gray-50 border-gray-200 hover:border-pink-200 hover:bg-pink-50'
                            }
                            ${isDefaultSelected && isSelected ? 'ring-2 ring-blue-200' : ''}
                          `}
                        >
                          <div className={`text-lg font-bold mb-1 leading-none ${
                            isSelected ? 'text-pink-600' : 'text-gray-600'
                          }`}>
                            {char.char}
                          </div>
                          <div className="text-xs text-gray-500 leading-none">
                            {char.reading}
                          </div>
                          
                          {/* 선택 표시 */}
                          <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border ${
                            isSelected 
                              ? 'bg-pink-500 border-pink-500' 
                              : 'bg-transparent border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-2 h-2 text-white mx-auto mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          
                          {/* 기본 선택 표시 */}
                          {isDefaultSelected && (
                            <div className="absolute top-1 left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
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
        <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-200">
          <button
            onClick={handleStartQuiz}
            disabled={selectedCount === 0}
            className={`
              w-full h-12 text-lg rounded-lg font-semibold transition-all duration-200
              ${selectedCount > 0
                ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedCount > 0 ? `퀴즈 시작하기 (${selectedCount}문제)` : '최소 1개 이상 선택해주세요'}
          </button>

          {selectedCount > 0 && (
            <div className="mt-2 text-center space-y-1">
              <p className="text-xs text-gray-500">
                💡 틀린 문제는 자동으로 반복 출제됩니다
              </p>
              {selectedCount === defaultSelectedCharacters.length && 
               defaultSelectedCharacters.every(char => selectedCharacters.has(char)) && (
                <p className="text-xs text-blue-600">
                  🎯 초보자 추천 문자로 학습을 시작합니다
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};