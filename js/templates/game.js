import components from '../data/components';
import GameData from '../data/game-data';
import GameTemplate from '../classes/game-template';
import GameType from '../data/game-type';

import game1Template from '../templates/game-1';
import game2Template from '../templates/game-2';
import game3Template from '../templates/game-3';
import game1Controller from '../controllers/game-1';
import game2Controller from '../controllers/game-2';
import game3Controller from '../controllers/game-3';

const Game = {
  templates: [game1Template, game2Template, game3Template],
  controllers: [game1Controller, game2Controller, game3Controller]
};

const tasks = [`Угадайте для каждого изображения фото или рисунок?`, `Угадай, фото или рисунок?`, `Найдите рисунок среди изображений`, `Найдите изображение среди рисунков`];

const template = new GameTemplate(() => {
  const questionType = GameData.currentQuestion.type;
  let task;

  if (questionType === GameType.THREE_IMAGES) {
    task = GameData.currentQuestion.isLookingForPainting ? tasks[2] : tasks[3];
  } else {
    task = tasks[questionType];
  }

  return `${components.gameHeader(GameData.lives)}
      <div class="game">
      <p class="game__task">${task}</p>
      ${Game.templates[questionType].call()}
      ${components.gameStats(GameData.answers)}
      </div>
    ${components.footer}`;
});

template.id = `game`;
template.controllers = () => {
  return Game.controllers[GameData.currentQuestion.type].call();
};

export default template;
