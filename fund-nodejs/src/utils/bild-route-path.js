
export function bildroutePath(path){

    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pahtWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pahtWithParams}(?<query>\\?(.*))?$`)
    // console.log(Array.from(path.matchAll(routeParametersRegex)))

    return pathRegex
}