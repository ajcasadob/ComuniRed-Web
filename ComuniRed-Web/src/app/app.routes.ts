import { Routes } from '@angular/router';
import { LoginAdminPage } from './pages/login-admin.page/login-admin.page';
import { PanelControlAdminPage } from './pages/panel-control-admin.page/panel-control-admin.page';
import { ReservasAdminPage } from './pages/reservas-admin.page/reservas-admin.page';
import { PagosAdminPage } from './pages/pagos-admin.page/pagos-admin.page';
import { IncidenciasAdminPage } from './pages/incidencias-admin.page/incidencias-admin.page';
import { ComunicacionesAdminPage } from './pages/comunicaciones-admin.page/comunicaciones-admin.page';
import { FormularioReservaPage } from './pages/formulario-reserva-page/formulario-reserva-page';
import { RegistroPage } from './pages/registro-page/registro-page';
import { IncidenciaAdminFormPage } from './pages/incidencia-admin-form.page/incidencia-admin-form.page';
import { ComunicacionForm } from './pages/comunicacion-form/comunicacion-form';
import { ReservaForm } from './pages/reserva-form/reserva-form';
import { PagoForm } from './pages/pago-form/pago-form';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'panel de control',
        component: PanelControlAdminPage
    },

    {
        path: 'incidencias',
        component: IncidenciasAdminPage
    },
    {
        path: 'incidencia-form',
        component: IncidenciaAdminFormPage

    },
    {
        path: 'incidencia-form/:id',
        component: IncidenciaAdminFormPage

    },
    {
        path: 'comunicaciones',
        component: ComunicacionesAdminPage
    }
    ,
    {
        path: 'formulario',
        component: FormularioReservaPage
    }
    ,
    {
        path: 'login',
        component: LoginAdminPage
    },
    {
        path: 'registro',
        component: RegistroPage
    },

    {
        path: 'comunicacion-form',
        component: ComunicacionForm
    },
    {
        path: 'comunicacion-form/:id',
        component: ComunicacionForm
    }
    ,
    {
        path: 'reservas-admin',
        component: ReservasAdminPage
    },
    {
        path: 'reserva-form',
        component: ReservaForm
    },
    {
        path: 'reserva-form/:id',
        component: ReservaForm
    },
    {
        path: 'pagos-admin',
        component: PagosAdminPage
    },
    {
        path: 'pago-form',
        component: PagoForm
    },
    {
        path: 'pago-form/:id',
        component: PagoForm
    }


];
