/*
*  Template - класс, описывающий шаблон
*  - element - используется как ссылка на DOM-элемент шаблона
*  - _content - содержимое шаблона. Может быть как просто HTML-кодом, так и функцией
* */

const activeScreen = document.querySelector(`main.central`);

export default class Template {
  constructor(content) {
    this.element = document.createElement(`div`);
    this._content = content;
  }

  // Присваивает шаблону функцию-callback контроллеров
  set controllers(callback) {
    this._controllers = callback;
  }
  // Отрисовывает шаблон на главный экран
  show() {
    activeScreen.innerHTML = ``;
    this.element.innerHTML = typeof this._content === `function` ? this._content.call() : this._content;
    activeScreen.appendChild(this.element);
    if (this._controllers) {
      this._controllers(this);
    }
  }
}
