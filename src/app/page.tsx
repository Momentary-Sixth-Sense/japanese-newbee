'use client'

import React, { useState } from 'react';
import { StartScreen } from '../components/StartScreen';
import { MenuScreen } from '../components/MenuScreen';
import { HiraganaQuiz } from '../components/HiraganaQuiz';
import { KatakanaQuiz } from '../components/KatakanaQuiz';
import { HiraganaChart } from '../components/HiraganaChart';
import { KatakanaChart } from '../components/KatakanaChart';

type GameState = 'start' | 'menu' | 'hiragana' | 'katakana' | 'hiraganaChart' | 'katakanaChart';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');

  const handleStartApp = () => {
    setGameState('menu');
  };

  const handleSelectHiragana = () => {
    setGameState('hiragana');
  };

  const handleSelectKatakana = () => {
    setGameState('katakana');
  };

  const handleViewHiraganaChart = () => {
    setGameState('hiraganaChart');
  };

  const handleViewKatakanaChart = () => {
    setGameState('katakanaChart');
  };

  const handleGoToMenu = () => {
    setGameState('menu');
  };

  const handleGoToStart = () => {
    setGameState('start');
  };

  return (
    <div className="App overflow-x-hidden">
      {gameState === 'start' && (
        <StartScreen onStartApp={handleStartApp} />
      )}
      {gameState === 'menu' && (
        <MenuScreen 
          onSelectHiragana={handleSelectHiragana}
          onSelectKatakana={handleSelectKatakana}
          onViewHiraganaChart={handleViewHiraganaChart}
          onViewKatakanaChart={handleViewKatakanaChart}
          onGoBack={handleGoToStart}
        />
      )}
      {gameState === 'hiragana' && (
        <HiraganaQuiz onGoHome={handleGoToMenu} />
      )}
      {gameState === 'katakana' && (
        <KatakanaQuiz onGoHome={handleGoToMenu} />
      )}
      {gameState === 'hiraganaChart' && (
        <HiraganaChart onGoBack={handleGoToMenu} />
      )}
      {gameState === 'katakanaChart' && (
        <KatakanaChart onGoBack={handleGoToMenu} />
      )}
    </div>
  );
}

export default App;