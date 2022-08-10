import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchs: string[] = [];

  constructor(private gifsService:GifsService) { }

  get history(): string[] {
    return this.gifsService.history;
  }

  ngOnInit(): void {
  }

  onHistoryItemClick(item: string = ''){
    this.gifsService.searchGifs(item);
  }

}
