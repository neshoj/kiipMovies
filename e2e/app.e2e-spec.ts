import { LearnmorePage } from './app.po';

describe('learnmore App', () => {
  let page: LearnmorePage;

  beforeEach(() => {
    page = new LearnmorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
