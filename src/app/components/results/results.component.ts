import { Component, OnInit } from '@angular/core';
import {MapService} from '../../services/map.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {


  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    
  }

}
