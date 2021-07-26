
export const getRefsValue = (...refs) => {
    return refs.map(ref => ref.current.value);
}