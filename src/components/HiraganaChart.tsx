'use client'

import React from 'react';

interface HiraganaChartProps {
  onGoBack: () => void;
}

// 히라가나 데이터를 행별로 정리
const hiraganaChart = [
  { row: 'あ행', characters: [
    { char: 'あ', reading: '아' },
    { char: 'い', reading: '이' },
    { char: 'う', reading: '우' },
    { char: 'え', reading: '에' },
    { char: 'お', reading: '오' }
  ]},
  { row: 'か행', characters: [
    { char: 'か', reading: '카' },
    { char: 'き', reading: '키' },
    { char: 'く', reading: '쿠' },
    { char: 'け', reading: '케' },
    { char: 'こ', reading: '코' }
  ]},
  { row: 'さ행', characters: [
    { char: 'さ', reading: '사' },
    { char: 'し', reading: '시' },
    { char: 'す', reading: '스' },
    { char: 'せ', reading: '세' },
    { char: 'そ', reading: '소' }
  ]},
  { row: 'た행', characters: [
    { char: 'た', reading: '타' },
    { char: 'ち', reading: '치' },
    { char: 'つ', reading: '츠' },
    { char: 'て', reading: '테' },
    { char: 'と', reading: '토' }
  ]},
  { row: 'な행', characters: [
    { char: 'な', reading: '나' },
    { char: 'に', reading: '니' },
    { char: 'ぬ', reading: '누' },
    { char: 'ね', reading: '네' },
    { char: 'の', reading: '노' }
  ]},
  { row: 'は행', characters: [
    { char: 'は', reading: '하' },
    { char: 'ひ', reading: '히' },
    { char: 'ふ', reading: '후' },
    { char: 'へ', reading: '헤' },
    { char: 'ほ', reading: '호' }
  ]},
  { row: 'ま행', characters: [
    { char: 'ま', reading: '마' },
    { char: 'み', reading: '미' },
    { char: 'む', reading: '무' },
    { char: 'め', reading: '메' },
    { char: 'も', reading: '모' }
  ]},
  { row: 'や행', characters: [
    { char: 'や', reading: '야' },
    { char: '', reading: '' },
    { char: 'ゆ', reading: '유' },
    { char: '', reading: '' },
    { char: 'よ', reading: '요' }
  ]},
  { row: 'ら행', characters: [
    { char: 'ら', reading: '라' },
    { char: 'り', reading: '리' },
    { char: 'る', reading: '루' },
    { char: 'れ', reading: '레' },
    { char: 'ろ', reading: '로' }
  ]},
  { row: 'わ행', characters: [
    { char: 'わ', reading: '와' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: 'を', reading: '오' }
  ]},
  { row: 'ん', characters: [
    { char: 'ん', reading: '은' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: '', reading: '' }
  ]}
];

export const HiraganaChart: React.FC<HiraganaChartProps> = ({ onGoBack }) => {
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
            메뉴로
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-pink-600 text-lg">📚</div>
            <span className="font-semibold text-gray-800">히라가나표</span>
          </div>
        </div>

        {/* 제목 카드 */}
        <div className="bg-white rounded-lg shadow-md border border-pink-200 mb-6">
          <div className="p-6 text-center">
            <h1 className="text-xl text-pink-700 font-bold mb-2">히라가나 문자표</h1>
            <p className="text-sm text-gray-600">평가나 • 일본어 기본 음성 문자</p>
          </div>
        </div>

        {/* 문자표 */}
        <div className="space-y-3 mb-6">
          {hiraganaChart.map((row, rowIndex) => (
            <div key={rowIndex} className="bg-white rounded-lg shadow-md border border-pink-100">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-semibold text-pink-700 w-12">
                    {row.row}
                  </span>
                  <div className="flex-1 h-px bg-pink-200 mx-2"></div>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {row.characters.map((char, charIndex) => (
                    <div 
                      key={charIndex}
                      className={`
                        aspect-square border-2 rounded-lg flex flex-col items-center justify-center
                        ${char.char ? 'bg-white border-pink-200 shadow-sm hover:shadow-md' : 'bg-gray-50 border-gray-100'}
                        transition-all duration-200
                      `}
                    >
                      {char.char && (
                        <>
                          <div className="text-2xl font-bold text-pink-600 mb-1">
                            {char.char}
                          </div>
                          <div className="text-xs text-gray-600">
                            {char.reading}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg">
          <div className="p-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-semibold text-pink-700">학습 가이드</span>
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1">
                <p>• 히라가나는 일본어의 기본 음성 문자입니다</p>
                <p>• 일상적인 일본어 단어와 문법 요소에 사용됩니다</p>
                <p>• 총 46개의 기본 문자로 구성되어 있습니다</p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-200">
                <button 
                  className="w-full py-2 px-4 border border-pink-300 text-pink-700 bg-white hover:bg-pink-100 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => {
                    // 간단한 학습 팁 알림
                    alert('💡 학습 팁: 매일 조금씩 연습하면 2-3주 안에 모든 히라가나를 외울 수 있습니다!');
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    학습 팁 보기
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};