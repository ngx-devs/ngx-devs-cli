module.exports = {
  disableEmoji: false,
  format: '{emoji} {type}{scope}: {subject}',
  list: [
    'build',
    'test',
    'feat',
    'fix',
    'chore',
    'docs',
    'refactor',
    'style',
    'ci',
    'perf'
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'lerna'
  ],
  scopes: [],
  types: {
    chore: {
      description:
        'Updating grunt tasks etc; no production code change "grunt task" means nothing that an external user would see.',
      emoji: '๐ง',
      value: 'chore'
    },
    build: {
      description:
        'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
      emoji: '๐๏ธ',
      value: 'build'
    },
    ci: {
      description:
        'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
      emoji: '๐ง',
      value: 'ci'
    },
    docs: {
      description: 'Documentation only changes',
      emoji: 'โ๏ธ',
      value: 'docs'
    },
    feat: {
      description: 'A new feature',
      emoji: 'โจ',
      value: 'feat'
    },
    fix: {
      description: 'A bug fix',
      emoji: '๐',
      value: 'fix'
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '๐',
      value: 'perf'
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '๐ฆ',
      value: 'refactor'
    },
    release: {
      description: 'Create a release commit',
      emoji: '๐น',
      value: 'release'
    },
    style: {
      description:
        'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
      emoji: '๐',
      value: 'style'
    },
    test: {
      description: 'Adding missing tests or correcting existing tests',
      emoji: '๐งช',
      value: 'test'
    }
  }
};
