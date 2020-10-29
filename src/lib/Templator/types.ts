export type AllowedComponent = { getContent: () => SVGElement | DocumentFragment | HTMLElement | Text | null };

export type AllowedComponentConstructor = AllowedComponent & FunctionConstructor;

export type TemplatorTreeType =
    | { children: TemplatorTreeType[], tag: string, fullTag: string }
    | string;

export type TemplatorContextType = { [key: string]: string | number | boolean | Function | AllowedComponent | AllowedComponent[] | undefined };