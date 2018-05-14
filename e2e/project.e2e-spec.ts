import { ProjectPage } from './project.po';
import { browser } from 'protractor';

function sleep() {
  browser.driver.sleep(1500); // sleep for demonstration reasons
}

describe('LivePos project view', function () {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage();
  });

  it('should display a list of project', () => {
    page.navigateTo();
    expect(page.getProjectCardElements().count()).toBe(151);
  });

  it('should open and view a particular project', () => {
    page.navigateTo();
    page.getFirstProjectCardElement().click();

    expect(page.getOpenModalElement()).toBeTruthy();
    expect(page.getOpenModalHeadingElement().getText()).toBe('Bulbasaur #1');
  });

  it('should open and allow arrow keys to navigate between project', () => {
    page.navigateTo();
    page.getFirstProjectCardElement().click();
    page.selectNextKey();

    expect(page.getOpenModalHeadingElement().getText()).toBe('Ivysaur #2');

    page.selectPrevKey();
    page.selectPrevKey();
    expect(page.getOpenModalHeadingElement().getText()).toBe('Mew #151');
  });
});
