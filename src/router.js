import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

export default class Router extends UniversalRouter {
  constructor(...args) {
    super(...args);

    this.url = generateUrls(this, { uniqueRouteNameSep: '.' });

    // Initial Rendering for the initial location
    this.render();
  }

  show(location, params) {
    this.render(this.url(location, params));
  }

  async render(location) {
    const html = await this.resolve(location || '/');
    console.log(html);
    document.body.innerHTML = '';
    document.body.append(html);
  }

}
