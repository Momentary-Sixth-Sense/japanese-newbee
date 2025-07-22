'use client'

import React from 'react';

interface MenuScreenProps {
  onSelectHiragana: () => void;
  onSelectKatakana: () => void;
  onSelectHiraganaWord: () => void;
  onViewHiraganaChart: () => void;
  onViewKatakanaChart: () => void;
  onViewHiraganaWordChart: () => void;
  onGoBack: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ 
  onSelectHiragana, 
  onSelectKatakana, 
  onSelectHiraganaWord,
  onViewHiraganaChart, 
  onViewKatakanaChart,
  onViewHiraganaWordChart,
  onGoBack 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 text-2xl">🎌</div>
            <span className="text-lg font-bold text-gray-800">일본어 학습</span>
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">학습 메뉴</h1>
          <p className="text-gray-600">원하는 학습 방법을 선택하세요</p>
        </div>

        {/* 퀴즈 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            퀴즈 학습
          </h2>
          
          <div className="space-y-3">
            {/* 히라가나 문자 퀴즈 */}
            <button
              onClick={onSelectHiragana}
              className="w-full p-4 bg-white rounded-lg shadow-md border-2 border-pink-200 hover:border-pink-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-pink-600">あ</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">히라가나 문자</h3>
                    <p className="text-sm text-gray-600">문자 발음 맞추기</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* 히라가나 단어 퀴즈 */}
            <button
              onClick={onSelectHiraganaWord}
              className="w-full p-4 bg-white rounded-lg shadow-md border-2 border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg text-green-600">📝</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">히라가나 단어</h3>
                    <p className="text-sm text-gray-600">단어 뜻 맞추기 (40문제)</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* 가타카나 문자 퀴즈 */}
            <button
              onClick={onSelectKatakana}
              className="w-full p-4 bg-white rounded-lg shadow-md border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-purple-600">ア</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">가타카나 문자</h3>
                    <p className="text-sm text-gray-600">문자 발음 맞추기</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* 참고표 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            참고표
          </h2>
          
          <div className="space-y-3">
            {/* 히라가나 차트 */}
            <button
              onClick={onViewHiraganaChart}
              className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:border-pink-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-pink-500">あ</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">히라가나 표</h3>
                    <p className="text-sm text-gray-600">전체 문자 보기</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* 히라가나 단어 차트 */}
            <button
              onClick={onViewHiraganaWordChart}
              className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <span className="text-lg text-green-500">📚</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">히라가나 단어표</h3>
                    <p className="text-sm text-gray-600">기초 단어 40개</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* 가타카나 차트 */}
            <button
              onClick={onViewKatakanaChart}
              className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-purple-500">ア</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">가타카나 표</h3>
                    <p className="text-sm text-gray-600">전체 문자 보기</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center text-sm text-gray-500">
          <p>한국인을 위한 일본어 학습 앱</p>
        </div>
      </div>
    </div>
  );
};