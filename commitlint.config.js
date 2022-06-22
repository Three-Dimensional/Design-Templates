module.exports = {
  extends: ['cz'],
  rules: {
    'header-max-length': [2, 'always', 200],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'perf',
        'docs',
        'refactor',
        'ci',
        'deploy',
        'chore',
        'revert',
        'merge'
      ]
    ],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    // 'scope-empty': [2, 'never'],
    // 'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', []],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always']
  }
}
