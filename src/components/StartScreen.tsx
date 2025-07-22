'use client'

import React from 'react';

interface StartScreenProps {
  onStartApp: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 text-center">
          <div className="p-6">
            <div className="mx-auto mb-4">
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-2 text-indigo-500 text-6xl">📚</div>
                <div className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 text-2xl">✨</div>
              </div>
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
              일본어 문자 퀴즈
            </h1>
            <p className="text-gray-600 mb-6">
              히라가나와 가타카나를 재미있게 학습해보세요!
            </p>
          </div>
          
          <div className="p-6 pt-0 space-y-6">
            {/* 기능 설명 */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left">
                <div className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0 text-lg">🎯</div>
                <div>
                  <h3 className="font-semibold text-sm">퀴즈 방식</h3>
                  <p className="text-xs text-gray-600">
                    일본어 문자를 보고 한글 발음을 입력하세요
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <div className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 text-lg">🔄</div>
                <div>
                  <h3 className="font-semibold text-sm">무한 반복</h3>
                  <p className="text-xs text-gray-600">
                    모든 문제를 완료하면 다시 섞어서 반복됩니다
                  </p>
                </div>
              </div>
            </div>

            {/* 학습 범위 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
              <h3 className="font-semibold text-sm mb-3">학습 범위</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-2 bg-white rounded border border-pink-100">
                  <div className="text-pink-500 text-lg mb-1">あかさた</div>
                  <div className="text-gray-600">히라가나</div>
                  <div className="text-gray-500">46문자</div>
                </div>
                <div className="text-center p-2 bg-white rounded border border-purple-100">
                  <div className="text-purple-500 text-lg mb-1">アカサタ</div>
                  <div className="text-gray-600">가타카나</div>
                  <div className="text-gray-500">46문자</div>
                </div>
              </div>
            </div>

            {/* 시작 버튼 */}
            <button 
              onClick={onStartApp}
              className="w-full h-12 text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 hover:from-indigo-600 hover:via-purple-600 hover:to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              퀴즈 시작하기
            </button>

            {/* 추가 정보 */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">📚 일본어 문자 체계</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                히라가나는 일상적인 단어에, 가타카나는 외래어에 주로 사용됩니다.
                두 문자 모두 같은 발음을 가지지만 용도가 다릅니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};