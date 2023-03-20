import { type RouteLocationNormalized } from "vue-router";
declare global {
    interface toRouteType extends RouteLocationNormalized {
        meta: {
            roles: Array<string>;
            keepAlive?: boolean;
            dynamicLevel?: string;
        };
    }
}
