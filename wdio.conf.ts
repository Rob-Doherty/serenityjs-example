import { ArtifactArchiver } from '@serenity-js/core';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { WebdriverIOConfig } from '@serenity-js/webdriverio';
import { Photographer, TakePhotosOfFailures } from '@serenity-js/web';
import { Actors } from './test_source';

export const config: WebdriverIOConfig = {
    framework: '@serenity-js/webdriverio',

    serenity: {
        actors: new Actors(),
        runner: 'cucumber',
        crew: [
            ArtifactArchiver.storingArtifactsAt(process.cwd(), './target/site/serenity'),
            ConsoleReporter.forDarkTerminals(),
            new SerenityBDDReporter(),
            Photographer.whoWill(TakePhotosOfFailures),
        ]
    },

    cucumberOpts: {
        require: [
            './features/step_definitions/*.ts',
        ],
        format: [ ],
    },

    specs: [
        './features/**/*.feature',
    ],

    reporters: [
        'spec',
        // [ Inspector, { outputDir: `./log/tmp` } ]
    ],

    runner: 'local',

    maxInstances: 1,

    baseUrl: 'https://www.whiteboxitsolutions.com',

    capabilities: [{

        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                // '--headless',
                '--disable-infobars',
                '--no-sandbox',
                '--disable-gpu',
                '--window-size=1024x768',
            ],
        }
    }],

    logLevel: 'info',

    waitforTimeout: 10000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,

    services: ['chromedriver'],

};
