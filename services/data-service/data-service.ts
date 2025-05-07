export default class DataService{
    constructor(){}

    public GetItem(key: string): any {
        return sessionStorage.getItem(key);
    }

    public SetItem(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    public RemoveItem(key: string): void {
        sessionStorage.removeItem(key);
    }

    public ClearStorage() : void {
        sessionStorage.clear();
    }

    public GetAllItems() : Record<string, any> {
        return sessionStorage;
    }

    public GetAllKeys() : string[] {
        return Object.keys(sessionStorage);
    }

    public GetAllValues() : any {
        return Object.values(sessionStorage);
    }

    public GetAllEntries() : Array<string | any> {
        return Object.entries(sessionStorage);
    }

    public SaveObjectProperties(obj: any) : void {
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (typeof value === "object") {
                this.SetItem(key, JSON.stringify(value));
            } else {
                this.SetItem(key, value);
            }
        });
    }

    public GetItems(keys: string[])  : Record<string, any> {
        const items: Record<string, any> = {};
        keys.forEach((key) => {
            if (this.GetItem(key)) {
                try {
                    items[key] = JSON.parse(this.GetItem(key));
                } catch (e) {
                    items[key] = this.GetItem(key);
                }
            }
        });
        return items;
    }
}