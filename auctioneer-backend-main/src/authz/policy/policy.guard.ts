import { CanActivate, ConsoleLogger, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { NotFoundException, UnauthorizedException } from "@nestjs/common/exceptions";
import { Reflector } from "@nestjs/core";

import { AbilityFactory, AppAbility } from "../ability.factory";
import { CHECK_POLICIES_KEY } from "../decorator/policy.decorator";
import { PolicyHandler } from "./policy";

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory
  ) { }

 canActivate(context: ExecutionContext): boolean {
    const policyHandlers = 
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    
    // console.log({context:context.switchToHttp().getRequest()});
    const { user } = context.switchToHttp().getRequest();
    
     console.log("User in Policy Guard: ",{user});
    
    if (!user) throw new UnauthorizedException();
    
    const ability = this.abilityFactory.createForUser(user);
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    ); //=> return boolean

  }
  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {//handler the policy if its's interface or function
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}