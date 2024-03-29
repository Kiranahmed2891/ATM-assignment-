#! /usr/bin/env node
import inquirer from "inquirer";

let balance = 10000;
let pin = 1234;

(async () => {
    let pinAnswer = await inquirer.prompt([{
        name: 'Q1',
        message: 'Enter your pin code',
        type: 'number'
    }]);

    if (pinAnswer.Q1 === pin) {
        console.log('Correct your pin code');

        let operation = await inquirer.prompt([{
            name: 'Operations',
            message: 'Select one operation',
            type: 'list',
            choices: ['Withdraw', 'Check Balance', 'Fast cash']
        }]);

        if (operation.Operations === 'Withdraw') {
            let amountAns = await inquirer.prompt([{
                name: 'Amount',
                message: 'Enter your desired amount',
                type: 'number'
            }]);
            if (amountAns.Amount < balance) {
                balance -= amountAns.Amount;
                console.log(`Now your balance is: ${balance}`);
            } else {
                console.log('Insufficient balance');
            }
        } else if (operation.Operations === "Check Balance") {
            console.log('Your Current balance is: ' + balance);
        } else if (operation.Operations === "Fast cash") {
            let fast = await inquirer.prompt([{
                name: 'FastOpt',
                message: 'How much money?',
                type: 'list',
                choices: ['2000', '4000', '6000']
            }]);
            let amount = parseInt(fast.FastOpt);
            if (amount && amount <= balance) {
                balance -= amount;
                console.log(`Your remaining balance is ${balance}`);
            } else {
                console.log('Invalid amount or insufficient balance');
            }
        }
    } else {
        console.log('Invalid Pin code');
    }
})();
