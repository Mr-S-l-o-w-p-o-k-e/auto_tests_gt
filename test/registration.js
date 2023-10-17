// Позитивные тесты падают из-за проверки на робота
// Негативный тест "Логин уже используется" падает по той же причине, т.к. сообщение об ошибке "логин используется" появляется только проверки на робота
"use strict"
const { By, Key, Builder, until, Origin } = require ("selenium-webdriver");
const { strictEqual } = require ("assert");
const {data} = require ("./data/data.js");

describe("Регистрация", function () {
	const locations = {
		login : {id: "input-login" },
		email : {id: "input-email"},
		password : {id: "input-password"},
		repeatPassword : {id: "input-repeat-password"},
		inn : {id: "input-inn"},
		secretWord : {id: "input-secret-word"},
		rolUchastik : By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/div[1]/span/div/label[1]/span"),
		rolOrganizator : By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/div[1]/span/div/label[2]/span"),
		rolUchastikAndOrganizator: By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/div[1]/span/div/label[3]/span"),
		errorLogin : By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/div[2]/div/span/div"),
		errorRoleNotChosen : By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/div[1]/span/div[2]"),
		agreeCheckBox : By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/div[8]/span/label/input"),
		confirmRegistration: By.xpath("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div/span/form/div/div/div[2]/button[1]/span"),
		chechResultat: By.xpath("/html/body/div/div/div/div/div[3]/div[2]/div/div")
	}

	describe("Позитивные тесты", function () {

		it("Регистрация под ролью Участника", async function () {
			const driver = await new Builder().forBrowser("chrome").build();
			await driver.manage().window().maximize();
			await driver.get(data.regUrl);
			await driver.findElement(locations.rolUchastik).click();
			await driver.findElement(locations.login).sendKeys(data.login1);
			await driver.findElement(locations.email).sendKeys(data.email1);
			await driver.findElement(locations.password).sendKeys(data.password);
			await driver.findElement(locations.repeatPassword).sendKeys(data.password);
			await driver.findElement(locations.inn).sendKeys(data.inn1);
			await driver.findElement(locations.secretWord).sendKeys(data.secretWord);
			await driver.findElement(locations.agreeCheckBox).click();
			const comform = await driver.findElement(locations.confirmRegistration);
			const deltaY = (await comform.getRect()).y
			await driver.actions()
			.scroll(0, 0, 0, deltaY)
			.perform();
			await driver.findElement(locations.confirmRegistration).click();
			let textRezultat = await driver.findElement(locations.chechResultat).getText();
			strictEqual(textRezultat, data.registrationStatusSuccess); 
			await driver.quit();
		})

		it("Регистрация под ролью Организатора", async function () {
			const driver = await new Builder().forBrowser("chrome").build();
			await driver.manage().window().maximize();
			await driver.get(data.regUrl);
			await driver.findElement(locations.rolOrganizator).click();
			await driver.findElement(locations.login).sendKeys(data.login2);
			await driver.findElement(locations.email).sendKeys(data.email2);
			await driver.findElement(locations.password).sendKeys(data.password);
			await driver.findElement(locations.repeatPassword).sendKeys(data.password);
			await driver.findElement(locations.inn).sendKeys(data.inn2);
			await driver.findElement(locations.secretWord).sendKeys(data.secretWord);
			await driver.findElement(locations.agreeCheckBox).click();
			const comform = await driver.findElement(locations.confirmRegistration);
			const deltaY = (await comform.getRect()).y
			await driver.actions()
			.scroll(0, 0, 0, deltaY)
			.perform();
			await driver.findElement(locations.confirmRegistration).click();
			let textRezultat = await driver.findElement(locations.chechResultat).getText();
			strictEqual(textRezultat, data.registrationStatusSuccess);
			await driver.quit();
		})

		it("Регистрация под ролью Участника и Организатора", async function() {
			const driver = await new Builder().forBrowser("chrome").build();
			await driver.manage().window().maximize();
			await driver.get(data.regUrl);
			await driver.findElement(locations.rolUchastikAndOrganizator).click();
			await driver.findElement(locations.login).sendKeys(data.login3);
			await driver.findElement(locations.email).sendKeys(data.email3);
			await driver.findElement(locations.password).sendKeys(data.password);
			await driver.findElement(locations.repeatPassword).sendKeys(data.password);
			await driver.findElement(locations.inn).sendKeys(data.inn3);
			await driver.findElement(locations.secretWord).sendKeys(data.secretWord);
			await driver.findElement(locations.agreeCheckBox).click();
			const comform = await driver.findElement(locations.confirmRegistration);
			const deltaY = (await comform.getRect()).y
			await driver.actions()
			.scroll(0, 0, 0, deltaY)
			.perform();
			await driver.findElement(locations.confirmRegistration).click();
			let textRezultat = await driver.findElement(locations.chechResultat).getText();
			strictEqual(textRezultat, data.registrationStatusSuccess);
			await driver.quit();
		})
	})


	describe("Негативные тесты", function () {

		it("Короткий логин", async function () {
			const driver = await new Builder().forBrowser("chrome").build();
			await driver.manage().window().maximize();
			await driver.get(data.regUrl);
			await driver.findElement(locations.login).sendKeys(data.shortLogin);
			let warningText = await driver.findElement(locations.errorLogin).getText()
			strictEqual(warningText, data.loginStatusNoSuccessShortLogin);
			await driver.quit();
		})

		it("Логин уже используется", async function () {
			const driver = await new Builder().forBrowser("chrome").build();
			await driver.manage().window().maximize();
			await driver.get(data.regUrl);
			await driver.findElement(locations.rolUchastik).click();
			await driver.findElement(locations.login).sendKeys(data.usedlogin);
			await driver.findElement(locations.email).sendKeys(data.email1);
			await driver.findElement(locations.password).sendKeys(data.password);
			await driver.findElement(locations.repeatPassword).sendKeys(data.password);
			await driver.findElement(locations.inn).sendKeys(data.inn1);
			await driver.findElement(locations.secretWord).sendKeys(data.secretWord);
			await driver.findElement(locations.agreeCheckBox).click();
			const comform = await driver.findElement(locations.confirmRegistration);
			const deltaY = (await comform.getRect()).y
			await driver.actions()
			.scroll(0, 0, 0, deltaY)
			.perform();
			await driver.findElement(locations.confirmRegistration).click();
			let warningText = await driver.findElement(locations.errorLogin).getText()
			strictEqual(warningText, data.loginStatusNoSuccessLoginUsed);
			await driver.quit();
		})

		it("Не выбрана роль", async function (){
			const driver = await new Builder().forBrowser("chrome").build();
			await driver.manage().window().maximize();
			await driver.get(data.regUrl);
			await driver.findElement(locations.login).sendKeys(data.login3);
			await driver.findElement(locations.email).sendKeys(data.email3);
			await driver.findElement(locations.password).sendKeys(data.password);
			await driver.findElement(locations.repeatPassword).sendKeys(data.password);
			await driver.findElement(locations.inn).sendKeys(data.inn3);
			await driver.findElement(locations.secretWord).sendKeys(data.secretWord);
			await driver.findElement(locations.agreeCheckBox).click();
			const comform = await driver.findElement(locations.confirmRegistration);
			const deltaY = (await comform.getRect()).y
			await driver.actions()
			.scroll(0, 0, 0, deltaY)
			.perform();
			await driver.findElement(locations.confirmRegistration).click();
			let warningText = await driver.findElement(locations.errorRoleNotChosen).getText();
			strictEqual(warningText, data.roleAlertMessage);
			await driver.quit();
		})

	})

})



