export function schemaToProps<S, P extends string>(props: P): Partial<S> {
    // @ts-ignore
    const obj = this.toObject();
    const arrProps = props.split(' ');
    for (const key of Object.keys(obj)) if (arrProps.indexOf(key) < 0) delete obj[key];
    return obj;
}
