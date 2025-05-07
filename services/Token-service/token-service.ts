import DataService from '../data-service/data-service';
export default class TokenService {
    private Token_Key = "token";
    private DataService: DataService = new DataService();

    public getToken() : string | null {
        return this.DataService.GetItem(this.Token_Key);
    }
    
    public setToken(value: string) : void {
        this.DataService.SetItem(this.Token_Key, value);
    }
    
    public DiscardToken() : void {
        this.DataService.RemoveItem(this.Token_Key);
    }
}