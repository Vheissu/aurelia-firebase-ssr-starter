import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import bootstrapper from 'aurelia-ssr-bootstrapper-webpack';

(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration();

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}

module.exports = bootstrapper(configure);
