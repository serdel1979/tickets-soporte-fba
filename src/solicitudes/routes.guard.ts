import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoutesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

 
    let { url } = context.switchToHttp().getRequest();
    let { user } = context.switchToHttp().getRequest();
    url = url.split('/');
    let usrurl = url[url.length-1]
    let usrlog = user.user
    if (usrurl == usrlog){
      return true;
    }else{
      return false;
    }
  }
}
