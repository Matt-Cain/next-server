import { mergeTypeDefs } from "@graphql-tools/merge";

import auth from "./auth";
import plan from "./plan";

const typeDefs = mergeTypeDefs([auth, plan]);

export default typeDefs;