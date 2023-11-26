/// <reference types='codeceptjs' />
const config = require('../framework/config/config.js')
const expect = require('chai').expect;

Feature('Авторизация');

Before(({ loginPage }) => {
    loginPage.visit()
})

Scenario('Успешная',  async ({ I, loginPage }) => {
    loginPage.login(config.credentials.user)
    I.dontSeeCurrentUrlEquals('https://try.vikunja.io/login')
});

Scenario('Нельзя авторизоваться без пароля', async ({ I, loginPage }) => {
    loginPage.login({
        username: config.credentials.user.username,
        password: ''
    })
    await expect(await loginPage.getPasswordError()).to.be.equal('Введите пароль.')
    I.dontSeeCurrentUrlEquals('https://try.vikunja.io')
})
