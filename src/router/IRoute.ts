import { RouteObject } from "react-router-dom";


export interface IRoute {
    title: string;
}

export type RouteType = IRoute & RouteObject