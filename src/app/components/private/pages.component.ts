import {Component, HostListener, OnInit} from '@angular/core';
import {animate, group, query, state, style, transition, trigger,animateChild} from "@angular/animations";


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  animations: [
    trigger('slideInOut', [
      state('true', style({
        transform: 'translate3d(260px,0,0)'
      })),
      state('false', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('true => false', animate('400ms ease-in-out')),
      transition('false => true', animate('400ms ease-in-out'))
    ]),
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({position: 'fixed', width: '100%'})),
        group([
          query(':enter', [
            style({opacity: 0}),
            animate('0.5s ease-in-out', style({opacity: 1}))
          ]),
          query(':leave', [
            style({opacity: 0}),
            animate('0.2s ease-in-out', style({opacity: 1}))]),
        ])
      ])
    ]),
    trigger('zoomIn', [
      transition('* <=> *', [
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              left: 0,
              width: '100%',
              paddingRight: '2rem',
              paddingLeft: '2rem',
              opacity: 0,
              transform: 'scale(0.5) translateY(-20%)'
            })
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            animate(
              '400ms ease',
              style({ opacity: 1, paddingRight: '2rem', paddingLeft: '2rem', transform: 'scale(1) translateY(0)' })
            )
          ],
          {
            optional: true
          }
        )
      ])
    ]),
    trigger('fadeIn', [
      transition('* <=> *', [
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              left: 0,
              width: '100%',
              paddingRight: '2rem',
              paddingLeft: '2rem',
              opacity: 0
            })
          ],
          { optional: true }
        ),
        query(':enter', [animate('1s ease-in-out', style({ opacity: 1, paddingRight: '2rem', paddingLeft: '2rem' }))], {
          optional: true
        })
      ])
    ]),
    trigger('fadeInLeft', [
      transition('* => *', [
        query(
          ':enter, :leave',
          style({ position: 'absolute', left: 0, width: '100%', paddingRight: '2rem', paddingLeft: '2rem', opacity: 0 }),
          {
            optional: true
          }
        ),
        query(':enter', style({ transform: 'translateX(-100%)', opacity: 0 }), { optional: true }),

        group([
          query(
            ':leave',
            [
              style({ transform: 'translateX(0%)' }),
              animate('600ms ease', style({ opacity: 1, transform: 'translateX(100%)' }))
            ],
            { optional: true }
          ),
          query(':enter', [animate('800ms ease', style({ opacity: 1, transform: 'translateX(0%)' })), animateChild()], {
            optional: true
          })
        ])
      ])
    ])
  ],
})
export class PagesComponent implements OnInit{
  menuShow = true;
  tipeMenu=true;
  isCollapsed=false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.checkSize();
  }

  checkSize(){
    this.menuShow = window.innerWidth > 1190;
    this.tipeMenu = window.innerWidth > 1190;
  }
  menu(evento: any) {
    this.menuShow = evento;
  }

  colapsar(evento: any) {
    this.isCollapsed = evento;
  }


  getState(outlet: any) {

    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.animation;
  }

  ngOnInit(): void {
    this.checkSize();
  }

}
