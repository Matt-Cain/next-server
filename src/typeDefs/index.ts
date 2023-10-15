import { mergeTypeDefs } from "@graphql-tools/merge";

import auth from "./auth";
import plan from "./plan";
import date from "./date";

const typeDefs = mergeTypeDefs([auth, date, plan]);

export default typeDefs;