const utils = require('../src/utils/utils.js');

test('Test user input sanitizer - Good settingID', () => {
    expect(utils.userInputSanitizer("e9869bbe-887f-4d0a-bb9d-b81eb55fbf0a", utils.isValidSettingID))
    .toBe(true);
});

test('Test user input sanitizer - Bad 0 settingID', () => {
    expect(utils.userInputSanitizer("e9869be-887f-4d0a-bb9d-b81eb55fbf0a", utils.isValidSettingID))
    .toBe(false);
});

test('Test user input sanitizer - Bad 1 settingID', () => {
    expect(utils.userInputSanitizer("e9869bbe-8872f-4d0a-bb9d-b81eb55fbf0a", utils.isValidSettingID))
    .toBe(false);
});

test('Test user input sanitizer - Bad 2 settingID', () => {
    expect(utils.userInputSanitizer("e9869bbe-887f-4d0a-bbd-b81eb55fbf0a", utils.isValidSettingID))
    .toBe(false);
});

test('Test user input sanitizer - Bad 3 settingID', () => {
    expect(utils.userInputSanitizer("e9869bbe-887f-4d0a-bb9d-b8e1eb55fbf0a", utils.isValidSettingID))
    .toBe(false);
});

test('Test user input sanitizer - Bad 4 settingID', () => {
    expect(utils.userInputSanitizer("e9869bbe-887f-4d0a-bb9d-b81eb55fbf0", utils.isValidSettingID))
    .toBe(false);
});

test('Test user input sanitizer - Bad settingID type', () => {
    expect(utils.userInputSanitizer(55552345, utils.isValidSettingID))
    .toBe(false);
});