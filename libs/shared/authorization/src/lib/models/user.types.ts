import { Code, Email } from "@myorg/shared-util-functionnal";
import { Name } from "./name.types";

export type User = {
    readonly id: Code;
    readonly name:Name;
    readonly email: Email;
  }