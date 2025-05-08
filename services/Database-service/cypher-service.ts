import * as bcrypt from "bcrypt";

const salt: string = await bcrypt.genSalt(10);

export async function Encrypt(value: string) : Promise<string> {
    return await bcrypt.hashSync(value, salt);
}

export async function CompareEncrypted(encrypted_value: string, value: string) : Promise<boolean> {
    return await bcrypt.compare(value, encrypted_value);
}
