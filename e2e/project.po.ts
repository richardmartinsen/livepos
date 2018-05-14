import { browser, element, by, Key } from 'protractor';

export class ProjectPage {
  navigateTo() {
    return browser.get('/project');
  }

  getProjectCardElements() {
    return element.all(by.css('.card--media'));
  }

  getFirstProjectCardElement() {
    return element(by.css('.card--media'));
  }

  getOpenModalElement() {
    return element(by.tagName('app-project-modal'));
  }

  getOpenModalHeadingElement() {
    return element(by.css('app-project-modal h1'));
  }

  selectNextKey() {
    browser.actions().sendKeys(Key.ARROW_RIGHT).perform();
  }

  selectPrevKey() {
    browser.actions().sendKeys(Key.ARROW_LEFT).perform();
  }

  selectEscapeKey() {
    browser.actions().sendKeys(Key.ESCAPE).perform();
  }
}
