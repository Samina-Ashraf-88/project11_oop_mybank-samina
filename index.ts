#!/usr/bin/env node

import inquirer from "inquirer";

interface BankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number,balance:number){
        this.accountNumber=accountNumber;
        this.balance=balance;
    }
    withdraw(amount:number):void{
        if(this.balance>=amount){
            this .balance-=amount;
            console.log(`withdrawel of $${amount} successful.remaining balance: $${this.balance}`);
        }else{
            console.log("insufficient balance.");    
        }
    }
    deposit(amount:number):void{
        if(amount>100){
            amount-=1
        }this.balance+=amount;
        console.log(`deposit of$${amount} successful.remaining balance: $${this.balance}`);
    }
    checkBalance(): void {
        console.log(`current balance: $${this.balance}`);    
    }
}
class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount){
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender;
        this.age=age;
        this.mobileNumber=mobileNumber;
        this.account=account
    }
}

const accounts:BankAccount[]=[
    new BankAccount(1001,500),
    new BankAccount(1002,1000),
    new BankAccount(1003,2000)
];

const customers:Customer[]=[
    new Customer("ali","khan","male",35,3165698235,accounts[0]),
    new Customer("syeda","shanzay","female",24,3169698235,accounts[1]),
    new Customer("ayesha","khan","female",40,3165676235,accounts[2])
]

async function service(){
    do{
        const accountNumberInput=await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"enter your account number:"
        })

        const customer=customers.find(customer=>customer.account.accountNumber===accountNumberInput.accountNumber)
        if(customer){
            console.log(`welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans=await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select an operation",
                choices:["deposit","withdraw","check balance","exit"]
            }]);

            switch(ans.select){
                case"deposit":
                const depositAmount=await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"enter the amount to deposit:"
                })
                customer.account.deposit(depositAmount.amount);
                break;

                case"withdraw":
                const withdrawAmount=await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"enter the amount to withdraw:"
                })
                customer.account.deposit(withdrawAmount.amount);
                break;
                case"check balance":
                customer.account.checkBalance();
                break;
                case"exit":
                console.log("exiting bank program...");
                console.log("\n thank you for using our bank services.have a great day!");
                return;
                

            }
            
        }else{
            console.log("invalid account number.please try again.");
            
        }

    }while(true)
}

service()