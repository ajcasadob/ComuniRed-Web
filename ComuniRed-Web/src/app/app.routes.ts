import { Routes } from '@angular/router';
import { LoginAdminPage } from './pages/login-admin.page/login-admin.page';
import { PanelControlAdminPage } from './pages/panel-control-admin.page/panel-control-admin.page';
import { ReservasAdminPage } from './pages/reservas-admin.page/reservas-admin.page';
import { PagosAdminPage } from './pages/pagos-admin.page/pagos-admin.page';
import { IncidenciasAdminPage } from './pages/incidencias-admin.page/incidencias-admin.page';
import { ComunicacionesAdminPage } from './pages/comunicaciones-admin.page/comunicaciones-admin.page';
import { FormularioReservaPage } from './pages/formulario-reserva-page/formulario-reserva-page';

export const routes: Routes = [ 
    {
        path: '',
        redirectTo: 'panel de control',
        pathMatch: 'full'
    },
    {
        path: 'panel de control',
        component: PanelControlAdminPage
    },
    {
        path:'reservas',
        component: ReservasAdminPage
    
    },
    {
        path:'pagos',
        component:PagosAdminPage
    },
    {
        path:'incidencias',
        component:IncidenciasAdminPage
    },
    {
        path:'comunicaciones',
        component:ComunicacionesAdminPage
    }
    ,
    {
        path:'formulario',
        component: FormularioReservaPage
    }
];
