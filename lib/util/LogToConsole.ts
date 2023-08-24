
export const logToConsole = (message: string) =>
{
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

    if (env !== 'production') {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        console.log(today.toUTCString() + " | " + message);
    }

}
