import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navegation-vertical',
  templateUrl: './navegation-vertical.component.html',
  styleUrls: ['./navegation-vertical.component.scss'],
})
export class NavegationVerticalComponent implements OnInit {
  @Input() subCategories: any;
  @Output() information = new EventEmitter<string>();

  // No changes needed, removing the empty constructor

  ngOnInit(): void {
    $(document).ready(function () {
      $('.open-bar-1').on('click', function () {
        let ids: any = $(this).attr('id');
        const box = document.getElementById(ids + 1);
        if (box !== null) {
          box.style.display = 'block';
        }
        $('.pruba')
          .addClass('hide')
          .filter(function () {
            return $(this).attr('id') === ids + 1;
          })
          .removeClass('hide');
      });
    });
  }

  clickme(cual: any) {
    this.information.emit(cual);
  }
}
