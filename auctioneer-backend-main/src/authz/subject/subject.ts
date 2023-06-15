import { InferSubjects } from "@casl/ability";
import { User } from "../../entities/user/entities/user.entity";

export type Subjects = 
InferSubjects< typeof User> |
'all';