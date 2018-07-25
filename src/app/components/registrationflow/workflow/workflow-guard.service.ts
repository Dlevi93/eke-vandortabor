import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    RouterStateSnapshot,
    CanLoad, Route, ActivatedRouteSnapshot
} from '@angular/router';

import { WorkflowService } from './workflow.service';
import { Message } from '../../../../../node_modules/primeng/api';

@Injectable()
export class WorkflowGuard implements CanActivate {

    constructor(private router: Router, private workflowService: WorkflowService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const path: any = route.routeConfig == null ? undefined : route.routeConfig.path.replace(':id', route.params.id);
        return this.verifyWorkFlow(path);
    }

    verifyWorkFlow(path: any): boolean {
        console.log('Entered \'' + path + '\' path.');

        // If any of the previous steps is invalid, go back to the first invalid step
        const firstPath = this.workflowService.getFirstInvalidStep(path);
        if (firstPath.length > 0) {
            console.log('Redirected to \'' + firstPath + '\' path which it is the first invalid step.');
            const url = `registration/${firstPath}`;
            this.router.navigate([url]);
            return false;
        }
        return true;
    }
}


