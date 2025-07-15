import React from 'react';

interface MenuScreenProps {
  onSelectHiragana: () => void;
  onSelectKatakana: () => void;
  onViewHiraganaChart: () => void;
  onViewKatakanaChart: () => void;
  onGoBack: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ 
  onSelectHiragana, 
  onSelectKatakana,
  onViewHiraganaChart,
  onViewKatakanaChart,
  onGoBack 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50 p-4 overflow-x-hidden">
      <div className="max-w-md mx-auto w-full">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로가기
          </button>
        </div>

        {/* 메뉴 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">학습 메뉴</h1>
          <p className="text-gray-600">원하는 학습 방법을 선택하세요</p>
        </div>

        {/* 메뉴 섹션들 */}
        <div className="space-y-6">
          
          {/* 퀴즈 섹션 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-indigo-600 text-lg">▶️</div>
              <h2 className="text-lg font-semibold text-gray-800">퀴즈 학습</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* 히라가나 퀴즈 카드 */}
              <div 
                className="bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-pink-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={onSelectHiragana}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 rounded-full">
                        <div className="w-5 h-5 text-pink-600 text-lg">📚</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">히라가나 퀴즈</h3>
                        <p className="text-sm text-gray-600">평가나 문자</p>
                      </div>
                    </div>
                    <div className="text-2xl text-pink-500">あ</div>
                  </div>
                </div>
              </div>

              {/* 가타카나 퀴즈 카드 */}
              <div 
                className="bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-purple-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={onSelectKatakana}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <div className="w-5 h-5 text-purple-600 text-lg">⚡</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">가타카나 퀴즈</h3>
                        <p className="text-sm text-gray-600">편가나 문자</p>
                      </div>
                    </div>
                    <div className="text-2xl text-purple-500">ア</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 문자표 섹션 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-teal-600 text-lg">📋</div>
              <h2 className="text-lg font-semibold text-gray-800">문자표 보기</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* 히라가나표 카드 */}
              <div 
                className="bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-pink-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={onViewHiraganaChart}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 rounded-full">
                        <div className="w-5 h-5 text-pink-600 text-lg">📋</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">히라가나표</h3>
                        <p className="text-sm text-gray-600">전체 문자 한눈에 보기</p>
                      </div>
                    </div>
                    <div className="text-lg text-pink-500 space-x-1">
                      <span>あ</span>
                      <span>か</span>
                      <span>さ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 가타카나표 카드 */}
              <div 
                className="bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-purple-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={onViewKatakanaChart}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <div className="w-5 h-5 text-purple-600 text-lg">📋</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">가타카나표</h3>
                        <p className="text-sm text-gray-600">전체 문자 한눈에 보기</p>
                      </div>
                    </div>
                    <div className="text-lg text-purple-500 space-x-1">
                      <span>ア</span>
                      <span>カ</span>
                      <span>サ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 팁 */}
        <div className="mt-8 bg-white rounded-lg p-4 shadow-sm border-2 border-teal-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <p className="text-sm font-semibold text-teal-700">💡 추천 학습 순서</p>
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>1️⃣ 히라가나표로 문자 익히기</p>
              <p>2️⃣ 히라가나 퀴즈로 연습하기</p>
              <p>3️⃣ 가타카나표로 문자 익히기</p>
              <p>4️⃣ 가타카나 퀴즈로 마스터하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};