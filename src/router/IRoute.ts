import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";


export interface IRoute {
    icon: ReactNode;
    title: string;
}

export type RouteType = IRoute & RouteObject