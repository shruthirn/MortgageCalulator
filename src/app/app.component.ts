import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MortgageCalculator';
  MortgageFrom: FormGroup;
  LoanAmount: any;
   APR: any;
   DownPayment: any;
   Period: any;
   MonthlyMortgage: any;
   AmountBorrowed: any;
  constructor(private formBuilder: FormBuilder){
    //  {'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')

     this.MortgageFrom =  formBuilder.group(
      {
    loanAmt: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]+$')]],
    downAmt: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]+$')]],
    apr: ['', [Validators.required, Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$')]],
    period: ['', [Validators.required, Validators.pattern('^\\d{1,2}(\\.\\d{1,2})?$')]]
     }
      );

  }

  CalculateMortgage(){
    this.LoanAmount = this.MortgageFrom.get('loanAmt').value;
    this.DownPayment = this.MortgageFrom.get('downAmt').value;
    this .AmountBorrowed = this.LoanAmount - this.DownPayment;
    this.APR = this.percentToDecimal(); //this.MortgageFrom.get('apr').value;
    this.Period = this.yearsToMonth(); //this.MortgageFrom.get('period').value;

    this.MonthlyMortgage = ( this.APR * this.AmountBorrowed) / (1 - (Math.pow((1 + this.APR), (-this.Period))));

  }
  percentToDecimal(){
  return (this.MortgageFrom.get('apr').value / 12) / 100;
  }
  yearsToMonth(){
    return (this.MortgageFrom.get('period').value * 12);
  }
}
