/// <reference types='codeceptjs' />
const config = require('../framework/config/config.js')
const expect = require('chai').expect;

const { I, loginPage } = inject();

Given('Пользователь открывает страницу авторизации', () => {
  loginPage.visit();
});

When('Пользователь вводит правильные учетные данные', () => {
  const { user } = config.credentials;
  loginPage.login(user);
});

Then('Пользователь успешно авторизован и перенаправлен на главную страницу', async () => {
  I.seeCurrentUrlEquals('https://try.vikunja.io/')
});

When('Пользователь не вводит пароль', () => {
  const { user } = config.credentials;
  loginPage.login({
    username: user.username,
    password: ''
  });
});

Then('Появляется сообщение об ошибке "Введите пароль" и пользователь остается на странице авторизации', async () => {
  const expectedErrorMessage = 'Введите пароль.';
  await expect(await loginPage.getPasswordError()).to.be.equal(expectedErrorMessage);
  I.seeCurrentUrlEquals('https://try.vikunja.io/login')
});

When('Пользователь вводит логин {word} и пароль {word}', (login, password) => {
  loginPage.login({
    username: login,
    password
  });
});
