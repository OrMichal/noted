import TokenService from "../Token-service/token-service";

export default class HttpService{
    public BASE_API_URL: string = "https://jsonplaceholder.typicode.com";
    private tokenService: TokenService = new TokenService();

    public async FetchAuth(url: string, options?: Request): Promise<any>{
        if(options?.body){
            return await fetch(url);
        }

        return await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.tokenService.getToken()
            }
        });
    }
}