export function useCheckPassword(pw: string): boolean {
        return (
                //no special character
                (!(/[^A-Za-z0-9]/.test(pw)))
                //at least one lower case
                && (/[a-z]/.test(pw))
                //at least one uppercase
                && (/[A-Z]/.test(pw))
                //at least one figure
                && (/[0-9]/.test(pw)))

}