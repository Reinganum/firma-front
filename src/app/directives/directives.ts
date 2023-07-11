import { NgModule } from '@angular/core';

import { FeatherIconDirective } from './core-feather-icons';
import { RutvalidatorDirective } from './rutvalidator.directive';

@NgModule({
  declarations: [RutvalidatorDirective, FeatherIconDirective],
  exports: [RutvalidatorDirective, FeatherIconDirective]
})
export class CoreDirectivesModule {}
