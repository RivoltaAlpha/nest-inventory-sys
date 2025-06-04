import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { Injectable, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class AtGuard extends AuthGuard("access") {
  constructor(private configService: ConfigService,
                private reflector: Reflector
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const request = super.getRequest(context);
    return request;
  }
}