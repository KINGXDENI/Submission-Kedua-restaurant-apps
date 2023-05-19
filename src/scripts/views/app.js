import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button,
    drawer,
    content,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page && page.render) {
      this._showLoadingIndicator();

      try {
        await this._wait(500);
        const renderedContent = await page.render();
        this._content.innerHTML = renderedContent;
        await page.afterRender();
      } catch (error) {
        this._showErrorPage();
        console.error('Failed to render page:', error);
      }

      this._hideLoadingIndicator();
    } else {
      this._showErrorPage();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _wait(ms) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _showLoadingIndicator() {
    this._content.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-indicator__circle"></div>
        <span class="loading-indicator__text">Loading...</span>
      </div>
    `;
  }

  _hideLoadingIndicator() {
    const loadingIndicator = this._content.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

  _showErrorPage() {
    this._content.innerHTML = `
      <div class="error-page">
        <h2 class="error-page__title">Oops! Something went wrong.</h2>
        <p class="error-page__message">Failed to load the page.</p>
      </div>
    `;
  }
}

export default App;
