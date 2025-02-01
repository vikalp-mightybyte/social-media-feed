/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'social-media-mini-feed',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile:
            input.stage === 'production'
              ? 'social-media-app-prod'
              : 'social-media-app-dev',
        },
      },
    };
  },
  async run() {
    await import('./sst/vpc');
    await import('./sst/db');
    await import('./sst/api');
    await import('./sst/web');
  },
});
