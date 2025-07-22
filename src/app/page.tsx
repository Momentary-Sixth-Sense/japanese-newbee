'use client'

import React, { useState } from 'react';
import { StartScreen } from '@/components/StartScreen';
import { MenuScreen } from '@/components/MenuScreen';
import { HiraganaSelection } from '@/components/HiraganaSelection';
import { KatakanaSelection } from '@/components/KatakanaSelection';
import { HiraganaQuiz } from '@/components/HiraganaQuiz';
import { KatakanaQuiz } from '@/components/KatakanaQuiz';
import { HiraganaChart } from '@/components/HiraganaChart';
import { KatakanaChart } from '@/components/KatakanaChart';
import { HiraganaWordQuiz } from '@/components/HiraganaWordQuiz';
import { HiraganaWordChart } from '@/components/HiraganaWordChart';

type GameState = 'start' | 'menu' | 'hiraganaSelection' | 'katakanaSelection' | 'hiragana' | 'katakana' | 'hiraganaChart' | 'katakanaChart' | 'hiraganaWord' | 'hiraganaWordChart';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [selectedHiragana, setSelectedHiragana] = useState<Array<{hiragana: string, pronunciation: string}>>([]);
  const [selectedKatakana, setSelectedKatakana] = useState<Array<{katakana: string, pronunciation: string}>>([]);

  const handleStartApp = () => {
    setGameState('menu');
  };

  const handleSelectHiragana = () => {
    setGameState('hiraganaSelection');
  };

  const handleSelectKatakana = () => {
    setGameState('katakanaSelection');
  };

  const handleSelectHiraganaWord = () => {
    setGameState('hiraganaWord');
  };

  const handleStartHiraganaQuiz = (characters: Array<{hiragana: string, pronunciation: string}>) => {
    setSelectedHiragana(characters);
    setGameState('hiragana');
  };

  const handleStartKatakanaQuiz = (characters: Array<{katakana: string, pronunciation: string}>) => {
    setSelectedKatakana(characters);
    setGameState('katakana');
  };

  const handleViewHiraganaChart = () => {
    setGameState('hiraganaChart');
  };

  const handleViewKatakanaChart = () => {
    setGameState('katakanaChart');
  };

  const handleViewHiraganaWordChart = () => {
    setGameState('hiraganaWordChart');
  };

  const handleGoToMenu = () => {
    setGameState('menu');
  };

  const handleGoToStart = () => {
    setGameState('start');
  };

  return (
    <div className="App">
      {gameState === 'start' && (
        <StartScreen onStartApp={handleStartApp} />
      )}
      {gameState === 'menu' && (
        <MenuScreen 
          onSelectHiragana={handleSelectHiragana}
          onSelectKatakana={handleSelectKatakana}
          onSelectHiraganaWord={handleSelectHiraganaWord}
          onViewHiraganaChart={handleViewHiraganaChart}
          onViewKatakanaChart={handleViewKatakanaChart}
          onViewHiraganaWordChart={handleViewHiraganaWordChart}
          onGoBack={handleGoToStart}
        />
      )}
      {gameState === 'hiraganaSelection' && (
        <HiraganaSelection 
          onStartQuiz={handleStartHiraganaQuiz}
          onGoBack={handleGoToMenu}
        />
      )}
      {gameState === 'katakanaSelection' && (
        <KatakanaSelection 
          onStartQuiz={handleStartKatakanaQuiz}
          onGoBack={handleGoToMenu}
        />
      )}
      {gameState === 'hiragana' && (
        <HiraganaQuiz 
          selectedCharacters={selectedHiragana}
          onGoHome={handleGoToMenu} 
        />
      )}
      {gameState === 'katakana' && (
        <KatakanaQuiz 
          selectedCharacters={selectedKatakana}
          onGoHome={handleGoToMenu} 
        />
      )}
      {gameState === 'hiraganaWord' && (
        <HiraganaWordQuiz onGoHome={handleGoToMenu} />
      )}
      {gameState === 'hiraganaChart' && (
        <HiraganaChart onGoBack={handleGoToMenu} />
      )}
      {gameState === 'katakanaChart' && (
        <KatakanaChart onGoBack={handleGoToMenu} />
      )}
      {gameState === 'hiraganaWordChart' && (
        <HiraganaWordChart onGoBack={handleGoToMenu} />
      )}
    </div>
  );
}

export default App;