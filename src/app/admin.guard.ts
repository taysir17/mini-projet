import { CanActivateFn, Router } from '@angular/router';
import { CondidatService } from './lesservices/condidat.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const condidatService=inject(CondidatService);
  const router = inject(Router);
  if(condidatService.isAuthenticated()==2){
   return true
  }
  else{
    router.navigate(["/erreur"])
   return false
  }
};
