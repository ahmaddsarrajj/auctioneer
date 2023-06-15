import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "./action";
import { Subjects } from "./subject/subject";
import { User } from "../entities/user/entities/user.entity";

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
          Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        if(user.roleId !== 1){
          console.log ("User is : ",{user})
          cannot(Action.Create, 'all')
        }

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
              item.constructor as ExtractSubjectType<Subjects>,
          });
        }    
}
