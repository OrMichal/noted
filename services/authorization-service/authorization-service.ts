import { API_URL } from '../http-service/http-service';
import TokenService from '../Token-service/token-service';
export default class AuthorizationService {
    private TokenService: TokenService = new TokenService();
  
    public constructor(){}

    public Authorized() : boolean {
        return !!this.TokenService.getToken();
    }
} 