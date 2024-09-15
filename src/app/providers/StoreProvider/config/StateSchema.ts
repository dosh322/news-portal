import type { CounterSchema } from "entities/Counter";
import type { UserSchema } from "entities/User";
import type { LoginFormSchema } from "features/authByUserName";

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm?: LoginFormSchema;
}
