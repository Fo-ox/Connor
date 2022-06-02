import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prediction-tool',
  templateUrl: './predition-tool.component.html',
  styleUrls: ['./predition-tool.component.less']
})
export class PreditionToolComponent implements OnInit {
    public dropdownVisible: boolean = false

    public taskType: string = 'Random Forest / v 4.0'
    public defaultModel: string = 'Random Forest / v 3.0'

    constructor() { }

    ngOnInit(): void {
    }

}
