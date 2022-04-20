const path = require('path');
const fs = require('fs');
const dateFormat = require('dateformat');

const template = path.resolve(__dirname, 'release-notes.hbs');
const commitTemplate = path.resolve(__dirname, 'commit-template.hbs');

module.exports = {
  branches: ['main', 'next'],
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [':bug:', ':package:', 'construction']
        },
        releaseNotes: {}
      }
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
    ['@semantic-release/git', { assets: ['package.json', 'CHANGELOG.md'] }]
  ]
};
