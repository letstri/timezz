import * as vue from 'vue';

declare const Timezz: vue.DefineComponent<vue.ExtractPropTypes<{
    date: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        required: true;
    };
    pause: {
        type: BooleanConstructor;
        default: boolean;
    };
    stopOnZero: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "update"[], "update", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    date: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        required: true;
    };
    pause: {
        type: BooleanConstructor;
        default: boolean;
    };
    stopOnZero: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onUpdate?: ((...args: any[]) => any) | undefined;
}>, {
    pause: boolean;
    stopOnZero: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

export { Timezz };
