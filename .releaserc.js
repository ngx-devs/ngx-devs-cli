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
          patch: [':bug:', ':package:']
        },
        releaseNotes: {
          template: fs.readFileSync(template, 'utf8'),
          commitTemplate: fs.readFileSync(commitTemplate, 'utf8'),
          helpers: {
            datetime: function (format = 'UTC:yyyy-mm-dd') {
              return dateFormat(new Date(), format);
            }
          },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com'
          }
        }
      }
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md']
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ]
  ]
};
