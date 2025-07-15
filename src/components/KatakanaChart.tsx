'use client'

import React from 'react';

interface KatakanaChartProps {
  onGoBack: () => void;
}

// 가타카나 데이터를 행별로 정리
const katakanaChart = [
  { row: 'ア행', characters: [
    { char: 'ア', reading: '아' },
    { char: 'イ', reading: '이' },
    { char: 'ウ', reading: '우' },
    { char: 'エ', reading: '에' },
    { char: 'オ', reading: '오' }
  ]},
  { row: 'カ행', characters: [
    { char: 'カ', reading: '카' },
    { char: 'キ', reading: '키' },
    { char: 'ク', reading: '쿠' },
    { char: 'ケ', reading: '케' },
    { char: 'コ', reading: '코' }
  ]},
  { row: 'サ행', characters: [
    { char: 'サ', reading: '사' },
    { char: 'シ', reading: '시' },
    { char: 'ス', reading: '스' },
    { char: 'セ', reading: '세' },
    { char: 'ソ', reading: '소' }
  ]},
  { row: 'タ행', characters: [
    { char: 'タ', reading: '타' },
    { char: 'チ', reading: '치' },
    { char: 'ツ', reading: '츠' },
    { char: 'テ', reading: '테' },
    { char: 'ト', reading: '토' }
  ]},
  { row: 'ナ행', characters: [
    { char: 'ナ', reading: '나' },
    { char: 'ニ', reading: '니' },
    { char: 'ヌ', reading: '누' },
    { char: 'ネ', reading: '네' },
    { char: 'ノ', reading: '노' }
  ]},
  { row: 'ハ행', characters: [
    { char: 'ハ', reading: '하' },
    { char: 'ヒ', reading: '히' },
    { char: 'フ', reading: '후' },
    { char: 'ヘ', reading: '헤' },
    { char: 'ホ', reading: '호' }
  ]},
  { row: 'マ행', characters: [
    { char: 'マ', reading: '마' },
    { char: 'ミ', reading: '미' },
    { char: 'ム', reading: '무' },
    { char: 'メ', reading: '메' },
    { char: 'モ', reading: '모' }
  ]},
  { row: 'ヤ행', characters: [
    { char: 'ヤ', reading: '야' },
    { char: '', reading: '' },
    { char: 'ユ', reading: '유' },
    { char: '', reading: '' },
    { char: 'ヨ', reading: '요' }
  ]},
  { row: 'ラ행', characters: [
    { char: 'ラ', reading: '라' },
    { char: 'リ', reading: '리' },
    { char: 'ル', reading: '루' },
    { char: 'レ', reading: '레' },
    { char: 'ロ', reading: '로' }
  ]},
  { row: 'ワ행', characters: [
    { char: 'ワ', reading: '와' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: 'ヲ', reading: '오' }
  ]},
  { row: 'ン', characters: [
    { char: 'ン', reading: '은' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: '', reading: '' },
    { char: '', reading: '' }
  ]}
];

export const KatakanaChart: React.FC<KatakanaChartProps> = ({ onGoBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 p-4 overflow-x-hidden">
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
            <div className="w-5 h-5 text-purple-600 text-lg">⚡</div>
            <span className="font-semibold text-gray-800">가타카나표</span>
          </div>
        </div>

        {/* 제목 카드 */}
        <div className="bg-white rounded-lg shadow-md border border-purple-200 mb-6">
          <div className="p-6 text-center">
            <h1 className="text-xl text-purple-700 font-bold mb-2">가타카나 문자표</h1>
            <p className="text-sm text-gray-600">편가나 • 외래어 및 의성어 표기</p>
          </div>
        </div>

        {/* 문자표 */}
        <div className="space-y-3 mb-6">
          {katakanaChart.map((row, rowIndex) => (
            <div key={rowIndex} className="bg-white rounded-lg shadow-md border border-purple-100">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-semibold text-purple-700 w-12">
                    {row.row}
                  </span>
                  <div className="flex-1 h-px bg-purple-200 mx-2"></div>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {row.characters.map((char, charIndex) => (
                    <div 
                      key={charIndex}
                      className={`
                        aspect-square border-2 rounded-lg flex flex-col items-center justify-center
                        ${char.char ? 'bg-white border-purple-200 shadow-sm hover:shadow-md' : 'bg-gray-50 border-gray-100'}
                        transition-all duration-200
                      `}
                    >
                      {char.char && (
                        <>
                          <div className="text-2xl font-bold text-purple-600 mb-1">
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg">
          <div className="p-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-purple-700">학습 가이드</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1">
                <p>• 가타카나는 외래어와 의성어 표기에 사용됩니다</p>
                <p>• 히라가나보다 각진 모양이 특징입니다</p>
                <p>• 컴퓨터(コンピュータ), 커피(コーヒー) 등에 사용</p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-200">
                <button 
                  className="w-full py-2 px-4 border border-purple-300 text-purple-700 bg-white hover:bg-purple-100 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => {
                    // 간단한 학습 팁 알림
                    alert('💡 학습 팁: 히라가나를 완전히 익힌 후 가타카나를 학습하면 더 효과적입니다!');
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