import { LivePosPage } from './app.po';

describe('LivePos App', function() {
  let page: LivePosPage;

  beforeEach(() => {
    page = new LivePosPage();
  });

  it('should display heading saying LivePos', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('LivePos');
  });
});
