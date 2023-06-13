export const checkReponse = <T>(res: Response) :Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};