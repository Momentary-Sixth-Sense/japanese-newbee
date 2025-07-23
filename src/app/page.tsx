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
import { AirportHiraganaWordQuiz } from '@/components/AirportHiraganaWordQuiz';
import { AirportHiraganaWordChart } from '@/components/AirportHiraganaWordChart';

type GameState = 'start' | 'menu' | 'hiraganaSelection' | 'katakanaSelection' | 'hiragana' | 'katakana' | 'hiraganaChart' | 'katakanaChart' | 'hiraganaWord' | 'hiraganaWordChart' | 'airportHiraganaWord' | 'airportHiraganaWordChart';

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

  const handleSelectAirportHiraganaWord = () => {
    setGameState('airportHiraganaWord');
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

  const handleViewAirportHiraganaWordChart = () => {
    setGameState('airportHiraganaWordChart');
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
          onSelectAirportHiraganaWord={handleSelectAirportHiraganaWord}
          onViewHiraganaChart={handleViewHiraganaChart}
          onViewKatakanaChart={handleViewKatakanaChart}
          onViewHiraganaWordChart={handleViewHiraganaWordChart}
          onViewAirportHiraganaWordChart={handleViewAirportHiraganaWordChart}
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
      {gameState === 'airportHiraganaWord' && (
        <AirportHiraganaWordQuiz onGoHome={handleGoToMenu} />
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
      {gameState === 'airportHiraganaWordChart' && (
        <AirportHiraganaWordChart onGoBack={handleGoToMenu} />
      )}
    </div>
  );
}

export default App;