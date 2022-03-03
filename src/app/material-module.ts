import {NgModule} from '@angular/core';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  exports: [   
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ]
})
export class MaterialModule {}

